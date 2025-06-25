import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      return;
    }
    setError('');
    setIsLoading(true);
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        email,
        password
      });
      login(res.data.token);
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Signup failed';
      setError(msg);
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
        <div className="hidden md:flex md:w-1/2 lg:w-2/5 bg-gray-50 items-start justify-center px-8 h-screen">
          <div className="space-y-4">
             <img
              src="/Xsymbol.png"
              alt="Logo"
              className="w-20 h-20 rounded-full object-contain"
            />
             <h1 className="text-3xl font-bold text-[#00235E] mb-2">Sign Up</h1>
            <p className="text-sm text-gray-600">
              Create your account to access the platform and start your journey with us.
            </p>
          </div>
        </div>

        {/* Right panel / form */}
        <div className="w-full md:w-1/2 lg:w-3/5 flex items-center justify-center px-4 md:px-8">
          <div className="w-full max-w-md">
            {/* On small screens, show logo/title at top */}
            <div className="md:hidden flex flex-col items-center text-center mb-6">
              <img
                src="/Xsymbol.png"
                alt="Logo"
                className="w-16 h-16 sm:w-28 sm:h-20 md:w-24 md:h-24 rounded-full object-contain" // Adjust the size and styling as necessary
              />
              <h1 className="text-3xl font-bold text-[#00235E] mb-2">Sign Up</h1>
              <p className="text-sm text-gray-600">
                Create your account to access the platform and start your journey with us.
              </p>
            </div>

            {/* Form card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email input */}
                <fieldset className="relative border border-gray-300 rounded-lg px-3 py-2">
                  <legend className="text-sm text-gray-600 px-2 bg-white">
                    Enter your email address
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
                <fieldset className="relative border border-gray-300 rounded-lg px-3 py-2">
                  <legend className="text-sm text-gray-600 px-2 bg-white">
                    Create a password
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
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                    ) : (
                      <EyeIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                    )}
                  </button>
                </fieldset>

                {/* Confirm Password input */}
                <fieldset className="relative border border-gray-300 rounded-lg px-3 py-2">
                  <legend className="text-sm text-gray-600 px-2 bg-white">
                    Confirm your password
                  </legend>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border-0 focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-400 bg-transparent"
                    required
                  />
                  {/* Show/hide toggle */}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                    ) : (
                      <EyeIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                    )}
                  </button>
                </fieldset>

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

                {/* Sign up button */}
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
                  {isLoading ? "Creating Account..." : "Sign Up"}
                </button>
              </form>

              {/* Login link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Sign In
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