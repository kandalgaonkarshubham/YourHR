import { useState, useEffect } from "react";
import axios from "axios";

import Header from "components/Header";
import Footer from "components/Footer";

import {
  Plus,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  ArrowDownToLine,
  Pencil,
  Upload,
} from "lucide-react";

import { useAuth } from "../auth/AuthContext";

import { Badge } from "shadcn/badge";
import Combobox from "shadcn/combobox";
import ComboboxMultiple from "shadcn/comboboxMultiple";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "shadcn/dialog";
import { Country } from "country-state-city";

export default function Profile() {
  const { user, storeUser } = useAuth();

  const [openDialog, setOpenDialog] = useState(false);
  const [skills, setSkills] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [updatedInfo, setUpdatedInfo] = useState({});
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", user.email);
    if (updatedInfo.pic) formData.append("pic", updatedInfo.pic);
    if (updatedInfo.resume) formData.append("resume", updatedInfo.resume);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );
      storeUser(response.data);
      setUpdatedInfo((prev) => ({
        ...prev,
        pic: null,
        resume: null,
      }));
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };
  const handleSubmit = async () => {
    if (updatedInfo) {
      const updateSkills = (updatedInfo) => {
        const newUpdatedInfo = { ...updatedInfo };
        if (newUpdatedInfo.skills) {
          newUpdatedInfo.skills = newUpdatedInfo.skills.join(",");
        }
        return newUpdatedInfo;
      };
      const newUpdatedInfo = updateSkills(updatedInfo);
      try {
        const response = await axios.post("http://localhost:5000/user", {
          email: user.email,
          updatedInfo: newUpdatedInfo,
        });
        storeUser(response.data.user);
        setUpdatedInfo({});
        setOpenDialog(false);
      } catch (error) {
        setError(error.response.data.message);
      }
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await axios.get("http://localhost:5000/skills");
      setSkills(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDepts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/depts");
      setDepartments(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSkills();
    fetchDepts();
  }, []);

  return (
    <>
      <Header />
      <div className="bg-gray-50">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 min-[867px]:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 min-[867px]:col-span-3 space-y-4">
              <div className="bg-white shadow rounded-xl p-6">
                <div className="flex flex-col items-center">
                  <form
                    id="file"
                    onSubmit={handleUpload}
                    encType="multipart/form-data"
                    className="w-44 h-44 flex flex-col items-center justify-center"
                  >
                    <input
                      type="file"
                      id="pic"
                      name="pic"
                      accept="image/jpg"
                      className="hidden"
                      onChange={(e) => {
                        setUpdatedInfo((prev) => ({
                          ...prev,
                          pic: e.target.files[0],
                        }));
                      }}
                    />
                    <label
                      htmlFor="pic"
                      className="w-32 h-32 bg-gray-300 rounded-full flex flex-col items-center justify-center cursor-pointer"
                    >
                      {user.pic ? (
                        <img
                          src={user.pic}
                          className="w-32 h-32 rounded-full shrink-0"
                        />
                      ) : (
                        <>
                          {updatedInfo.pic ? (
                            <img
                              src={URL.createObjectURL(updatedInfo.pic)}
                              className="w-32 h-32 rounded-full shrink-0"
                            />
                          ) : (
                            <Upload
                              width={40}
                              height={40}
                              className="text-gray-400"
                            />
                          )}
                        </>
                      )}
                    </label>
                    <button
                      type="submit"
                      className={`bg-teal-500 rounded-full px-2 py-1 mt-2 ${
                        !updatedInfo.pic && "hidden"
                      }`}
                    >
                      Submit
                    </button>
                  </form>
                  <h1 className="text-xl text-center font-bold">
                    {user.fullname}
                  </h1>
                  <div className=" flex flex-col items-start justify-center gap-2 mt-4 break-all">
                    <a
                      href="tel:8463827463"
                      className="flex items-center gap-2"
                    >
                      <Phone width={18} className="text-gray-600" />
                      {user.number}
                    </a>
                    <a
                      href="mailto:johndoe@test.com"
                      className="flex items-center gap-2"
                    >
                      <Mail width={18} className="text-gray-600" />
                      {user.email}
                    </a>
                    <p className="flex items-center gap-2">
                      <MapPin width={18} className="text-gray-600" />
                      {user.country ? (
                        user.country
                      ) : (
                        <span
                          className="text-red-500 cursor-pointer"
                          onClick={() => setOpenDialog(true)}
                        >
                          Update your location
                        </span>
                      )}
                    </p>
                    <p className="flex items-center gap-2">
                      <Briefcase width={18} className="text-gray-600" />
                      {user.experience}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col bg-white shadow rounded-xl p-6">
                <p className="flex items-center justify-between text-gray-700 uppercase font-bold tracking-wider mb-2">
                  <span>Skills</span>
                  <button onClick={() => setOpenDialog(true)}>
                    <Plus width={18} />
                  </button>
                </p>
                <div className="w-full flex flex-wrap items-center gap-2 mt-2">
                  {user.skills ? (
                    <>
                      {user.skills.split(",").map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="text-sm"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </>
                  ) : (
                    <span className="text-red-500">
                      Add skills to your profile
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col bg-white shadow rounded-xl p-6">
                <p className="flex items-center justify-between text-gray-700 uppercase font-bold tracking-wider mb-2">
                  <span>Projects</span>
                  <Plus width={18} />
                </p>
                <p className="text-sm">
                  Stand out to employers by adding details about projects that
                  you have done so far
                </p>
              </div>
              <div className="flex flex-col bg-white shadow rounded-xl p-6">
                <p className="flex items-center justify-between text-gray-700 uppercase font-bold tracking-wider mb-2">
                  <span>Languages</span>
                  <Plus width={18} />
                </p>
                <div className="w-full flex flex-wrap items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-sm">
                    English
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    Hindi
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    Spanish
                  </Badge>
                </div>
              </div>
            </div>
            <div className="col-span-4 min-[867px]:col-span-9">
              <div className="flex flex-col gap-4">
                <div className="bg-white shadow rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-xl font-bold">About Me</h2>
                    <Pencil width={15} className="text-gray-400" />
                  </div>
                  <p className="text-gray-700">
                    Im a dedicated and proactive person with a knack for
                    etterment. I excel at everything, consistently delivering
                    high-quality results. My strong problem-solving skills and
                    passion for continuous learning drive me to tackle
                    challenges head-on and contribute meaningfully to projects.
                  </p>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-4">Resume</h2>
                  {user.resume && (
                    <div className="flex items-center justify-between text-gray-700 mb-2">
                      <div className="flex flex-col">
                        <p className="font-semibold">
                          {
                            user.resume.split("/")[
                              user.resume.split("/").length - 1
                            ]
                          }
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <a
                          download
                          target="_blank"
                          href={user.resume}
                          className="no-underline text-inherit cursor-pointer"
                        >
                          <ArrowDownToLine
                            width={30}
                            height={30}
                            className="text-teal-500 bg-gray-200 rounded-full p-[0.40rem]"
                          />
                        </a>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col items-center justify-center gap-4 w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-[9.8rem] border-2 border-teal-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-teal-50"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-teal-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        {updatedInfo.resume ? (
                          <p className="mb-2 text-sm text-gray-500">
                            {updatedInfo.resume.name}
                          </p>
                        ) : (
                          <>
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PDF Only</p>
                          </>
                        )}
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        name="resume"
                        className="hidden"
                        accept="application/pdf"
                        onChange={(e) => {
                          setUpdatedInfo((prev) => ({
                            ...prev,
                            resume: e.target.files[0],
                          }));
                        }}
                      />
                    </label>
                    <button
                      className={`w-full bg-teal-500 text-white rounded-lg px-2 py-1 ${
                        !updatedInfo.resume && "hidden"
                      }`}
                      onClick={handleUpload}
                    >
                      Upload
                    </button>
                  </div>
                </div>
                {user.experience == "Experienced" && (
                  <div className="bg-white shadow rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="text-xl font-bold">Experience </h2>
                      <Pencil width={15} className="text-gray-400" />
                    </div>
                    <div className="flex flex-col gap-2 text-gray-700">
                      <div className="flex flex-row items-center justify-between font-semibold px-2">
                        <p className="text-lg">Fullstack Web Developer</p>
                        <p className="text-sm uppercase">
                          June 2023 - August 2023
                        </p>
                      </div>
                      <ul className="list-disc px-5 space-y-2">
                        <li>
                          Developed and maintained web applications using the
                          MERN stack (MongoDB, Express.js, React, Node.js),
                          improving application performance and user experience.
                        </li>
                        <li>
                          Collaborated with the development team to implement
                          new features, resolve bugs, and enhance functionality
                          based on user feedback.
                        </li>
                        <li>
                          Integrated third-party APIs and services, including
                          authentication with OAuth and data storage with
                          Supabase.
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                <div className="bg-white shadow rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-xl font-bold">Career profile</h2>
                    <Pencil width={15} className="text-gray-400" />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="w-full sm:w-56 h-14 flex flex-col p-0 m-0">
                      <span className="text-gray-500 font-medium">
                        Department
                      </span>
                      <Combobox
                        data={departments}
                        className="text-base text-gray-800 font-bold border-none p-0 m-0"
                        name="department"
                        setUpdatedInfo={setUpdatedInfo}
                        selected={user.department}
                      />
                    </p>
                    <p className="w-full sm:w-56 h-14 flex flex-col p-0 m-0">
                      <span className="text-gray-500 font-medium">
                        Desired job type
                      </span>
                      <Combobox
                        data={[
                          { name: "Permanent" },
                          { name: "Parttime" },
                          { name: "Internship" },
                          { name: "Contract" },
                          { name: "Freelance" },
                        ]}
                        className="text-base text-gray-800 font-bold border-none p-0 m-0"
                        name="desiredJobType"
                        setUpdatedInfo={setUpdatedInfo}
                        selected={user.desiredJobType}
                      />
                    </p>
                    <p className="w-full sm:w-56 h-14 flex flex-col p-0 m-0">
                      <span className="text-gray-500 font-medium">
                        Preferred work location
                      </span>
                      <Combobox
                        data={[
                          { name: "Remote" },
                          { name: "Onsite" },
                          { name: "Hybrid" },
                        ]}
                        className="text-base text-gray-800 font-bold border-none p-0 m-0"
                        name="desiredWorkLocation"
                        setUpdatedInfo={setUpdatedInfo}
                        selected={user.desiredWorkLocation}
                      />
                    </p>
                    <p className="w-full sm:w-56 h-14 flex flex-col p-0 m-0 mb-4">
                      <span className="text-gray-500 font-medium">
                        Expected salary
                      </span>
                      <span className="text-xs text-gray-300">
                        1000 to 120000
                      </span>
                      <input
                        type="number"
                        name="desiredSalary"
                        placeholder="10000"
                        min="1000"
                        max="120000"
                        defaultValue={user.desiredSalary}
                        onChange={handleChange}
                        className="text-gray-800 font-bold outline-none border-b border-gray-500 my-2"
                      />
                    </p>
                  </div>
                </div>
                <button
                  className={`w-full bg-gray-200 text-black rounded-lg px-2 py-1 ${
                    !updatedInfo.department &&
                    !updatedInfo.desiredJobType &&
                    !updatedInfo.desiredWorkLocation &&
                    !updatedInfo.desiredSalary &&
                    "hidden"
                  }`}
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-4">Edit Profile</DialogTitle>
            <DialogDescription className="mb-4">{error}</DialogDescription>
            <div className="w-full flex flex-col gap-4">
              <div className="relative">
                <label
                  htmlFor="fullname"
                  className="leading-7 text-sm text-gray-600"
                >
                  FullName
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  defaultValue={user.fullname}
                  onChange={handleChange}
                  className="w-full bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={user.email}
                  onChange={handleChange}
                  className="w-full bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="number"
                  className="leading-7 text-sm text-gray-600"
                >
                  Number
                </label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  defaultValue={user.number}
                  onChange={handleChange}
                  className="w-full bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="country"
                  className="leading-7 text-sm text-gray-600"
                >
                  Country
                </label>
                <Combobox
                  name="country"
                  data={Country.getAllCountries()}
                  setUpdatedInfo={setUpdatedInfo}
                  selected={user.country}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="city"
                  className="leading-7 text-sm text-gray-600"
                >
                  Skills
                </label>
                <ComboboxMultiple
                  name="skills"
                  data={skills}
                  setUpdatedInfo={setUpdatedInfo}
                  selected={user.skills}
                />
              </div>
            </div>
          </DialogHeader>
          <DialogFooter>
            <button
              className="bg-teal-400 text-white rounded-full px-5 py-2 mt-2"
              onClick={handleSubmit}
            >
              Save
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Footer />
    </>
  );
}
