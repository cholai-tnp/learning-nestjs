import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/entity/users.entity.js';
import { TicketsModule } from './tickets/tickets.module.js';
import { TeamsModule } from './teams/teams.module.js';
import { Team } from './teams/entities/team.entity.js';
import { Ticket } from './tickets/entities/ticket.entity.js';
import { TicketTeam } from './tickets/entities/ticket-team.entity.js';
import { databaseConfig } from './database/database.config.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();
@Module({
  imports: [
    SequelizeModule.forRoot({
      ...databaseConfig,
      autoLoadModels: true,
      // Schema is managed by migrations (src/database/migrations), not sync().
      synchronize: false,
      models: [User, Team, Ticket, TicketTeam],
    }),
    UsersModule,
    TicketsModule,
    TeamsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
