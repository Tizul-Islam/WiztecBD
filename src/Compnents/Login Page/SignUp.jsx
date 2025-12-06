import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Home, User } from 'lucide-react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider.jsx';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { createUser, updateUserProfile, signInWithGoogle, signInWithApple } = useContext(AuthContext);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const captcha = form.captcha.value;

    if (validateCaptcha(captcha) === true) {
      createUser(email, password)
        .then(result => {
          const loggedUser = result.user;
          console.log(loggedUser);
          updateUserProfile(name)
            .then(() => {
              Swal.fire({
                title: 'User Login Successful.',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              });
              navigate('/');
            })
            .catch(error => console.log(error))
        })
        .catch(error => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          });
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Captcha Does Not Match!',
      });
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        Swal.fire({
          title: 'User Login Successful.',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });
        navigate('/');
      })
      .catch(error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  }

  const handleAppleSignIn = () => {
    signInWithApple()
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        Swal.fire({
          title: 'User Login Successful.',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });
        navigate('/');
      })
      .catch(error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  }

  return (
    <div className="min-h-screen w-full flex bg-white font-sans text-slate-800">

      {/* LEFT SECTION - FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 py-12">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="bg-[#6b0f44] p-1.5 rounded-md text-white">
              <Home size={20} fill="currentColor" />
            </div>
            <span className="text-2xl font-bold text-[#6b0f44]">WiztecBD</span>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
            <p className="text-gray-500 text-sm">Join us to find your dream property</p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-8">
            <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-colors">
              {/* Google SVG */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">Continue with Google</span>
            </button>

            <button onClick={handleAppleSignIn} className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-1.16 3.86-1.16.59.04 2.25.26 3.31 1.81-2.9 1.76-2.4 5.95.54 7.15-.65 1.75-1.56 3.48-2.79 4.43zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Continue with Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-8">
            <div className="border-t border-gray-200 w-full"></div>
            <span className="bg-white px-4 text-xs text-gray-400 font-medium">Or</span>
            <div className="border-t border-gray-200 w-full"></div>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1 ml-1">Name</label>
              <input
                type="text"
                name='name'
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#6b0f44]/20 focus:outline-none transition-all"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1 ml-1">Email</label>
              <input
                type="email"
                name='email'
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#6b0f44]/20 focus:outline-none transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1 ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name='password'
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#6b0f44]/20 focus:outline-none transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>
            {/*live capchar*/}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer select-none">

                <LoadCanvasTemplate />
              </label>
              <input type="text" name="captcha" placeholder="Enter Captcha" className="w-1/2 bg-gray-50 border-none rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#6b0f44]/20 focus:outline-none transition-all" />

            </div>
            {/* Submit Button */}
            <div className="w-full bg-[#6b0f44] hover:bg-[#520b33] text-white font-medium py-3.5 rounded-xl transition-all shadow-lg shadow-[#6b0f44]/20">
              <input type="submit" value="Sign Up" className="w-full cursor-pointer" />
            </div>
          </form>
          {/* Footer */}

        </div>
      </div>

      {/* RIGHT SECTION - IMAGE */}
      {/* Hidden on mobile, Flex on lg screens */}
      <div className="hidden lg:flex lg:w-1/2 p-4 h-screen sticky top-0">
        <div className="relative w-full h-full rounded-l-[4rem] rounded-r-[4rem] overflow-hidden">

          {/* 1. Define the Custom Shape SVG */}
          <svg className="absolute w-0 h-0">
            <defs>

              <clipPath id="myRoundedShape" clipPathUnits="objectBoundingBox">
                <path d="
        M 0.15 0 
        Q 0.15 0.08 0.075 0.075 
        T 0 0.15 
        L 0 1 
        L 0.85 1 
        Q 0.85 0.92 0.925 0.925 
        T 1 0.85 
        L 1 0 
        Z
      " />
              </clipPath>
            </defs>
          </svg>

          {/* 2. Apply the Shape to the Image */}
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
            alt="City Skyline"
            className="w-full h-full object-cover"
            style={{ clipPath: "url(#myRoundedShape)" }}
          />

        </div>
      </div>

    </div>
  );
};

export default SignUp;