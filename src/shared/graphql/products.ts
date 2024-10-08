import { gql } from "graphql-request";
export const GET_PRODUCTS = gql`      
  query Products($slug: String) {
    products(slug: $slug) {
      id
      caption
      price
      slug
      weight
      rate
      description
      imageSrc
    }
  }  
`;
export const CREATE_PRODUCT = gql`
  mutation CreateProduct($caption: String!, $price: Float!) {
    createProduct(caption: $caption, price: $price) {
      id
      caption
      price
    }
  }
`;
