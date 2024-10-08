import { gql } from "graphql-request";

export type GetCartsType = {
  carts: [{
    cartProducts: [{
      product: {
        id: number,
        caption:string,
        price:number,
      }
      productCount:number,
    }]
  }]
};

export const GET_CARTS = gql`      
  query Carts {
    carts {
      cartProducts {
        product {
          id
          caption
          price
        }
        productCount
      }
    }
  }  
`;
export const CHANGE_PRODUCT_OF_CART = gql`
  mutation ChangeProductofCart($productId: Int!, $count: Int!) {
  changeProductofCart(productId: $productId, count: $count) {
    id,
      cartProducts {
        product {
          id
          caption
        }
        productCount
      }
  }
}
`;
