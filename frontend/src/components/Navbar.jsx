/* eslint-disable react/prop-types */
import "../index.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Tooltip from "@mui/material/Tooltip";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";

export default function Navbar() {
  const location = useLocation();
  const isCheckoutPage = location.pathname === "/checkout";
  const isProfilePage = location.pathname === "/profile";
  const navigate = useNavigate();

  return (
    <div className="w-full h-20 flex items-center justify-between shadow-md px-8 mb-12 bg-[#FFD54F]">
      <Link to="/home">
        <h1 className="text-10xl font-bold">
        <img
  src="/assets/GrubZap - Without Background (1).png"
  alt="GrubZap Logo"
  className="h-32 w-auto transition-transform duration-300 ease-in-out hover:scale-110"
/>

        </h1>
      </Link>
      <div
        style={
          location.pathname !== "/checkout" && location.pathname !== "/profile"
            ? { width: "27%" }
            : {}
        }
        className="flex items-center justify-between gap-3"
      >
        {location.pathname !== "/checkout" &&
          location.pathname !== "/profile" && <SearchBar />}
        <div className="flex gap-2.5 ml-0">
          <Tooltip title="Cart" placement="bottom-start">
            <button
              onClick={() => {
                navigate("/checkout");
              }}
              className={`p-3 ${
                isCheckoutPage ? "bg-[#F9A825]" : "bg-[#FFB300]"
              } text-white rounded-md 
              ${
                isCheckoutPage
                  ? ""
                  : "hover:bg-[#F9A825] hover:-translate-y-1 hover:shadow-lg duration-100"
              }`}
            >
              <ShoppingCartIcon />
            </button>
          </Tooltip>

          <Tooltip title="Profile" placement="bottom-start">
            <button
              onClick={() => {
                navigate("/profile");
              }}
              className={`p-3 ${
                isProfilePage ? "bg-[#F9A825]" : "bg-[#FFB300]"
              } text-white rounded-md 
              ${
                isProfilePage
                  ? ""
                  : "hover:bg-[#F9A825] hover:-translate-y-1 hover:shadow-lg duration-100"
              }`}
            >
              <PersonIcon />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
