import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  getId(): number {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getImage(): string {
    return this.image;
  }

  setImage(image: string) {
    this.image = image;
  }
}
