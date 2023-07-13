import {CategoryDTO} from "./category-dto";
import {Category} from "../components/products/create-product/create-product.component";

export class Product {
  id?: number;
  name: string;
  price: number;
  description: string;
  categoryId: any;
  category: any;
  image: any;


  constructor(name: string, price: number, description: string, categoryId: any) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.categoryId = categoryId;
  }
}

