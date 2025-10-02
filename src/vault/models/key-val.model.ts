import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class KeyVal {
  @PrimaryColumn({ length: 100 })
  key: string;

  @Column({ length: 255 })
  value: string;
}
