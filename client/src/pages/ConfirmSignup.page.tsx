import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { CONFIRM_USER_MUTATION } from "../graphql/mutation/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.component";

type Props = {};

export default function ConfirmSignup({}: Props) {
  const [pin, setPin] = useState<string>();
  const navigate = useNavigate();
  const [confirm, { loading, data }] = useMutation(CONFIRM_USER_MUTATION);
  useEffect(() => {
    if (data) {
      if (!data?.confirmRegister) {
        toast.error("Pin Expired");
        navigate("/signup");
      } else {
        toast.success("Registration successful.You can login now");
        navigate("/login");
      }
    }
  }, [data]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setPin(e.target.value);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    confirm({
      variables: {
        pin: pin,
      },
    });
  };
  return (
    <div className="h-100vh mb-[50px]">
      <div className="max-w-md m-auto mt-6">
        <div className="border-t-4 border-violet-800 overflow-hidden rounded shadow-lg">
          <h3 className="text-xl text-center mt-8 mb-8">
            Confirm Registration
          </h3>
          <div className="px-4 mb-4">
            <input
              type="text"
              placeholder="Pin"
              className="border border-gray rounded w-full p-3"
              name="pin"
              onChange={handleChange}
            />
          </div>
          <div className="px-4 mb-6">
            <Button onClick={handleClick} loading={loading}>
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
