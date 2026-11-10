import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto.js';
import { UpdateTicketDto } from './dto/update-ticket.dto.js';
import { InjectModel } from '@nestjs/sequelize';
import { Ticket } from './entities/ticket.entity.js';
import { Team } from '../teams/entities/team.entity.js';
import { User } from '../users/entity/users.entity.js';

@Injectable()
export class TicketsService {
   constructor(
      @InjectModel(Ticket)
      private ticketModel: typeof Ticket,
    ) {}

  async create(createTicketDto: CreateTicketDto) {
    const newTicket = await this.ticketModel.create({
      ticket_id: crypto.randomUUID(),
      description: createTicketDto.description,
      team_ids: createTicketDto.team_ids,
      created_by_id: createTicketDto.created_by_id,
    })
    await newTicket.$set('teams', createTicketDto.team_ids)
    return 'Added new ticket';
  }

  async findAll(): Promise<Ticket[]> {
    const tickets = await this.ticketModel.findAll({
      include: [Team, User]
    })
    return tickets;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
