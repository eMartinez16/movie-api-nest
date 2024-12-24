import { MinLength } from "class-validator";
import { Role } from "src/core/enum/role.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity({ name: 'films' })
export class Film {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 500, unique: true })
    title: string;

    @Column({ length: 500 })
    producer: string;

    @Column({ length: 500 })
    director: string;

    @Column({ length: 500, type: 'text'})
    opening_crawl: string;


    @CreateDateColumn()
    releaseDate: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
