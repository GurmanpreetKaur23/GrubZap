import { useState } from "react";
import { useNavigate } from "react-router";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const navigate = useNavigate();

  // ✅ Cooldown duration (in milliseconds)
  const COOLDOWN_DURATION = 3000;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isCooldown) return; // Prevent multiple submissions

    setLoading(true);
    setIsCooldown(true); // Enable cooldown

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_SERVER_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSuccess("Login successful!");
        setError(null);
        navigate("/home");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid credentials");
        setSuccess(null);
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again.");
      setSuccess(null);
    } finally {
      setLoading(false);

      // ✅ Set cooldown for button to prevent spam
      setTimeout(() => {
        setIsCooldown(false);
      }, COOLDOWN_DURATION);
    }
  };

  return (
    <div>
      <h1 className="mb-2 text-center text-3xl">Login</h1>

      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-sm">
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
            className="mt-1 w-full appearance-none rounded-md border p-2"
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

        {error && <div className="mb-2 text-sm text-red-600">{error}</div>}
        {success && <div className="mb-2 text-sm text-green-600">{success}</div>}

        <div className="my-4">
          <button
            type="submit"
            disabled={loading || isCooldown}
            className={`w-full rounded-md bg-amber-500 px-4 py-2 text-white transition ${(loading || isCooldown) ? "cursor-not-allowed bg-amber-300" : "hover:bg-amber-600"
              }`}
          >
            {loading ? "Logging in..." : isCooldown ? "Please wait..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
