import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  firstName: String;

  @Column()
  lastName: String;

  @Column()
  email: String;

  @Column()
  password: String;
}
