import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { REGISTER_USER_MUTATION } from "../graphql/mutation/auth";
import Button from "../components/Button.component";

export const Signup = () => {
  const [signUpData, setSignUpData] = useState<any>({});

  const [registration, { loading, data }] = useMutation(REGISTER_USER_MUTATION);

  const navigate = useNavigate();
  useEffect(() => {
    if (data?.registration) {
      navigate("/confirm");
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!signUpData?.email?.length) {
      toast.error("email is required!");
      return;
    }

    if (!signUpData?.password?.length) {
      toast.error("Password is required!");
      return;
    }
    if (signUpData?.password?.length < 8) {
      toast.error("Password must be more then or equal 8 character!");
      return;
    }
    registration({
      variables: signUpData,
    });
  };

  return (
    <div className="h-100vh mb-[50px]">
      <div className="max-w-md m-auto mt-6">
        <div className="border-t-4 border-violet-800 overflow-hidden rounded shadow-lg">
          <h3 className="text-xl text-center mt-8 mb-8">Register</h3>
          <div className="px-4 mb-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray rounded w-full p-3"
              name="fullName"
              onChange={handleChange}
            />
          </div>
          <div className="px-4 mb-4">
            <input
              type="text"
              placeholder="Email Address"
              className="border border-gray rounded w-full p-3"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="px-4 mb-4">
            <input
              type="password"
              placeholder="Password"
              className="border border-gray rounded w-full p-3"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="px-4 mb-4">
            <input
              type="password"
              placeholder="Confirm Password"
              className="border border-gray rounded w-full p-3"
              name="confirmPassword"
              onChange={handleChange}
            />
          </div>
          <div className="px-4 mb-4 flex">
            <div className="w-1/2">
              <input
                type="checkbox"
                className="align-middle cursor-pointer -mt-1"
                id="remember-me"
                name="rememberMe"
                onChange={handleChange}
              />
              <label
                htmlFor="remember-me"
                className="align-middle text-gray-700 text-md cursor-pointer"
              >
                Remember me
              </label>
            </div>
            <div className="w-1/2 text-right">
              <a href="#" className="font-semibold no-underline text-black">
                Forgot your password?
              </a>
            </div>
          </div>
          <div className="px-4 mb-6">
            <Button onClick={handleClick} loading={loading}>
              Sign up
            </Button>
          </div>
          <div className="bg-gray-100 text-center text-gray-700 py-5">
            Don't have a account?
            <Link
              to="/login"
              className="font-semibold no-underline  text-violet-800"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
