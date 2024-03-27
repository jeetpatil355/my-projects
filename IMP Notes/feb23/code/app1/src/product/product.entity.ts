import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  title: String;

  @Column()
  description: String;

  @Column()
  price: Number;

  @Column()
  company: String;

  @Column()
  category: String;

  @Column()
  color: String;
}
