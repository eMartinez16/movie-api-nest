import { MinLength } from "class-validator";
import { Role } from "src/core/enum/role.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 500 })
    name: string;
  
    @Column({ unique: true, nullable: false })
    email: string;

    @Column( { nullable: false } )
    @MinLength(8)
    password: string;

    @Column({ default: Role.DEFAULT_USER})
    roles: Role;

  
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
