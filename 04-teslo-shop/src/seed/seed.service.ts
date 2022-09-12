import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {

  constructor(
      private readonly productsService: ProductsService,
  ){}

  async runSeed() {
    const results = await this.insertNewProducts();
    return {msg: 'Seed executed', results};
  }

  private async insertNewProducts() {
    await this.productsService.removeAllProducts();

    const products = initialData.products;

    const insertPromises = [];

    products.forEach(product => {
      insertPromises.push(this.productsService.create(product));
    });

    const results = await Promise.all(insertPromises);

    return results;

  }

}
