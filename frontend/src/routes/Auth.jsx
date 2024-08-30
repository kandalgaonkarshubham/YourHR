import { useState } from "react";
import axios from "axios";

import { Album, Briefcase } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "shadcn/tabs";

export default function Auth() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    number: "",
    password: "",
    cpassword: "",
    experience: "",
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    if (
      formData.fullname &&
      formData.email &&
      formData.number &&
      formData.password &&
      formData.cpassword &&
      formData.experience
    ) {
      if (formData.password === formData.cpassword) {
        setLoading(true);
        try {
          const response = await axios.post(
            "http://localhost:5000/register",
            formData
          );
          setResponse(response.data.message);
          setLoading(false);
          setError(null);
          setFormData({
            fullname: "",
            email: "",
            number: "",
            password: "",
            cpassword: "",
            experience: "",
          });
        } catch (error) {
          setLoading(false);
          setError(error.message);
        }
      } else {
        setError("Passwords do not match");
      }
    }
  };
  const handleLogin = async () => {
    if (formData.email && formData.password) {
      try {
        const response = await axios.post("http://localhost:5000/login", {
          email: formData.email,
          password: formData.password,
        });
        console.log(response.data);
        setResponse(response.data.message);
        setError(null);
        setFormData({
          fullname: "",
          email: "",
          number: "",
          password: "",
          cpassword: "",
          experience: "",
        });
      } catch (error) {
        setError(error.message);
      }
    }
  };
  return (
    <>
      <div className="flex min-h-screen w-full items-center justify-center text-gray-600 bg-gray-50">
        <div className="relative">
          <div className="hidden sm:block h-56 w-56 text-teal-300 absolute a-z-10 -left-20 -top-20">
            <svg
              id="patternId"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="a"
                  patternUnits="userSpaceOnUse"
                  width="40"
                  height="40"
                  patternTransform="scale(0.6) rotate(0)"
                >
                  <rect x="0" y="0" width="100%" height="100%" fill="none" />
                  <path
                    d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                    strokeWidth="1"
                    stroke="none"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="800%"
                height="800%"
                transform="translate(0,0)"
                fill="url(#a)"
              />
            </svg>
          </div>
          <div className="hidden sm:block h-28 w-28 text-teal-300 absolute a-z-10 -right-20 -bottom-20">
            <svg
              id="patternId"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="b"
                  patternUnits="userSpaceOnUse"
                  width="40"
                  height="40"
                  patternTransform="scale(0.5) rotate(0)"
                >
                  <rect x="0" y="0" width="100%" height="100%" fill="none" />
                  <path
                    d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                    strokeWidth="1"
                    stroke="none"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="800%"
                height="800%"
                transform="translate(0,0)"
                fill="url(#b)"
              />
            </svg>
          </div>
          <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
            <div className="flex-auto p-6">
              <div className="container flex items-center justify-center px-6 mx-auto">
                <div className="w-full max-w-md">
                  <div className="flex justify-center mx-auto">
                    <svg
                      className="w-10 text-deep-purple-accent-400"
                      viewBox="0 0 16 16"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#14b8a6"
                        d="M13 3c-0.538 0.515-1.185 0.92-1.902 1.178-0.748 0.132-2.818-0.828-3.838 0.152-0.17 0.17-0.38 0.34-0.6 0.51-0.48-0.21-1.22-0.53-1.76-0.84s-1.9-1-1.9-1l-3 3.5s0.74 1 1.2 1.66c0.3 0.44 0.67 1.11 0.91 1.56l-0.34 0.4c-0.058 0.115-0.093 0.25-0.093 0.393 0 0.235 0.092 0.449 0.243 0.607 0.138 0.103 0.311 0.165 0.5 0.165s0.362-0.062 0.502-0.167c-0.094 0.109-0.149 0.249-0.149 0.402 0 0.193 0.088 0.365 0.226 0.479 0.144 0.085 0.317 0.135 0.501 0.135s0.357-0.050 0.505-0.137c-0.112 0.139-0.177 0.313-0.177 0.503s0.065 0.364 0.174 0.502c0.099 0.035 0.214 0.056 0.334 0.056 0.207 0 0.399-0.063 0.558-0.17-0.043 0.095-0.065 0.203-0.065 0.317 0 0.234 0.096 0.445 0.252 0.595 0.13 0.059 0.283 0.093 0.443 0.093 0.226 0 0.437-0.068 0.611-0.185l0.516-0.467c0.472 0.47 1.123 0.761 1.842 0.761 0.020 0 0.041-0 0.061-0.001 0.494-0.042 0.908-0.356 1.094-0.791 0.146 0.056 0.312 0.094 0.488 0.094 0.236 0 0.455-0.068 0.64-0.185 0.585-0.387 0.445-0.687 0.445-0.687 0.125 0.055 0.27 0.087 0.423 0.087 0.321 0 0.61-0.142 0.806-0.366 0.176-0.181 0.283-0.427 0.283-0.697 0-0.19-0.053-0.367-0.145-0.518 0.008 0.005 0.015 0.005 0.021 0.005 0.421 0 0.787-0.232 0.978-0.574 0.068-0.171 0.105-0.363 0.105-0.563 0-0.342-0.11-0.659-0.296-0.917l0.003 0.005c0.82-0.16 0.79-0.57 1.19-1.17 0.384-0.494 0.852-0.902 1.387-1.208zM12.95 10.060c-0.44 0.44-0.78 0.25-1.53-0.32s-2.24-1.64-2.24-1.64c0.061 0.305 0.202 0.57 0.401 0.781 0.319 0.359 1.269 1.179 1.719 1.599 0.28 0.26 1 0.78 0.58 1.18s-0.75 0-1.44-0.56-2.23-1.94-2.23-1.94c-0.001 0.018-0.002 0.038-0.002 0.059 0 0.258 0.104 0.491 0.272 0.661 0.17 0.2 1.12 1.12 1.52 1.54s0.75 0.67 0.41 1-1.030-0.19-1.41-0.58c-0.59-0.57-1.76-1.63-1.76-1.63-0.001 0.016-0.001 0.034-0.001 0.053 0 0.284 0.098 0.544 0.263 0.75 0.288 0.378 0.848 0.868 1.188 1.248s0.54 0.7 0 1-1.34-0.44-1.69-0.8c0-0.001 0-0.001 0-0.002 0-0.103-0.038-0.197-0.1-0.269-0.159-0.147-0.374-0.238-0.609-0.238-0.104 0-0.204 0.018-0.297 0.050 0.128-0.114 0.204-0.274 0.204-0.452s-0.076-0.338-0.198-0.45c-0.126-0.095-0.284-0.152-0.455-0.152s-0.33 0.057-0.457 0.153c0.117-0.113 0.189-0.268 0.189-0.441 0-0.213-0.109-0.4-0.274-0.509-0.153-0.097-0.336-0.153-0.532-0.153-0.244 0-0.468 0.088-0.642 0.233 0.095-0.114 0.151-0.26 0.151-0.42 0-0.195-0.085-0.37-0.219-0.491-0.178-0.165-0.417-0.266-0.679-0.266-0.185 0-0.358 0.050-0.507 0.138l-0.665-1.123c-0.46-0.73-1-1.49-1-1.49l2.28-2.77s0.81 0.5 1.48 0.88c0.33 0.19 0.9 0.44 1.33 0.64-0.68 0.51-1.25 1-1.080 1.34 0.297 0.214 0.668 0.343 1.069 0.343 0.376 0 0.726-0.113 1.018-0.307 0.373-0.251 0.84-0.403 1.343-0.403 0.347 0 0.677 0.072 0.976 0.203 0.554 0.374 1.574 1.294 2.504 1.874v0c1.17 0.85 1.4 1.4 1.12 1.68z"
                      ></path>
                    </svg>
                  </div>
                  {error && (
                    <p className="text-sm text-center font-bold mt-4 mb-0 text-red-500">
                      {error}
                    </p>
                  )}
                  {response && (
                    <p className="text-sm text-center font-bold mt-4 mb-0 text-green-500">
                      {response}
                    </p>
                  )}
                  <div className="flex items-center justify-center mt-6">
                    <Tabs defaultValue="register">
                      <TabsList className="w-full bg-transparent">
                        <TabsTrigger
                          value="login"
                          className="font-medium text-center text-lg capitalize border-b data-[state=active]:border-teal-500"
                        >
                          Login
                        </TabsTrigger>
                        <TabsTrigger
                          value="register"
                          className="font-medium text-center text-lg capitalize border-b data-[state=active]:border-teal-500"
                        >
                          Register
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="login">
                        <div className="relative flex items-center mt-8">
                          <input
                            type="email"
                            className="block w-full py-3 text-gray-700 border rounded-xl px-4 border-gray-200 outline-none"
                            placeholder="Email Address"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                            disabled={loading}
                            required
                          />
                        </div>
                        <div className="relative flex items-center mt-4">
                          <input
                            type="password"
                            className="block w-full py-3 text-gray-700 border rounded-xl px-4 border-gray-200 outline-none"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                            disabled={loading}
                            required
                          />
                        </div>
                        <div className="mt-6">
                          <button
                            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-teal-500 rounded-lg hover:bg-teal-400 focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-50"
                            onClick={handleLogin}
                            disabled={loading}
                          >
                            Sign In
                          </button>
                          <div className="mt-6 text-center ">
                            <a
                              href="#"
                              className="text-sm text-teal-500 hover:underline"
                            >
                              Don&apos;t have an Account? Sign Up
                            </a>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="register">
                        <div className="relative flex items-center mt-8">
                          <input
                            type="text"
                            className="block w-full py-3 text-gray-700 border rounded-xl px-4 border-gray-200 outline-none"
                            placeholder="Full Name"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            disabled={loading}
                            required
                          />
                        </div>
                        <div className="relative flex items-center mt-4">
                          <input
                            type="email"
                            className="block w-full py-3 text-gray-700 border rounded-xl px-4 border-gray-200 outline-none"
                            placeholder="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                            required
                          />
                        </div>
                        <div className="relative flex items-center mt-4">
                          <input
                            type="text"
                            className="block w-full py-3 text-gray-700 border rounded-xl px-4 border-gray-200 outline-none"
                            placeholder="Mobile Number"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            disabled={loading}
                            required
                          />
                        </div>
                        <div className="relative flex items-center mt-6">
                          <input
                            type="password"
                            className="block w-full py-3 text-gray-700 border rounded-xl px-4 border-gray-200 outline-none"
                            placeholder="Create a Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            required
                          />
                        </div>
                        <div className="relative flex items-center mt-4">
                          <input
                            type="password"
                            className="block w-full py-3 text-gray-700 border rounded-xl px-4 border-gray-200 outline-none"
                            placeholder="Confirm Password"
                            name="cpassword"
                            value={formData.cpassword}
                            onChange={handleChange}
                            disabled={loading}
                            required
                          />
                        </div>
                        <div className="relative flex flex-col items-center mt-6">
                          <ul className="grid w-full gap-2 grid-cols-1">
                            <li>
                              <input
                                type="radio"
                                id="experienced"
                                name="experience"
                                value="Experienced"
                                className="hidden peer"
                                onChange={handleChange}
                                disabled={loading}
                                checked={formData.experience == "Experienced"}
                                required
                              />
                              <label
                                htmlFor="experienced"
                                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-teal-600 peer-checked:text-teal-600 hover:text-gray-600 hover:bg-gray-100"
                              >
                                <div className="block">
                                  <div className="w-full text-lg font-semibold">
                                    I&apos;m Experienced
                                  </div>
                                  <div className="w-full">
                                    I have Work Experience
                                  </div>
                                </div>
                                <Briefcase className="w-6 h-6 ms-3" />
                              </label>
                            </li>
                            <li>
                              <input
                                type="radio"
                                id="fresher"
                                name="experience"
                                value="Fresher"
                                className="hidden peer"
                                onChange={handleChange}
                                disabled={loading}
                                checked={formData.experience == "Fresher"}
                                required
                              />
                              <label
                                htmlFor="fresher"
                                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-teal-600 peer-checked:text-teal-600 hover:text-gray-600 hover:bg-gray-100"
                              >
                                <div className="block">
                                  <div className="w-full text-lg font-semibold">
                                    I&apos;m a Fresher
                                  </div>
                                  <div className="w-full">
                                    I am a student/ Haven&apos;t worked after
                                    graduation
                                  </div>
                                </div>
                                <Album className="w-8 h-8 ms-3" />
                              </label>
                            </li>
                          </ul>
                        </div>

                        <div className="mt-6">
                          <button
                            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-teal-500 rounded-lg hover:bg-teal-400 focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-50"
                            onClick={handleRegister}
                            disabled={loading}
                          >
                            Sign Up
                          </button>
                          <div className="mt-6 text-center ">
                            <a
                              href="#"
                              className="text-sm text-teal-500 hover:underline"
                            >
                              Already have an account?
                            </a>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
