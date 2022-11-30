import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Carts {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('uuid')
  public user_id: string;

  @Column({
    type: 'date',
    default: '2022-10-19'
  })
  public created_at: string;

  @Column({
    type: 'date',
    default: '2022-10-19'
  })
  public updated_at: string;
}