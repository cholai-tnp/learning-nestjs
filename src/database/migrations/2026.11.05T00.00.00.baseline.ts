import { DataTypes, type QueryInterface } from 'sequelize';
import type { MigrationFn } from 'umzug';

// Baseline schema. Existing databases were built by sequelize.sync(), so every
// step checks first: on a fresh DB it creates everything, on an existing DB it
// only fills in what's missing (e.g. Users.teamId).

const timestamps = {
  createdAt: { type: DataTypes.DATE, allowNull: false },
  updatedAt: { type: DataTypes.DATE, allowNull: false },
};

export const up: MigrationFn<QueryInterface> = async ({ context: qi }) => {
  if (!(await qi.tableExists('Teams'))) {
    await qi.createTable('Teams', {
      team_id: { type: DataTypes.STRING, primaryKey: true },
      name: { type: DataTypes.STRING },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
      ...timestamps,
    });
  }

  if (!(await qi.tableExists('Users'))) {
    await qi.createTable('Users', {
      user_id: { type: DataTypes.STRING, primaryKey: true },
      firstName: { type: DataTypes.STRING },
      lastName: { type: DataTypes.STRING },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
      ...timestamps,
    });
  }

  const users = await qi.describeTable('Users');
  if (!users.teamId) {
    await qi.addColumn('Users', 'teamId', {
      type: DataTypes.STRING,
      allowNull: true,
      references: { model: 'Teams', key: 'team_id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  }

  if (!(await qi.tableExists('Tickets'))) {
    await qi.createTable('Tickets', {
      ticket_id: { type: DataTypes.STRING, primaryKey: true },
      description: { type: DataTypes.STRING },
      created_by_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: { model: 'Users', key: 'user_id' },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
      },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
      ...timestamps,
    });
  }

  if (!(await qi.tableExists('TicketTeams'))) {
    await qi.createTable('TicketTeams', {
      ticket_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        references: { model: 'Tickets', key: 'ticket_id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      team_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        references: { model: 'Teams', key: 'team_id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ...timestamps,
    });
  }
};

export const down: MigrationFn<QueryInterface> = async ({ context: qi }) => {
  await qi.dropTable('TicketTeams');
  await qi.dropTable('Tickets');
  await qi.dropTable('Users');
  await qi.dropTable('Teams');
};
