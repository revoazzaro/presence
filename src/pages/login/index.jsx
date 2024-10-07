import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  const eyeOff = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#000"
    >
      <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
    </svg>
  );

  const eye = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#000"
    >
      <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
    </svg>
  );

  const [password, setPassword] = useState("");
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type==='password'){
       setIcon(eye);
       setType('text')
    } else {
       setIcon(eyeOff)
       setType('password')
    }
 }

  async function login(e) {
    e.preventDefault();
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_SISWA}/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error:", errorData.message);
        const errorDataJson = errorData.message.replace(/\"/g,"")
        setErrorMessage("Login failed: " + errorDataJson);
        return;
      }

      console.log("Response:", res);
      const json = await res.json();
      console.log("Response JSON:", json);

      if (json.status === "success" && json.data) {
        const token = json.data;
        console.log("Token received:", token);

        localStorage.setItem("authToken", token);

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
          console.error(
            "Failed to fetch user details:",
            userRes.status,
            errorText
          );
          setErrorMessage("Failed to fetch user details. Please try again.");
          return;
        }

        const userJson = await userRes.json();
        console.log("User details JSON:", userJson);

        if (userJson.data && userJson.data.role) {
          localStorage.setItem("userRole", userJson.data.role);
          console.log("User role saved:", userJson.data.role);
          navigate("/");
        } else {
          console.error(
            "Role is undefined in user details response:",
            userJson.data
          );
          setErrorMessage("Role is undefined. Please try again.");
        }
      } else {
        console.error("Token not found in response");
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  }

  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[88vh] lg:py-0 font-poppinsSemiBold">
          <div className="w-full bg-[#fefefe] rounded-lg md:mt-0 sm:max-w-md xl:p-0 shadow-xl">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-black font-bold leading-tight tracking-tight md:text-2xl">
                Login to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={login}
              >
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
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-[11px]"
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
                  <div className="flex relative">
                    <input
                      type={type}
                      name="password"
                      id="password"
                      className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-[11px] "
                      ref={passwordRef}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {password.length > 0 ? <span className="absolute right-0 mt-3 mr-3 hover:cursor-pointer" onClick={handleToggle}>{icon}</span> : null}
                  </div>
                </div>
                {errorMessage && (
                  <div className="text-red-500 text-sm">{errorMessage}</div>
                )}
                <button
                  type="submit"
                  className="w-full text-white bg-black hover:bg-gray-100 hover:text-black hover:border-[1px] hover:border-[#000000] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
                >
                  Login
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
