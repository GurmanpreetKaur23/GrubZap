import { useState } from "react";
import { useNavigate } from "react-router";

function Register() {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_SERVER_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, mobileNumber, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSuccess("Registration successful!");
        console.log("User registered:", data);
        navigate("/home")
        window.location.href = "/home"; 
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h1 className="mb-2 text-center text-3xl">Register</h1>

      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-sm"
      >
        <div className="mb-2">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            pattern="[0-9]{10}"
            required
            className="mt-1 w-full rounded-md border p-2"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full rounded-md border p-2"
          />
        </div>

        {error && (
          <div className="mb-2 text-sm text-red-600">{error}</div>
        )}
        {success && (
          <div className="mb-2 text-sm text-green-600">{success}</div>
        )}

        <div className="my-4">
          <button
            type="submit"
            className="w-full rounded-md bg-amber-500 px-4 py-2 text-white hover:bg-amber-600 focus:bg-amber-600 focus:outline-none"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
