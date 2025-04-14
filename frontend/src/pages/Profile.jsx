/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import OrderList from "../components/OrderList";
import axios from "axios";
import { CircularProgress } from "@mui/material";

function Sidebar({ activeTab, handleTabChange, handleLogout, name, image }) {
  return (
    <div className="bg-blur2 flex w-1/4 flex-col py-4 pl-4">
      <div className="color-white mb-8 mr-4">
        <img
          src={image}
          alt="User"
          className="mx-auto mb-4 h-48 w-48 rounded-full border-2 border-black bg-red-300"
        />
        <h1 className="text-center font-semibold">{name}</h1>
      </div>

      {["profile", "orderHistory"].map((tab) => (
        <button
          key={tab}
          className={`mb-2 rounded-l-full px-4 py-2 ${activeTab === tab
            ? "rounded-r-0 bg-amber-300"
            : "bg-blur1 mr-2 rounded-full hover:bg-amber-400"
            }`}
          onClick={() => handleTabChange(tab)}
        >
          {tab === "profile" ? "Profile" : "Order History"}
        </button>
      ))}

      <button
        onClick={handleLogout}
        className="mx-4 mt-auto rounded bg-red-500 px-4 py-2 text-white duration-100 hover:-translate-y-1 hover:bg-red-600 hover:shadow-lg"
      >
        Log Out
      </button>
    </div>
  );
}

function ProfileForm({ name, setName, mobileNumber, setMobileNumber, address, setAddress, isEditing, setIsEditing }) {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}/profile`,
        {
          name,
          mobileNumber,
          address,
        }
      );

      if (response.status === 200) {
        setSuccess("Profile updated successfully!");
        setIsEditing(false);
      } else {
        setError("Failed to update profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("An error occurred while updating the profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsEditing((prev) => !prev);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-4 h-full rounded bg-white px-8 pb-8 pt-6"
    >
      {[
        { label: "Name", value: name, setValue: setName, id: "name" },
        { label: "Mobile Number", value: mobileNumber, setValue: setMobileNumber, id: "mobileNumber" },
        {
          label: "Address",
          value: address || (isEditing ? "" : "No address provided yet"),
          setValue: setAddress,
          id: "address",
        },
      ].map(({ label, value, setValue, id }) => (
        <div key={id} className="mb-4 w-1/2 rounded bg-gray-100 p-2 shadow-md">
          <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor={id}>
            {label}:
          </label>
          <input
            className="w-full appearance-none rounded border bg-white px-3 py-2 text-gray-700 shadow focus:outline-none"
            id={id}
            type="text"
            name={id}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!isEditing}
          />
        </div>
      ))}

      {success && <div className="mb-2 text-sm text-green-600">{success}</div>}
      {error && <div className="mb-2 text-sm text-red-600">{error}</div>}

      <div className="flex gap-4">
        {!isEditing ? (
          <button
            className="rounded bg-gray-500 px-4 py-2 font-bold text-white hover:-translate-y-1 hover:bg-gray-700 hover:shadow-lg"
            onClick={handleClick}
          >
            Edit Profile
          </button>
        ) : (
          <>
            <button
              className={`rounded px-4 py-2 font-bold text-white hover:-translate-y-1 hover:shadow-lg ${loading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-amber-500 hover:bg-amber-700"
                }`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:-translate-y-1 hover:bg-red-700 hover:shadow-lg"
              onClick={handleClick}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </form>
  );
}

function OrderHistory({ orderData, isLoadingOrders }) {
  return (
    <div className="h-full overflow-auto rounded bg-white p-4 shadow">
      <h2 className="mb-8 border-b-2 p-2 text-xl">Order History</h2>
      {isLoadingOrders ? (
        <div className="mt-8 flex items-center justify-center">
          <CircularProgress color="warning" size={50} />
        </div>
      ) : orderData.length ? (
        <OrderList orderData={orderData} />
      ) : (
        <h1 className="ml-4">No orders made yet</h1>
      )}
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userID, setUserID] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [orderData, setOrderData] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_SERVER_URL}/profile`);
        if (res.status === 200) {
          console.log('res.data', res.data)
          const { user_id, name, mobile_number, address, img_src } = res.data[0];
          setUserID(user_id);
          setName(name);
          setMobileNumber(mobile_number);
          setAddress(address);
          setImage(`https://api.dicebear.com/9.x/big-smile/svg?seed=${Math.random() * 100}`);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleTabChange = async (tab) => {
    setActiveTab(tab);
    if (tab === "orderHistory" && orderData.length === 0) {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_SERVER_URL}/order/allOrders`, { withCredentials: true });
        if (res.status === 200) {
          setOrderData(res.data);
          setIsLoadingOrders(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}/auth/logout`,
        { userID },
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
    } finally {
      navigate("/login");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircularProgress color="warning" size={100} />
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      <Navbar />
      <div className="mx-auto flex h-[75%] w-[90%] overflow-hidden rounded shadow-md">
        <Sidebar activeTab={activeTab} handleTabChange={handleTabChange} handleLogout={handleLogout} name={name} image={image} />
        <div className="w-[75%] bg-white p-8">
          {activeTab === "profile" ? (
            <ProfileForm
              name={name}
              setName={setName}
              mobileNumber={mobileNumber}
              setMobileNumber={setMobileNumber}
              address={address}
              setAddress={setAddress}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          ) : (
            <OrderHistory orderData={orderData} isLoadingOrders={isLoadingOrders} />
          )}
        </div>
      </div>
    </div>
  );
}
