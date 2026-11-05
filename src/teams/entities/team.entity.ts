import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/entity/users.entity.js';
import { Ticket } from '../../tickets/entities/ticket.entity.js';
import { TicketTeam } from '../../tickets/entities/ticket-team.entity.js';

@Table
export class Team extends Model {
  @PrimaryKey
  @Column({ type: DataType.STRING })
  team_id: string;
  
  @Column({ type: DataType.STRING })
  name: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  // relations
  @HasMany(() => User)
  users: User[];

  @BelongsToMany(() => Ticket, () => TicketTeam)
  tickets: Ticket[];
}
