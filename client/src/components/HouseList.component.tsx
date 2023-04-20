import React, { useContext, useEffect } from "react";

// import context
import { HouseContext } from "./HouseContext.component";
// import components

// import link
import { Link } from "react-router-dom";
// import icons
import { ImSpinner2 } from "react-icons/im";
import House from "./House.component";
import { useQuery } from "@apollo/client";
import {
  APARTMENT_TYPE,
  GET_APARTMENTS_QUERY,
} from "../graphql/query/apartment";
import {
  AppStorContext,
  AppStorContextType,
} from "../context/app-store.context";
import { SearchPayloadI } from "./Search.component";

const HouseList = () => {
  const { searchPayload } = useContext(AppStorContext) as AppStorContextType;
  const { data, loading, refetch }: any = useQuery(GET_APARTMENTS_QUERY, {
    variables: {
      pagination: {
        page: 1,
        limit: 10,
      },
    },
  });
  const prepareSearchPayload = (payload: SearchPayloadI) => {
    const searchPayload: any = {};

    if (payload?.country) {
      if (payload.country !== "Location (any)") {
        searchPayload.country = payload.country;
      } else {
        searchPayload.country = undefined;
      }
    }
    if (payload?.priceRange) {
      if (payload.priceRange !== "Price range (any)") {
        searchPayload.price = payload.priceRange;
      } else {
        searchPayload.price = undefined;
      }
    }
    if (payload?.property) {
      if (payload.property !== "Property (any)") {
        searchPayload.type = payload.property;
      } else {
        searchPayload.type = undefined;
      }
    }
    return searchPayload;
  };
  useEffect(() => {
    if (Object?.keys(searchPayload)?.length) {
      refetch({
        pagination: {
          page: 1,
          limit: 10,
        },
        ...prepareSearchPayload(searchPayload),
      });
    }
  }, [searchPayload]);
  if (loading) {
    return (
      <ImSpinner2 className="mx-auto animate-spin text-violet-700 text-4xl mt-[200px]" />
    );
  }

  if (data?.getApartments?.apartments?.length < 1) {
    return (
      <div className="text-center text-3xl text-gray-400 mt-48">
        Sorry, nothing was found.
      </div>
    );
  }
  return (
    <section className="mb-20">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14">
          {data?.getApartments?.apartments?.map((house: any, index: number) => {
            return (
              <Link to={`/property/${house._id}`} key={index}>
                <House house={house} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HouseList;
