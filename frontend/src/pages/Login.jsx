import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password }
      );
      login(res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const clearEmail = () => {
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      {/* Container: on md and above, flex-row; on small, flex-col */}
      <div className="w-full max-w-5xl bg-gray-50 flex flex-col md:flex-row shadow-none">
        {/* Left panel (brand/info) - hidden on small */}

        <div className="hidden md:flex md:w-1/2 lg:w-2/5 bg-gray-50 items-start justify-center px-4 py-8 h-screen">
          <div className="space-y-4">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-32 h-32 rounded-full object-contain"
            />
            <p className="text-sm text-gray-600">
              Please log in using your authorized credentials to access the
              platform.
            </p>
          </div>
        </div>

        {/* Right panel / form */}
        <div className="w-full md:w-1/2 lg:w-3/5 flex items-end justify-center px-4 md:px-8">
          <div className="w-full max-w-md ">
            {/* On small screens, show logo/title at top */}
            <div className="md:hidden text-center mb-6 flex flex-col items-center space-y-4 justify-center">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-contain" // Adjust the size and styling as necessary
              />

              <p className="text-sm text-gray-600">
                Please log in using your authorized credentials to access the
                platform.
              </p>
            </div>

            {/* Form card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email input */}
                <fieldset className="relative border border-gray-300 rounded-lg px-3 py-2">
                  <legend className="text-sm text-gray-600 px-2 bg-white">
                    Enter address
                  </legend>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full border-0 focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-400 bg-transparent"
                    required
                  />
                  {/* Icons */}
                  {!email && (
                    <InformationCircleIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" />
                  )}
                  {email && (
                    <button
                      type="button"
                      onClick={clearEmail}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      aria-label="Clear email"
                    >
                      <XMarkIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                    </button>
                  )}
                </fieldset>

                {/* Password input */}
                <div className="space-y-1">
                  <fieldset className="relative border border-gray-300 rounded-lg px-3 py-2">
                    <legend className="text-sm text-gray-600 px-2 bg-white">
                      Enter your password
                    </legend>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full border-0 focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-400 bg-transparent"
                      required
                    />
                    {/* Show/hide toggle */}
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                      ) : (
                        <EyeIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                      )}
                    </button>
                  </fieldset>

                  {/* Forgot password link positioned to the right, below input */}
                  <div className="text-right mt-1">
                    <button
                      type="button"
                      // onClick={() => navigate("/forgot-password")}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      FORGOT PASSWORD?
                    </button>
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {/* Terms checkbox */}
                <div className="flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="h-4 w-4 border-2 border-[#00235E] bg-white rounded appearance-none checked:border-[#00235E] checked:bg-white focus:ring-0 custom-checkbox"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                    I agree to the{" "}
                    <a
                      href="/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00235E] hover:underline"
                    >
                      terms & policy
                    </a>
                    .
                  </label>
                </div>

                {/* Login button */}
                <button
                  type="submit"
                  disabled={!termsAccepted || isLoading}
                  className={`
                    w-full py-3 px-4 rounded-lg text-white font-medium transition-colors focus:ring-2 focus:ring-[#00235E] focus:ring-offset-2
                    ${
                      termsAccepted
                        ? "bg-[#00235E] hover:bg-[#001c3d] disabled:bg-[#001f45]"
                        : "bg-[#00235E] cursor-not-allowed"
                    }
                  `}
                >
                  {isLoading ? "Signing in..." : "Login"}
                </button>
              </form>

              {/* Or separator */}
              <div className="flex items-center justify-center space-x-3">
                <span className="h-px w-8 bg-gray-300"></span>
                <span className="text-sm text-gray-500">Or</span>
                <span className="h-px w-8 bg-gray-300"></span>
              </div>

              {/* Social sign-in buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    /* handle Google sign-in */
                  }}
                  className="flex-1 flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
                >
                  <FcGoogle className="w-5 h-5 mr-2" />
                  <span className="text-sm text-gray-700">
                    Sign in with Google
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    /* handle Apple sign-in */
                  }}
                  className="flex-1 flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
                >
                  <FaApple className="w-5 h-5 mr-2 text-gray-800" />
                  <span className="text-sm text-gray-700">
                    Sign in with Apple
                  </span>
                </button>
              </div>

              {/* Sign up link */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  New here?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
