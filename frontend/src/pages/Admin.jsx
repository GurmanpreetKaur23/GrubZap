import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Preloader from "../components/Preloader";

function Admin() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-top bg-no-repeat">
      <Preloader>
        <span>FOODOS</span>
        <span>|</span>
        <span>Delights</span>
        <span>Delivered</span>
      </Preloader>
      <div className="flex h-screen overflow-hidden">
        {/* left side  */}
        <div className="bg-blur2 h-screen w-1/4 p-4">
          <div className="mx-auto flex h-screen w-full flex-col gap-y-8 overflow-hidden rounded shadow-md">
            <Link to="/home">
              <h1 className="text-center text-3xl font-bold">FoodOS</h1>
            </Link>
            <div className="flex h-screen flex-col py-4 pl-4">
              {/* Sidebar tabs */}
              <div className="flex flex-col">
                <button className="bg-blur1 mb-2 mr-2  rounded-full rounded-l-full px-4 py-2 hover:-translate-y-1 hover:bg-amber-400">
                  Add Restaurant
                </button>
              </div>

              {/* Signout button */}
              <button
                onClick={() => {
                  axios
                    .post(
                      `${import.meta.env.VITE_BASE_SERVER_URL}/logout`,
                      {},
                      {
                        withCredentials: true,
                      },
                    )
                    .then((res) => console.log(res))
                    .catch((err) => {
                      console.log(err);
                    });
                  navigate("/login");
                }}
                className="mx-2 mb-4 mt-auto rounded bg-red-500 px-4 py-3 text-center text-white duration-100 hover:-translate-y-1 hover:bg-red-600 hover:shadow-lg"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="h-screen w-3/4 p-8">
          <h1 className="text-center text-3xl">Welcome Admin!</h1>
          <div className="bg-blur1 mx-auto mt-8 h-fit w-1/2 rounded-md py-8 text-black">
            <h1 className="mb-2 text-center text-3xl">Add restaurant</h1>

            <form
              action={`${import.meta.env.VITE_BASE_SERVER_URL}/admin/add/restaurant`}
              method="POST"
              className="mx-auto w-full max-w-sm"
            >
              <div className="mb-2">
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-1 w-full rounded-md border p-2"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="mobileNumber" className="block text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobileNumber"
                  //   pattern="[0-9]{10}"
                  required
                  className="mt-1 w-full appearance-none rounded-md border p-2"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="deliveryTime" className="block text-gray-700">
                  Delivery Time
                </label>
                <input
                  type="text"
                  name="deliveryTime"
                  required
                  className="mt-1 w-full appearance-none rounded-md border p-2"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="address" className="block text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  className="mt-1 w-full rounded-md border p-2"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="rating" className="block text-gray-700">
                  Rating
                </label>
                <input
                  type="text"
                  name="rating"
                  required
                  className="mt-1 w-full rounded-md border p-2"
                />
              </div>

              <button
                className="focus:shadow-outline mt-4 rounded bg-amber-500 px-4 py-2 font-bold text-white duration-100 hover:-translate-y-1 hover:bg-amber-700 hover:shadow-lg focus:outline-none"
                type="submit"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
