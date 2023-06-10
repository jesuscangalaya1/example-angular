import {CategoryDTO} from "./category-dto";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category:CategoryDTO;
}

