import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { CommandService } from './command.service';
import { Command } from './command.entity';
import { BodyCreateCommandDto } from './dto/create-command.dto';

@Controller('command')
export class CommandController {
  constructor(private readonly commandService: CommandService) {}

  @Post()
  async create(@Body() command: BodyCreateCommandDto): Promise<Command> {
    return this.commandService.create(command);
  }

  @Get()
  async findAll(): Promise<Command[]> {
    return this.commandService.findAll();
  }

  @Get(':id')
  async findOne(id: number): Promise<Command> {
    return this.commandService.findOne(id);
  }

  @Get('farmer/:id')
  async findByFarmer(@Param('id') id: number): Promise<Command[]> {
    return this.commandService.findByFarmer(id);
  }

  @Get('place/:id')
  async findByPlace(@Param('id') id: number): Promise<Command[]> {
    return this.commandService.findByPlace(id);
  }

  @Put(':id')
  async update(@Body() command: Command, id: number): Promise<Command> {
    return this.commandService.update(id, command);
  }

  @Post(':id')
  async remove(id: number): Promise<Command> {
    return this.commandService.remove(id);
  }
}
