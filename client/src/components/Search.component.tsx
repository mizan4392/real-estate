import React, { useContext, useState } from "react";

// import components
import CountryDropdown from "./CountryDropdown.component";
import PropertyDropdown from "./PropertyDropdown.component";
import PriceRangeDropdown from "./PriceRangeDropdown.component";

// import context
import { HouseContext } from "./HouseContext.component";
// import icon
import { RiSearch2Line } from "react-icons/ri";
import {
  AppStorContext,
  AppStorContextType,
} from "../context/app-store.context";
export interface SearchPayloadI {
  country?: string;
  property?: string;
  priceRange?: string;
}
const Search = () => {
  const { saveSearchPayload } = useContext(
    AppStorContext
  ) as AppStorContextType;
  const [searchPayload, setSearchPayload] = useState<SearchPayloadI>({});

  const handleClick = () => {
    saveSearchPayload(searchPayload);
  };
  return (
    <div className="px-[30px] py-6 max-w-[1170px] mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-3 relative lg:-top-4 lg:shadow-1 bg-white lg:bg-transparent lg:backdrop-blur rounded-lg">
      <CountryDropdown
        setCountry={(country) => {
          setSearchPayload({
            ...searchPayload,
            country: country,
          });
        }}
        selected={searchPayload.country}
      />
      <PropertyDropdown
        selected={searchPayload?.property}
        setProperty={(property) => {
          setSearchPayload({
            ...searchPayload,
            property: property,
          });
        }}
      />
      <PriceRangeDropdown
        selected={searchPayload?.priceRange}
        setPrice={(priceRange) => {
          setSearchPayload({
            ...searchPayload,
            priceRange: priceRange,
          });
        }}
      />
      <button
        onClick={() => {
          handleClick();
        }}
        className="bg-violet-700 hover:bg-violet-800 transition w-full lg:max-w-[162px] h-16 rounded-lg flex justify-center items-center text-white text-lg"
      >
        <RiSearch2Line />
      </button>
    </div>
  );
};

export default Search;
