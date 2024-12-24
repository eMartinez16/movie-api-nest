import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAllFilms() {
    return this.filmsService.getAllFilms();
  }

  @Get(':id')
  async getFilmById(@Param('id') id: number) {
    return this.filmsService.getFilmById(id);
  }
}
