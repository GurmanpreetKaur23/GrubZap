import { useState } from "react";
import DishCardView from "../components/DishCardView";
import Login from "../components/Login";
import Register from "../components/Register";

export default function LoginRegisterForm() {
  const [isRegistered, setIsRegistered] = useState(false);
  const handleAlreadyHaveAccountClick = () => {
    setIsRegistered(!isRegistered);
  };
  return (
    <div className="overscroll-y-hidden py-auto flex min-h-screen w-full items-center justify-center overflow-hidden bg-amber-400 px-6 ">
      <div className="relative flex h-[600px] w-[1000px] items-center justify-center ">
        <div className="shadow-black-800 absolute left-24 flex h-[600px] w-[500px] flex-col items-center justify-center p-8 shadow-2xl">
          <DishCardView />
        </div>
        <div className="shadow-black-800 rightCard absolute right-0 h-[500px] w-[500px] bg-white p-8 shadow-2xl">
          {isRegistered ? <Login /> : <Register />}
          <p className="mt-4">
            {isRegistered
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              className="text-red-500 underline"
              onClick={handleAlreadyHaveAccountClick}
            >
              {isRegistered ? "Register here" : "Login here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
