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

  // console.log("NAVBAR:", userData);
  return (
    <div className="w-full h-20 flex items-center justify-between shadow-md px-8  mb-12">
      <Link to="/home">
        <h1 className="text-3xl font-bold">FoodOS</h1>
      </Link>
      <div
        style={
          location.pathname !== "/checkout" && location.pathname !== "/profile"
            ? { width: "27%" }
            : {}
        }
        className="flex items-center justify-between gap-3"
      >
        {" "}
        {location.pathname !== "/checkout" &&
          location.pathname !== "/profile" && <SearchBar />}
        <div className="flex gap-2.5 ml-0">
          <Tooltip title="Cart" placement="bottom-start">
            <button
              onClick={() => {
                navigate("/checkout");
              }}
              className={`p-3 bg-${
                isCheckoutPage ? "amber-500" : "amber-400"
              } text-white rounded-md 
            ${
              isCheckoutPage
                ? ""
                : "hover:bg-amber-500 hover:-translate-y-1 hover:shadow-lg duration-100"
            }`}
            >
              <ShoppingCartIcon />
            </button>
          </Tooltip>
          {/* <FormControlLabel
            sx={{ color: "text.primary" }}
            control={
              <Switch checked={!invisible} onChange={handleBadgeVisibility} />
            }
            label="Show Badge"
          /> */}
          <Tooltip title="Profile" placement="bottom-start">
            <button
              onClick={() => {
                navigate("/profile");
              }}
              className={`p-3 bg-${
                isProfilePage ? "amber-500" : "amber-400"
              } text-white rounded-md 
            ${
              isProfilePage
                ? ""
                : "hover:bg-amber-500 hover:-translate-y-1 hover:shadow-lg duration-100"
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
