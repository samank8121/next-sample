import { ProductType } from '@/types/ProductType';

export const Products: ProductType[] = [
  {
    id: 1,
    caption: 'Butter',
    rate: 5,
    price: 100,
    weight: 100,
    unit: 'gr',
    description: 'description pr1',
    imageSrc:'/images/products/butter.jpg'
  },
  {
      id: 2,
      caption: 'Milk',
      rate: 3,
      price: 150,
      weight: 100,
      unit: 'ml',
      description: 'description pr2',
      imageSrc:'/images/products/milk.jpg'
  },
  {
    id: 3,
    caption: 'Cola',
    rate: 4,
    price: 200,
    weight: 1.5,
    unit: 'l',
    description: 'description pr3',
    imageSrc:'/images/products/cola.jpg'
  },
  {
    id: 4,
    caption: 'Cheese',
    rate: 2,
    weight: 250,
    unit: 'gr',
    description: 'description pr4',
    price: 50,
    imageSrc:'/images/products/cheese.jpg'
  },
  {
    id: 5,
    caption: 'Chips',
    rate: 4,
    weight: 275,
    unit: 'gr',
    description: 'description pr5',
    price: 0,
    imageSrc:'/images/products/chips.jpg'
  },
];
