import { MinLength } from "class-validator";
import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    email: string;

    @Column()
    @MinLength(8)
    password: string;
  
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
