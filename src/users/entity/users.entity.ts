import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Team } from '../../teams/entities/team.entity.js';
import { Ticket } from '../../tickets/entities/ticket.entity.js';
import type { Relation } from '../../common/relation.type.js';

@Table
export class User extends Model {

  @PrimaryKey
  @Column({type:DataType.STRING})
  user_id: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @ForeignKey(() => Team)
  @Column
  teamId: string;

  // relations
  @BelongsTo(()=>Team)
  team: Relation<Team>

  @HasMany(() => Ticket, 'created_by_id')
  created_tickets: Ticket[];

}
