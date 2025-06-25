// // src/pages/Signup.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// export default function Signup() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
//         email,
//         password
//       });
//       // res.data.token assumed
//       login(res.data.token);
//       navigate('/');
//     } catch (err) {
//       // Show backend error message if available
//       const msg = err.response?.data?.message || 'Signup failed';
//       setError(msg);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gray-50">
//       <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
//       <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//           required
//         />
//         <input
//           type="password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           placeholder="Confirm Password"
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//           required
//         />
//         {error && <p className="text-red-500 text-sm">{error}</p>}
//         <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
//           Sign Up
//         </button>
//       </form>
//       <p className="mt-4 text-sm text-gray-600">
//         Already have an account?{' '}
//         <a href="/login" className="text-blue-500 font-medium">
//           Log In
//         </a>
//       </p>
//     </div>
//   );
// }




// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// export default function Signup() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);
    
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
//         email,
//         password
//       });
//       login(res.data.token);
//       navigate('/');
//     } catch (err) {
//       const msg = err.response?.data?.message || 'Signup failed';
//       setError(msg);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* Logo and Brand */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-white rounded-full shadow-lg">
//             <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
//               <span className="text-white font-bold text-lg">K</span>
//             </div>
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h1>
//           <p className="text-gray-600">Create your navigation account</p>
//         </div>

//         {/* Signup Form */}
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Create a password"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
//                 Confirm Password
//               </label>
//               <input
//                 id="confirmPassword"
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 placeholder="Confirm your password"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 required
//               />
//             </div>

//             {error && (
//               <div className="bg-red-50 border border-red-200 rounded-lg p-3">
//                 <p className="text-red-600 text-sm">{error}</p>
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             >
//               {isLoading ? "Creating Account..." : "Create Account"}
//             </button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600">
//               Already have an account?{' '}
//               <button
//                 onClick={() => navigate("/login")}
//                 className="text-blue-600 hover:text-blue-700 font-medium"
//               >
//                 Sign In
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
// import { FcGoogle } from "react-icons/fc";
// import { FaApple } from "react-icons/fa";

