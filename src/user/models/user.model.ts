import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ length: 100 })
  username: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 100 })
  enable: boolean;
}
