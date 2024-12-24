import { Transform } from "class-transformer";
import { IsDate, IsString, MinLength } from "class-validator";

export class CreateFilmDto {

    @IsString()
    @Transform(({ value }) => value.trim())
    @MinLength(3)
    title: string;

    @IsString()
    @Transform(({ value }) => value.trim())
    producer: string;

    @IsString()
    @Transform(({ value }) => value.trim())
    director: string;

    @IsString()
    opening_crawl: string;

    @IsDate()
    releaseDate: Date;

}
