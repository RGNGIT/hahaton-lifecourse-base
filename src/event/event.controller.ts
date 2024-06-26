import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { UseModel } from 'src/common/decorators/use-model.decorator';
import { FindInterceptor } from 'src/common/filters/find.interceptor';
import { Event } from './entities/event.entity';

@ApiTags('Мероприятия')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Post('all')
  @UseModel(Event)
  @UseInterceptors(FindInterceptor)
  filterAll(@Body() FilterDto:any){}

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }

  // @Post(':id/participants')
  // @UseGuards(JwtGuard)
  // addParticipant(@Param('id') eventId: number, @GetCurrentUser() user: any) {
  //   return this.eventService.addParticipant(eventId, user.id);
  // }
}
