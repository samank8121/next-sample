export type ProductType = {
    id: number;
    slug: string;
    caption: string;
    imageSrc: string;
    rate: number;
    price: number;
    unit: string;
    discount?: number;
    weight?: number;
    brand?: string;
    description?:string;
  };