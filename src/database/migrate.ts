import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { Sequelize, type QueryInterface } from 'sequelize';
import { SequelizeStorage, Umzug, type MigrationFn } from 'umzug';
import { databaseConfig } from './database.config.js';

// Runs from the compiled output (dist/database/migrate.js), so it picks up
// the compiled migrations next to it. New migrations are created in src.
const here = dirname(fileURLToPath(import.meta.url));

const sequelize = new Sequelize({ ...databaseConfig, logging: false });

type Migration = { up: MigrationFn<QueryInterface>; down?: MigrationFn<QueryInterface> };

const migrator = new Umzug<QueryInterface>({
  migrations: {
    glob: ['migrations/*.js', { cwd: here }],
    resolve: ({ name, path, context }) => {
      const load = async (): Promise<Migration> => import(pathToFileURL(path!).href);
      return {
        name: name.replace(/\.js$/, ''),
        up: async () => (await load()).up({ name, path, context }),
        down: async () => {
          const m = await load();
          if (!m.down) throw new Error(`Migration ${name} has no down()`);
          return m.down({ name, path, context });
        },
      };
    },
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }), // records applied migrations in "SequelizeMeta"
  logger: console,
  create: {
    folder: resolve(process.cwd(), 'src/database/migrations'),
    template: (filepath) => [
      [
        filepath,
        `import { DataTypes, type QueryInterface } from 'sequelize';
import type { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = async ({ context: qi }) => {
};

export const down: MigrationFn<QueryInterface> = async ({ context: qi }) => {
};
`,
      ],
    ],
  },
});

// `create --name add-foo` -> add-foo.ts (umzug requires an extension)
const nameIdx = process.argv.indexOf('--name') + 1;
if (process.argv[2] === 'create' && nameIdx > 0 && !/\.\w+$/.test(process.argv[nameIdx] ?? '')) {
  process.argv[nameIdx] += '.ts';
}

try {
  await migrator.runAsCLI();
} finally {
  await sequelize.close();
}
