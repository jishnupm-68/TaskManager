import React, { useEffect, useState } from "react";
import InputField from "./shared/InputField";
import Response from "./shared/Response";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/store/slice/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [response, setResponse] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;
    if (isLoginForm) {
      const login = await fetch(BASE_URL + "login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      result = await login.json();
      dispatch(setUser(result?.data));
      setResponse(result);
    } else {
      const signup = await fetch(BASE_URL + "signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, email, password }),
      });
      result = await signup.json();
      dispatch(setUser(result?.data));
      setResponse(result);
    }
  };
  useEffect(() => {
    let result = response;
    const timer = setTimeout(() => {
      setResponse(null);
    }, 3000);
    if (result?.status) navigate("/");
    return () => clearTimeout(timer);
  }, [response]);
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            {isLoginForm ? "Login " : "Signup"} Here
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLoginForm && (
              <InputField
                value={userName}
                setValue={setUserName}
                label="Username"
                type="text"
              />
            )}
            <InputField
              value={email}
              setValue={setEmail}
              label="Email address"
              type="email"
            />
            <InputField
              value={password}
              setValue={setPassword}
              label="Password"
              type="password"
            />
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {isLoginForm ? "Login" : "Signup"}
              </button>
            </div>
            {response && (
              <Response message={response?.message} status={response?.status} />
            )}
          </form>
          <p className="mt-10 text-center text-sm/6 text-gray-400">
            {isLoginForm ? "Not a member? " : "Already a member? "}{" "}
            <button
              onClick={() => setIsLoginForm(!isLoginForm)}
              className="font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer"
            >
              {isLoginForm ? "Register now" : "Login now"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
