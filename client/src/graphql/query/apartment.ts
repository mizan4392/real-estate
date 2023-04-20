import { gql, useQuery } from "@apollo/client";
export interface ApartmentI {
  _id: string;
  houseName: string;
  country: string;
  city: string;
  bedrooms: string;
  bathrooms: string;
  surface: string;
  price: string;
  type: string;
  bio: string;
  address: string;
  displayUrl: string;
  images: string[];
}
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
  query apartments(
    $type: String
    $pagination: Pagination!
    $country: String
    $price: String
  ) {
    getApartments(
      type: $type
      country: $country
      price: $price
      pagination: $pagination
    ) {
      total
      apartments {
        ...ApartmentFields
      }
    }
  }
  ${APARTMENT_FIELDS_FRAGMENT}
`;
export interface DetailsI {
  apartmentDetails: ApartmentI;
}
export const GET_APARTMENTS_DETAILS_QUERY = gql`
  query details($apartmentId: String!) {
    apartmentDetails(apartmentId: $apartmentId) {
      ...ApartmentFields
      bio
      address
      displayUrl
      images
    }
  }
  ${APARTMENT_FIELDS_FRAGMENT}
`;
