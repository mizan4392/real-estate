import { gql, useQuery } from "@apollo/client";
export const APARTMENT_FIELDS_FRAGMENT = gql`
  fragment ApartmentFields on Apartment {
    _id
    houseName
    country
    city
    bedrooms
    bathrooms
    surface
    price
    type
  }
`;
export enum APARTMENT_TYPE {
  APARTMENT = "Apartment",
  HOUSE = "House",
  ALL = "all",
}
export const GET_APARTMENTS_QUERY = gql`
  query apartments($type: APARTMENT_TYPE, $pagination: Pagination!) {
    getApartments(type: $type, pagination: $pagination) {
      total
      apartments {
        ...ApartmentFields
      }
    }
  }
  ${APARTMENT_FIELDS_FRAGMENT}
`;
