import Header from "components/Header";
import Footer from "components/Footer";

import {
  Plus,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  FileBadge,
  ArrowDownToLine,
  Trash2,
  Pencil,
} from "lucide-react";

import { Badge } from "shadcn/badge";

export default function Profile() {
  return (
    <>
      <Header />
      <div className="bg-gray-50">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 min-[867px]:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 min-[867px]:col-span-3 space-y-4">
              <div className="bg-white shadow rounded-xl p-6">
                <div className="flex flex-col items-center">
                  <img
                    src="https://randomuser.me/api/portraits/men/94.jpg"
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  ></img>
                  <h1 className="text-xl font-bold">John Smith Doe</h1>
                  <div className="flex flex-col items-start justify-center gap-2 mt-4">
                    <a
                      href="tel:8463827463"
                      className="flex items-center gap-2"
                    >
                      <Phone width={18} className="text-gray-600" />
                      8463827463
                    </a>
                    <a
                      href="mailto:johndoe@test.com"
                      className="flex items-center gap-2"
                    >
                      <Mail width={18} className="text-gray-600" />
                      johndoe@test.com
                    </a>
                    <p className="flex items-center gap-2">
                      <MapPin width={18} className="text-gray-600" />
                      Ambarnath, India
                    </p>
                    <p className="flex items-center gap-2">
                      <Briefcase width={18} className="text-gray-600" />
                      Fresher
                    </p>
                    <p className="flex items-center gap-2">
                      <FileBadge width={18} className="text-gray-600" />
                      Graduate
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col bg-white shadow rounded-xl p-6">
                <p className="flex items-center justify-between text-gray-700 uppercase font-bold tracking-wider mb-2">
                  <span>Skills</span>
                  <Plus width={18} />
                </p>
                <div className="w-full flex flex-wrap items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-sm">
                    Javascript
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    React
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    Node
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    ExpressJs
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    Mongo
                  </Badge>
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
                    Javascript
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    React
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    Node
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    ExpressJs
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    finibus est vitae tortor ullamcorper, ut vestibulum velit
                    convallis. Aenean posuere risus non velit egestas suscipit.
                    Nunc finibus vel ante id euismod. Vestibulum ante ipsum
                    primis in faucibus orci luctus et ultrices posuere cubilia
                    Curae; Aliquam erat volutpat. Nulla vulputate pharetra
                    tellus, in luctus risus rhoncus id.
                  </p>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-4">Resume</h2>
                  <div className="flex items-center justify-between text-gray-700 mb-2">
                    <div className="flex flex-col">
                      <p className="font-semibold">CV.pdf</p>
                      <p className="text-sm text-gray-400">
                        Uploaded on Aug 07, 2024
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <ArrowDownToLine
                        width={30}
                        height={30}
                        className="text-teal-500 bg-gray-200 rounded-full p-[0.40rem]"
                      />
                      <Trash2
                        width={30}
                        height={30}
                        className="text-teal-500 bg-gray-200 rounded-full p-[0.40rem]"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-full">
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
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <div className="bg-white shadow rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-xl font-bold">Resume Headline</h2>
                    <Pencil width={15} className="text-gray-400" />
                  </div>
                  <p className="text-gray-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequatur dignissimos rem aut enim quibusdam, quam vel
                    asperiores itaque dolorum nobis, nisi libero inventore
                    eveniet harum earum odio! Illo, esse voluptate?
                  </p>
                </div>
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
                      <span className="text-gray-800 font-bold">
                        UX, Design & Architecture
                      </span>
                    </p>
                    <p className="w-full sm:w-56 h-14 flex flex-col p-0 m-0">
                      <span className="text-gray-500 font-medium">
                        Desired job type
                      </span>
                      <span className="text-gray-800 font-bold">
                        contractual, permanent
                      </span>
                    </p>
                    <p className="w-full sm:w-56 h-14 flex flex-col p-0 m-0">
                      <span className="text-gray-500 font-medium">
                        Preferred work location
                      </span>
                      <span className="text-gray-800 font-bold">Remote</span>
                    </p>
                    <p className="w-full sm:w-56 h-14 flex flex-col p-0 m-0">
                      <span className="text-gray-500 font-medium">
                        Expected salary
                      </span>
                      <span className="text-gray-800 font-bold">$3,00,000</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
