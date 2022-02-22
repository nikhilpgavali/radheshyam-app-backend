import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('text', {name: 'first_name'})
    firstName: string;

    @Column('text', {name: 'password'})
    password: string;

    @Column('text', {name: 'email'})
    email: string;

    constructor(user: Partial<User>= {}){
        Object.assign(this, user);
    }

}