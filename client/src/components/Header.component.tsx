import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

//import logo
import Logo from "../assets/img/logo.svg";
import {
  AppStorContext,
  AppStorContextType,
} from "../context/app-store.context";
import Button from "./Button.component";

const Header = () => {
  const { user } = useContext(AppStorContext) as AppStorContextType;

  return (
    <header className="py-6 px-10 b-12 border-b ">
      <div className="container mx-auto flex justify-between">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link className="hover:text-violet-900 transition" to="profile">
                {user?.fullName?.split(" ")[0]}
              </Link>
              <a
                className="hover:text-violet-900 transition cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("access_token");
                  window.location.reload();
                }}
                style={{
                  padding: "0px",
                }}
              >
                LogOut
              </a>
            </>
          ) : (
            <>
              <Link className="hover:text-violet-900 transition" to="login">
                Login
              </Link>
              <Link
                className="bg-violet-800 text-white px-4 py-3 rounded-lg transition"
                to="signup"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
