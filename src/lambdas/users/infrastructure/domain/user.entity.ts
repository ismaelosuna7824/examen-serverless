import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IUserSchema } from '../../domain/User';

@Entity({name: 'User'})
export class UserEntity implements IUserSchema {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({
    name: 'username',
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  username: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  email: string;
}