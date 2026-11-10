import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto.js';
import { UpdateTeamDto } from './dto/update-team.dto.js';
import { InjectModel } from '@nestjs/sequelize';
import { Team } from './entities/team.entity.js';
import { AddUserDto } from './dto/add-user.dto.js';
import { User } from '../users/entity/users.entity.js';
import { ConnectionError, UniqueConstraintError } from 'sequelize';
import { ValidationError } from 'class-validator';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team)
    private teamModel: typeof Team,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    try {
      await this.teamModel.create({
        name: createTeamDto.name,
        team_id: crypto.randomUUID(),
      });
    } catch (e) {
      if (e instanceof UniqueConstraintError) {
        // Handle duplicate entry
        throw new BadRequestException(e.message);
      } else if (e instanceof ValidationError) {
        // Handle field validation failures
        throw new BadRequestException(e.toString());
      } else if (e instanceof ConnectionError) {
        // Handle DB downtime
        throw new InternalServerErrorException(e.message);
      } else {
        throw e;
      }
    }
  }

  async addUser(addUserDto: AddUserDto) {
    const team = await this.teamModel.findByPk(addUserDto.team_id);
    const user = await this.userModel.findByPk(addUserDto.user_id);

    if (!team || !user) {
      throw new NotFoundException('Team or User not found');
    }

    await team.$add('users', user);
  }

  async findAll(): Promise<Team[]> {
    return this.teamModel.findAll({});
  }

  async findOne(id: string): Promise<Team> {
    const team = await this.teamModel.findByPk(id, {
      include: [User],
    });

    if (!team) {
      throw new NotFoundException('The requested team is not found');
    }

    return team;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
