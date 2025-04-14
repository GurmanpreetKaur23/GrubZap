/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { CircularProgress, Modal } from "@mui/material";

function OrderDetailsModal({ order, open, handleClose }) {
    const [orderDetail, setOrderDetail] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrderDetails = async (id) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_SERVER_URL}/order/orderDetails/${id}`);

            if (res.status === 200) {
                setOrderDetail(res.data);
            }
        } catch (err) {
            console.error("Error fetching order details:", err);
        } finally {
            setIsLoading(false);
        }
    };

    if (open && isLoading) {
        fetchOrderDetails(order.ORDER_ID);
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <div className="bg-blur1 mx-auto mt-24 h-[75%] w-[50%] overflow-auto p-6 text-black">
                <h1 className="text-2xl">Order details for order #{order.ORDER_ID}</h1>
                {isLoading ? (
                    <div className="mt-8 flex items-center justify-center">
                        <CircularProgress color="warning" size={50} />
                    </div>
                ) : (
                    <>
                        {orderDetail.map((data, dataIndex) => (
                            <div key={dataIndex} className="my-4 h-fit rounded bg-amber-400 p-4 shadow-lg">
                                <p>
                                    <b>Dish name:</b> {data.NAME}
                                </p>
                                <p>
                                    <b>Price:</b> ₹{data.PRICE}
                                </p>
                                <p>
                                    <b>Date:</b> {order.ORDER_TIMESTAMP}
                                </p>
                            </div>
                        ))}
                        <p className="mt-16 text-xl font-semibold">Total Price: ₹{order.TOTAL_AMOUNT}</p>
                        <p className="mt-6 font-semibold">
                            Press <b>ESC</b> to close
                        </p>
                    </>
                )}
            </div>
        </Modal>
    );
}

export default function OrderList({ orderData }) {
    const [openModalIndex, setOpenModalIndex] = useState(null);

    const handleOpen = (index) => {
        setOpenModalIndex(index);
    };

    const handleClose = () => {
        setOpenModalIndex(null);
    };

    return (
        <>
            {orderData.map((order, index) => (
                <div
                    key={index}
                    className={`my-4 h-fit cursor-pointer rounded border-2 p-2 duration-100 hover:-translate-y-1 hover:shadow hover:shadow-amber-500 ${order.STATUS === "Failed" ? "bg-red-100" : "bg-green-100"
                        }`}
                    onClick={() => handleOpen(index)}
                >
                    <OrderDetailsModal order={order} open={openModalIndex === index} handleClose={handleClose} />
                    <p>
                        <b>Order </b>#{order.ORDER_ID}
                    </p>
                    <p>
                        <b>Date:</b> {order.ORDER_TIMESTAMP}
                    </p>
                    <p>
                        <b>Status:</b> {order.STATUS}
                    </p>
                    <p>
                        <b>Price:</b> ₹{order.TOTAL_AMOUNT}
                    </p>
                </div>
            ))}
        </>
    );
}
