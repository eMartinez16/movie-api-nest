import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilmsService {
    swApiUrl: string =  '';

  constructor(
    private readonly _httpService: HttpService,
    private readonly _configService: ConfigService
    ) {
        this.swApiUrl = this._configService.get('SW_API_ENDPOINT')
    }

  async getAllFilms() {
    try {
      const response = await firstValueFrom(this._httpService.get(this.swApiUrl));
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching films: ${error.message}`);
    }
  }

  async getFilmById(id: number) {
    try {
      const response = await firstValueFrom(this._httpService.get(`${this.swApiUrl}${id}`));
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching film with ID ${id}: ${error.message}`);
    }
  }
}
