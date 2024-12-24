import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FilmsService } from './films.service';
import { Role } from 'src/core/enum/role.enum';
import { Roles } from 'src/core/decorators/role.decorator';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAllFilms() {
    return await this.filmsService.getAllFilms();
  }

  @Get(':id')
  @Roles(Role.DEFAULT_USER)
  async getFilmById(@Param('id') id: number) {
    return await this.filmsService.getFilmById(id);
  }

  @Post('')
  @Roles(Role.ADMIN_USER)
  async createFilm(@Body() dto: CreateFilmDto) {
    return await this.filmsService.create(dto);
  }

  @Patch(':id')
  @Roles(Role.ADMIN_USER)
  async updateFilm(@Param('id') id: number, @Body() updateDto: UpdateFilmDto) {
    return await this.updateFilm(id, updateDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN_USER)
  async deleteFilm(@Param('id') id: number) {
    return await this.deleteFilm(id);
  }

  async syncMovies() {
    
  }
}
