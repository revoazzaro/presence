import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');

  async function login(e) {
    e.preventDefault();
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    if (!data.username || !data.password) {
      setErrorMessage('Username and password are required');
      return;
    }
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_SISWA}/login`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error:', errorData.message);
        setErrorMessage('Login failed: ' + errorData.message);
        return;
      }
      
      console.log('Response:', res);
      const json = await res.json();
      console.log('Response JSON:', json);

      if (json.status === 'success' && json.data) {
        const token = json.data;
        console.log('Token received:', token);
        
        localStorage.setItem('authToken', token);

        const userRes = await fetch(`${import.meta.env.VITE_API_SISWA}/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          credentials: "include",
        });

        if (!userRes.ok) {
          const errorText = await userRes.text();
          console.error('Failed to fetch user details:', userRes.status, errorText);
          setErrorMessage('Failed to fetch user details. Please try again.');
          return;
        }
  
        const userJson = await userRes.json();
        console.log('User details JSON:', userJson);
  
        if (userJson.data && userJson.data.role) {
          localStorage.setItem("userRole", userJson.data.role);
          console.log('User role saved:', userJson.data.role);
          navigate('/');
        } else {
          console.error('Role is undefined in user details response:', userJson.data);
          setErrorMessage('Role is undefined. Please try again.');
        }
      } else {
        console.error('Token not found in response');
      }
  
    } catch (error) {
      console.error('Request failed:', error);
    }
  }

  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="w-full bg-[#fafafa] rounded-lg md:mt-0 sm:max-w-md xl:p-0 shadow-xl">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-black font-bold leading-tight tracking-tight md:text-2xl">
                Login to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={login}>
                <div>
                  <label
                    htmlFor="Username"
                    className="block mb-2 text-md font-medium text-black"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="text"
                    id="text"
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    ref={usernameRef}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-black text-md"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    ref={passwordRef}
                    required
                  />
                  <span></span>
                </div>
                {errorMessage && (
                  <div className="text-red-500 text-sm">
                    {errorMessage}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full text-white bg-black hover:bg-gray-100 hover:text-black hover:border-[1px] hover:border-[#000000] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