// export default function Signup() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
  
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!termsAccepted) {
//       return;
//     }
//     setError('');
//     setIsLoading(true);
    
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
//         email,
//         password
//       });
//       login(res.data.token);
//       navigate('/');
//     } catch (err) {
//       const msg = err.response?.data?.message || 'Signup failed';
//       setError(msg);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const clearEmail = () => {
//     setEmail("");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
//       {/* Container: on md and above, flex-row; on small, flex-col */}
//       <div className="w-full max-w-5xl bg-gray-50 flex flex-col md:flex-row shadow-none">
//         {/* Left panel (brand/info) - hidden on small */}
//         <div className="hidden md:flex md:w-1/2 lg:w-2/5 bg-gray-50 items-center justify-center px-8">
//           <div className="space-y-4">
//             <img
//               src="/logo.png" 
//               alt="Logo"
//               className="w-32 h-32 rounded-full object-contain"
//             />
//             <p className="text-sm text-gray-600">
//               Create your account to access the platform and start your journey with us.
//             </p>
//           </div>
//         </div>

//         {/* Right panel / form */}
//         <div className="w-full md:w-1/2 lg:w-3/5 flex items-center justify-center px-4 md:px-8">
//           <div className="w-full max-w-md">
//             {/* On small screens, show logo/title at top */}
//             <div className="md:hidden text-center mb-6">
//               <img
//                 src="/logo.png" 
//                 alt="Logo"
//                 className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-contain"
//               />
//               <p className="text-sm text-gray-600">
//                 Create your account to access the platform and start your journey with us.
//               </p>
//             </div>

//             {/* Form card */}
//             <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Email input */}
//                 <fieldset className="relative border border-gray-300 rounded-lg px-3 py-2">
//                   <legend className="text-sm text-gray-600 px-2 bg-white">
//                     Enter your email address
//                   </legend>
//                   <input
//                     id="email"
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="user@example.com"
//                     className="w-full border-0 focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-400 bg-transparent"
//                     required
//                   />
//                   {/* Icons */}
//                   {!email && (
//                     <InformationCircleIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" />
//                   )}
//                   {email && (
//                     <button
//                       type="button"
//                       onClick={clearEmail}
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2"
//                       aria-label="Clear email"
//                     >
//                       <XMarkIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
//                     </button>
//                   )}
//                 </fieldset>

//                 {/* Password input */}
//                 <fieldset className="relative border border-gray-300 rounded-lg px-3 py-2">
//                   <legend className="text-sm text-gray-600 px-2 bg-white">
//                     Create a password
//                   </legend>
//                   <input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="••••••••"
//                     className="w-full border-0 focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-400 bg-transparent"
//                     required
//                   />
//                   {/* Show/hide toggle */}
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword((prev) => !prev)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2"
//                     aria-label={showPassword ? "Hide password" : "Show password"}
//                   >
//                     {showPassword ? (
//                       <EyeSlashIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
//                     ) : (
//                       <EyeIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
//                     )}
//                   </button>
//                 </fieldset>

//                 {/* Confirm Password input */}
//                 <fieldset className="relative border border-gray-300 rounded-lg px-3 py-2">
//                   <legend className="text-sm text-gray-600 px-2 bg-white">
//                     Confirm your password
//                   </legend>
//                   <input
//                     id="confirmPassword"
//                     type={showConfirmPassword ? "text" : "password"}
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     placeholder="••••••••"
//                     className="w-full border-0 focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-400 bg-transparent"
//                     required
//                   />
//                   {/* Show/hide toggle */}
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword((prev) => !prev)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2"
//                     aria-label={showConfirmPassword ? "Hide password" : "Show password"}
//                   >
//                     {showConfirmPassword ? (
//                       <EyeSlashIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
//                     ) : (
//                       <EyeIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
//                     )}
//                   </button>
//                 </fieldset>

//                 {/* Error message */}
//                 {error && (
//                   <div className="bg-red-50 border border-red-200 rounded-lg p-3">
//                     <p className="text-red-600 text-sm">{error}</p>
//                   </div>
//                 )}

//                 {/* Terms checkbox */}
//                 <div className="flex items-center">
//                   <input
//                     id="terms"
//                     type="checkbox"
//                     checked={termsAccepted}
//                     onChange={(e) => setTermsAccepted(e.target.checked)}
//                     className="h-4 w-4 text-[#00235E] bg-white border-2 border-gray-400 rounded checked:bg-[#00235E] checked:border-[#00235E] focus:ring-2 focus:ring-[#00235E] focus:ring-opacity-50"
//                   />
//                   <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
//                     I agree to the{" "}
//                     <a
//                       href="/terms"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-[#00235E] hover:underline"
//                     >
//                       terms & policy
//                     </a>
//                     .
//                   </label>
//                 </div>

//                 {/* Sign up button */}
//                 <button
//                   type="submit"
//                   disabled={!termsAccepted || isLoading}
//                   className={`
//                     w-full py-3 px-4 rounded-lg text-white font-medium transition-colors focus:ring-2 focus:ring-[#00235E] focus:ring-offset-2
//                     ${
//                       termsAccepted
//                         ? "bg-[#00235E] hover:bg-[#001c3d] disabled:bg-[#001f45]"
//                         : "bg-[#00235E] cursor-not-allowed"
//                     }
//                   `}
//                 >
//                   {isLoading ? "Creating Account..." : "Sign Up"}
//                 </button>
//               </form>

//               {/* Or separator */}
//               <div className="flex items-center justify-center space-x-3">
//                 <span className="h-px w-8 bg-gray-300"></span>
//                 <span className="text-sm text-gray-500">Or</span>
//                 <span className="h-px w-8 bg-gray-300"></span>
//               </div>

//               {/* Social sign-in buttons */}
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     /* handle Google sign-up */
//                   }}
//                   className="flex-1 flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
//                 >
//                   <FcGoogle className="w-5 h-5 mr-2" />
//                   <span className="text-sm text-gray-700">
//                     Sign up with Google
//                   </span>
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     /* handle Apple sign-up */
//                   }}
//                   className="flex-1 flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
//                 >
//                   <FaApple className="w-5 h-5 mr-2 text-gray-800" />
//                   <span className="text-sm text-gray-700">
//                     Sign up with Apple
//                   </span>
//                 </button>
//               </div>

//               {/* Login link */}
//               <div className="text-center">
//                 <p className="text-sm text-gray-600">
//                   Already have an account?{" "}
//                   <button
//                     type="button"
//                     onClick={() => navigate("/login")}
//                     className="text-blue-600 hover:underline font-medium"
//                   >
//                     Sign In
//                   </button>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



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
        <div className="hidden md:flex md:w-1/2 lg:w-2/5 bg-gray-50 items-center justify-center px-8">
          <div className="space-y-4">
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
            <div className="md:hidden text-center mb-6">
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