import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service.js';
import { TicketsController } from './tickets.controller.js';
import { Ticket } from './entities/ticket.entity.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/entity/users.entity.js';
import { Team } from '../teams/entities/team.entity.js';

@Module({
  imports: [SequelizeModule.forFeature([Ticket, User, Team])],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
