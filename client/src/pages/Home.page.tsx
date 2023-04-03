import React, { useContext, useEffect } from "react";
import Banner from "../components/Banner.component";
import HouseList from "../components/HouseList.component";
import { useQuery } from "@apollo/client";
import {
  AppStorContext,
  AppStorContextType,
} from "../context/app-store.context";
import { GET_USER_DETAILS_QUERY } from "../graphql/query/user";
import FullPageSpin from "../components/FullPageSpin.component";

const Home = () => {
  const token = localStorage.getItem("access_token");
  const { saveUser } = useContext(AppStorContext) as AppStorContextType;
  const { data, loading, refetch } = useQuery(GET_USER_DETAILS_QUERY, {
    context: {
      headers: {
        authorization: `Bareer ${token}`,
      },
    },
  });

  useEffect(() => {
    if (data?.getUserDetails) {
      saveUser(data?.getUserDetails);
    }
  }, [data]);

  return (
    <div className="min-h-[1800px]">
      <Banner />
      <HouseList />
      {loading ? <FullPageSpin /> : null}
    </div>
  );
};

export default Home;
