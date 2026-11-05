import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model.js';
import { TicketsModule } from './tickets/tickets.module.js';


export const { ObserveModule, ObserveInstrument } = createObserveModule();
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'myuser',
      password: 'mypassword',
      database: 'mydb',
      autoLoadModels: true,
      models: [User],
    }),
    UsersModule,
    TicketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
