/* export interface Product {
  _id: string;
  name: string;
  brand: string;
  material: string;
  price: number;
  quantity: number;
  originalPrice?: number;
  images: string[];
  // Add other product properties as needed
} */

export interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
  images: string[];
  description: string;
  material: string;
  condition: string;
  bracelet: string;
  movement: string;
  thickness: string;
  glass: string;
  luminova: string;
  quantity: number;
  casematerial: string;
  crown: string;
  bandsize: string;
  lugs: string;
  water: string;
  originalPrice?: number;
}
