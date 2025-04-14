/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

export default function Cart({
  name,
  mobile,
  address,
  paymentOption,
  items,
  setItems,
}) {
  const [paymentSuccessfulAlert, setPaymentSuccessfulAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const navigate = useNavigate();

  const increaseQuantity = (id) => {
    setItems(
      items.map((item) =>
        item.ORDER_DETAIL_ID === id
          ? { ...item, QUANTITY: item.QUANTITY + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id) => {
    setItems(
      items.map((item) =>
        item.ORDER_DETAIL_ID === id
          ? { ...item, QUANTITY: item.QUANTITY - 1 > 0 ? item.QUANTITY - 1 : 1 }
          : item,
      ),
    );
  };

  const deleteItem = (id, name) => {
    let userConfirm = window.confirm(`Removing ${name}!`);
    if (userConfirm) {
      const newItems = items.filter((item) => item.ORDER_DETAIL_ID !== id);
      setItems([...newItems]);
    }
  };

  const totalPrice = items.reduce(
    (acc, item) => acc + item.SUBTOTAL_AMOUNT * item.QUANTITY,
    0,
  );

  const handlePayment = async () => {
    handleOpen();
    setOpen(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}/payment`,
        {
          total_amount: totalPrice,
        },
        {
          withCredentials: true,
        },
      );

      // if (response.data && Object.keys(response.data).length > 0) {
      //   console.log("payment successful:", response.data);
      // } else {
      //   console.log("payment unsuccessful");
      // }
    } catch (error) {
      console.error("Error during handling payment:", error);
    }

    setTimeout(() => {
      setOpen(false);
      setPaymentSuccessfulAlert(true);
    }, 2000);
    setTimeout(() => {
      navigate("/home");
    }, 3000);
  };

  return (
    <div className="h-fit">
      {paymentSuccessfulAlert && (
        <div className="absolute bottom-0 mb-4 w-full">
          <Alert
            icon={<CheckCircleOutlineIcon fontSize="inherit" />}
            severity="success"
            variant="filled"
          >
            Payment was successful.
          </Alert>
        </div>
      )}
      <div className="mb-8 ">
        <h2 className="mb-2 text-xl font-semibold">Food Items</h2>
        {items.length ? (
          items.map((item) => (
            <div
              key={item.ORDER_DETAIL_ID}
              className="mb-2 flex items-center justify-between"
            >
              <div className="mx-4 mb-2 w-2/3 border-b-2 border-black p-1">
                <span className="font-semibold">{item.NAME}</span>
                <span className="mx-2">(₹{item.SUBTOTAL_AMOUNT})</span>
              </div>
              <div className="flex w-16 gap-3 rounded bg-amber-200 p-2">
                <button onClick={() => decreaseQuantity(item.ORDER_DETAIL_ID)}>
                  -
                </button>
                <span className="">{item.QUANTITY}</span>
                <button onClick={() => increaseQuantity(item.ORDER_DETAIL_ID)}>
                  +
                </button>
              </div>
              <span className="mx-2 font-semibold">
                ₹{item.SUBTOTAL_AMOUNT * item.QUANTITY}
              </span>
              <button
                onClick={() => deleteItem(item.ORDER_DETAIL_ID, item.NAME)}
              >
                x
              </button>
            </div>
          ))
        ) : (
          <>
            <h1 className="my-8 text-center">Add some food to you cart!!!</h1>
            <button
              onClick={() => navigate("/home")}
              className="w-full rounded bg-amber-500 px-12 py-3 text-white duration-100 hover:-translate-y-1 hover:bg-amber-600 hover:shadow-lg"
            >
              Start adding
            </button>
          </>
        )}
      </div>
      <div className="mb-8 rounded bg-white p-2">
        <h2 className="mb-2 text-xl font-semibold ">Final Summary</h2>
        {name && (
          <p>
            <span className="font-semibold">Name:</span> {name}
          </p>
        )}
        {mobile && (
          <p>
            <span className="font-semibold">Mobile:</span> {mobile}
          </p>
        )}
        {address && (
          <p>
            <span className="font-semibold">Address:</span> {address}
          </p>
        )}
        {paymentOption && (
          <p>
            <span className="font-semibold">Payment Option:</span>{" "}
            {paymentOption}
          </p>
        )}
        <p className="font-semibold">Total Bill: ₹{totalPrice}</p>
      </div>
      <button
        onClick={() => handlePayment()}
        className={`w-full rounded bg-amber-500 px-12 py-3 text-white duration-100 hover:bg-amber-600 hover:shadow-lg ${
          items.length
            ? "duration-200 hover:-translate-y-1"
            : "cursor-not-allowed opacity-50"
        }`}
      >
        Pay ₹{totalPrice}
      </button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
        className="h-full"
      >
        <CircularProgress color="warning" />
        <h1 className="ml-4 text-2xl">Processing...</h1>
      </Backdrop>
    </div>
  );
}
