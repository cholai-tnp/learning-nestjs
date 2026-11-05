import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Team } from '../../teams/entities/team.entity.js';
import { User } from '../../users/entity/users.entity.js';
import { TicketTeam } from './ticket-team.entity.js';
import type { Relation } from '../../common/relation.type.js';

@Table
export class Ticket extends Model {
  @PrimaryKey
  @Column({ type: DataType.STRING })
  ticket_id: string;

  @Column
  description: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING, allowNull: false })
  created_by_id: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  // relations
  @BelongsTo(() => User, 'created_by_id')
  created_by: Relation<User>;

  // at least one team: enforced in the service, a join table can't enforce it
  @BelongsToMany(() => Team, () => TicketTeam)
  teams: Team[];
}
