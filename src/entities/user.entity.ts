import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  userId!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;
}