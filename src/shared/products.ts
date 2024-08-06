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
  },
  {
      id: 2,
      caption: 'Milk',
      rate: 3,
      price: 150,
      weight: 100,
      unit: 'ml',
      description: 'description pr2',
  },
  {
    id: 3,
    caption: 'Coca cola',
    rate: 4,
    price: 200,
    weight: 1.5,
    unit: 'l',
    description: 'description pr3',
  },
  {
    id: 4,
    caption: 'Cheese',
    rate: 2,
    weight: 250,
    unit: 'gr',
    description: 'description pr4',
    price: 50,
  },
  {
    id: 5,
    caption: 'Chips',
    rate: 4,
    weight: 275,
    unit: 'gr',
    description: 'description pr5',
    price: 0,
  },
];
