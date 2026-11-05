import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Team } from '../../teams/entities/team.entity.js';
import { Ticket } from './ticket.entity.js';

@Table
export class TicketTeam extends Model {
  @PrimaryKey
  @ForeignKey(() => Ticket)
  @Column({ type: DataType.STRING })
  ticket_id: string;

  @PrimaryKey
  @ForeignKey(() => Team)
  @Column({ type: DataType.STRING })
  team_id: string;
}
