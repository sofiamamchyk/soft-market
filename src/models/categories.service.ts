import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Category} from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }
  
  findOne(id: string): Promise<Category> {
    return this.categoriesRepository.findOne(id, { relations: ['products']});
  }

  async createOrUpdate(category: Category): Promise<Category> {
    return this.categoriesRepository.save(category);
  }

  async remove(id: string): Promise<void> {
    await this.categoriesRepository.delete(id);
  }
}
