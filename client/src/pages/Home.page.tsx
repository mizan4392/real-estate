import React from "react";
import Banner from "../components/Banner.component";
import HouseList from "../components/HouseList.component";

const Home = () => {
  return (
    <div className="min-h-[1800px]">
      <Banner />
      <HouseList />
    </div>
  );
};

export default Home;
