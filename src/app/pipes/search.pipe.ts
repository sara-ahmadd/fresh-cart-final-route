import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: Product[], title: string): Product[] {
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(title.toLowerCase()) ||
        product.category.name.toLowerCase().includes(title.toLowerCase())
    );
  }
}
