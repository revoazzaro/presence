import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();

  async function login(e) {
    e.preventDefault();
    const data = {username: usernameRef.current.value, password: passwordRef.current.value};
    const res = await fetch(`${import.meta.env.VITE_API_SISWA}/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include',
    });
    const json = await res.json();
    if(json.token) {
      console.log('LOGIN SUCCESS')
      localStorage.setItem('authToken', json.token)
      navigate('/')
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
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-black hover:bg-gray-100 hover:text-black hover:border-[1px] hover:border-[#000000] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
                  onClick={login}
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
