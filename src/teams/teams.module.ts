import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service.js';
import { TeamsController } from './teams.controller.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { Team } from './entities/team.entity.js';
import { User } from '../users/entity/users.entity.js';

@Module({
  imports: [SequelizeModule.forFeature([Team,User])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
