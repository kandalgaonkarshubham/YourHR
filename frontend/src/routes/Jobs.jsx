import { useEffect, useState } from "react";
import axios from "axios";

import Header from "components/Header";
import Footer from "components/Footer";

import { MapPin, DollarSign, Filter } from "lucide-react";

import Combobox from "shadcn/combobox";
import { Checkbox } from "shadcn/checkbox";
import { RadioGroup, RadioGroupItem } from "shadcn/radio-group";
import { Slider } from "shadcn/slider";
import { Avatar, AvatarFallback, AvatarImage } from "shadcn/avatar";
import { Badge } from "shadcn/badge";
import { Button } from "shadcn/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "shadcn/drawer";

import ReactPaginate from "react-paginate";

function Loading() {
  return (
    <>
      <p className="font-semibold bg-gray-200 mt-4 h-5 animate-pulse" />
      <div className="w-full flex flex-col gap-4 border border-gray-200 rounded-xl shadow hover:shadow-lg p-4 my-2 cursor-pointer transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
            <div className="flex flex-col gap-1">
              <p className="text-base font-medium ps-1 bg-gray-200 h-5 animate-pulse" />
              <div className="flex items-center gap-2">
                <p className="w-10 h-5 bg-gray-200 animate-pulse rounded-full" />
                <span className="text-gray-400">•</span>
                <p className="w-10 h-5 bg-gray-200 animate-pulse rounded-full" />
                <span className="text-gray-400">•</span>
                <p className="w-10 h-5 bg-gray-200 animate-pulse rounded-full" />
              </div>
            </div>
          </div>
          <div className="w-20 flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-1">
              <p className="w-full h-5 bg-gray-200 animate-pulse" />
            </div>
            <div className="flex items-center gap-1">
              <p className="w-full h-5 bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>
        <p className="text-sm line-clamp-2 h-8 bg-gray-200 animate-pulse" />
      </div>
    </>
  );
}
function Error() {
  return (
    <section className="w-full flex items-center h-full">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto">
        <div className="text-center">
          <img src="img/empty.svg" className="h-[60vh]" />
          <p className="">Star Searching Now!!!</p>
        </div>
      </div>
    </section>
  );
}

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [currentJobs, setCurrentJobs] = useState([]);
  const [currentJobsCount, setCurrentJobsCount] = useState(0);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 6;
  const [pageCount, setPageCount] = useState(0);

  const [search, setSearch] = useState("");

  const [jobDrawerOpen, setjobDrawerOpen] = useState(false);
  const [jobDrawerContent, setjobDrawerContent] = useState({});

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/jobs");
        setJobs(response.data);
      } catch (error) {
        setError(error?.message);
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const handlePaginatonChange = ({ selected }) => {
    const startIndex = selected * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentJobs(jobs.slice(startIndex, endIndex));
  };

  const handleSearch = () => {
    if (search) {
      const words = search
        .toLowerCase()
        .split(" ")
        .filter((word) => word.trim() !== "");
      const results = jobs.filter((job) =>
        words.every((word) => job.jobName.toLowerCase().includes(word))
      );
      setPageCount(0);
      setCurrentJobsCount(results.length);
      setPageCount(Math.ceil(results.length / itemsPerPage));
      setCurrentJobs(results.slice(0, itemsPerPage));
    }
  };

  const JobDrawer = () => {
    return (
      <Drawer
        direction="right"
        open={jobDrawerOpen}
        onOpenChange={setjobDrawerOpen}
      >
        <DrawerContent
          className="h-screen w-[60vw] !flex-row items-center"
          handleBar="w-2 h-1/4"
        >
          <div className="w-full h-full">
            <DrawerHeader>
              <DrawerTitle>{jobDrawerContent.jobName}</DrawerTitle>
              <DrawerDescription>
                This action cannot be undone.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter></DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    );
  };

  return (
    <>
      <Header />
      <div className="bg-teal-50 p-24 bg-[url('/img/banner.svg')] bg-no-repeat bg-contain bg-right">
        <h3 className="font-semibold text-4xl">Find your dream job</h3>
        <p className="font-medium text-lg mt-2">
          Looking for jobs? Browse our latest job openings to view & apply to
          the best jobs today!
        </p>
      </div>
      <div className="flex flex-col">
        <div className="w-full flex gap-4 p-10">
          <div className="w-[30vw] h-max border border-gray-300 rounded-xl">
            <div className="flex items-center justify-between border-b border-gray-300 px-6 py-3 mb-2">
              <p className="text-xl font-semibold">Filter</p>
              <p className="text-sm text-red-500 font-medium">Clear all</p>
            </div>
            <div className="flex flex-col items-start px-6 py-3">
              <p className="text-base font-semibold mb-2">Location</p>
              <Combobox />
              <hr className="w-full border-gray-200 mt-8" />
            </div>
            <div className="flex flex-col items-start px-6 py-3">
              <p className="text-base font-semibold mb-4">Education</p>
              <RadioGroup
                defaultValue="comfortable"
                className="w-full flex flex-wrap items-center justify-between gap-3 font-medium"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="graduate"
                    id="graduate"
                    className=" data-[state=checked]:text-teal-500"
                  />
                  <label htmlFor="graduate">Graduate</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="postgraduate"
                    id="postgraduate"
                    className=" data-[state=checked]:text-teal-500"
                  />
                  <label htmlFor="postgraduate">Post Graduate</label>
                </div>
              </RadioGroup>
              <hr className="w-full border-gray-200 mt-8" />
            </div>
            <div className="flex flex-col items-start px-6 py-3">
              <p className="text-base font-semibold mb-4">Experience</p>
              <Slider defaultValue={[0]} max={10} step={1} />
              <hr className="w-full border-gray-200 mt-8" />
            </div>
            <div className="flex flex-col items-start px-6 py-3">
              <p className="text-base font-semibold mb-4">Job Type</p>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="w-36 flex items-center space-x-2">
                  <Checkbox
                    id="permanent"
                    className="rounded border-gray-300 data-[state=checked]:text-teal-500 data-[state=checked]:border-teal-500 data-[state=checked]:bg-teal-50"
                  />
                  <label
                    htmlFor="permanent"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Permanent
                  </label>
                </div>
                <div className="w-36 flex items-center space-x-2">
                  <Checkbox
                    id="parttime"
                    className="rounded border-gray-300 data-[state=checked]:text-teal-500 data-[state=checked]:border-teal-500 data-[state=checked]:bg-teal-50"
                  />
                  <label
                    htmlFor="parttime"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Part-Time
                  </label>
                </div>
                <div className="w-36 flex items-center space-x-2">
                  <Checkbox
                    id="internship"
                    className="rounded border-gray-300 data-[state=checked]:text-teal-500 data-[state=checked]:border-teal-500 data-[state=checked]:bg-teal-50"
                  />
                  <label
                    htmlFor="internship"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Internship
                  </label>
                </div>
                <div className="w-36 flex items-center space-x-2">
                  <Checkbox
                    id="freelance"
                    className="rounded border-gray-300 data-[state=checked]:text-teal-500 data-[state=checked]:border-teal-500 data-[state=checked]:bg-teal-50"
                  />
                  <label
                    htmlFor="freelance"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Freelance / Contract
                  </label>
                </div>
              </div>
              <hr className="w-full border-gray-200 mt-8" />
            </div>
            <div className="flex flex-col items-start px-6 py-3">
              <p className="text-base font-semibold mb-4">Job Mode</p>
              <div className="w-full flex flex-wrap items-center justify-between gap-3">
                <div className="w-36 flex items-center space-x-2">
                  <Checkbox
                    id="onsite"
                    className="rounded border-gray-300 data-[state=checked]:text-teal-500 data-[state=checked]:border-teal-500 data-[state=checked]:bg-teal-50"
                  />
                  <label
                    htmlFor="onsite"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    On-Site
                  </label>
                </div>
                <div className="w-36 flex items-center space-x-2">
                  <Checkbox
                    id="remote"
                    className="rounded border-gray-300 data-[state=checked]:text-teal-500 data-[state=checked]:border-teal-500 data-[state=checked]:bg-teal-50"
                  />
                  <label
                    htmlFor="remote"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remote
                  </label>
                </div>
                <div className="w-36 flex items-center space-x-2">
                  <Checkbox
                    id="hybrid"
                    className="rounded border-gray-300 data-[state=checked]:text-teal-500 data-[state=checked]:border-teal-500 data-[state=checked]:bg-teal-50"
                  />
                  <label
                    htmlFor="hybrid"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Hybrid
                  </label>
                </div>
              </div>
              <hr className="w-full border-gray-200 mt-8" />
            </div>
            <div className="flex flex-col items-start px-6 py-3 mb-6">
              <p className="text-base font-semibold mb-4">Salary Range</p>
              <RadioGroup
                defaultValue="comfortable"
                className="w-full flex flex-wrap items-center justify-between gap-3 font-medium"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="default"
                    id="r1"
                    className=" data-[state=checked]:text-teal-500"
                  />
                  <label htmlFor="r1">Under $1000</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="comfortable"
                    id="r2"
                    className=" data-[state=checked]:text-teal-500"
                  />
                  <label htmlFor="r2">$1000 to $2000</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="compact"
                    id="r3"
                    className=" data-[state=checked]:text-teal-500"
                  />
                  <label htmlFor="r3">$5000 to $10000</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="custom"
                    id="r4"
                    className=" data-[state=checked]:text-teal-500"
                  />
                  <label htmlFor="r4">Custom</label>
                </div>
              </RadioGroup>
              <Slider
                range={true}
                defaultValue={[1000, 5000]}
                max={10000}
                step={1}
                className="mt-6"
              />
            </div>
          </div>
          <div className="w-full flex flex-col">
            <div className="flex items-center gap-2">
              <Button className="w-16 h-full bg-transparent hover:bg-transparent border border-gray-300 p-0 m-0 hidden">
                <Filter className="text-gray-500" />
              </Button>
              <div className="w-full relative border border-gray-300 rounded">
                <input
                  type="search"
                  className="block w-full p-4 text-sm text-black outline-none"
                  placeholder="Job Title"
                  required
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-teal-700 font-medium rounded-lg text-sm px-4 py-2 pt-1.5"
                  onClick={handleSearch}
                >
                  Find Jobs
                </button>
              </div>
            </div>

            {loading ? (
              <Loading />
            ) : (
              <>
                {currentJobs == 0 ? (
                  <></>
                ) : (
                  <>
                    <p className="font-semibold text-gray-500 mt-4">
                      {currentJobsCount} Jobs Results
                    </p>
                    {currentJobs.map((job) => (
                      <div
                        key={job?.id}
                        className="w-full flex flex-col gap-4 border border-gray-200 rounded-xl shadow hover:shadow-lg p-4 my-2 cursor-pointer transition-all"
                        onClick={() => {
                          setjobDrawerContent(job);
                          setjobDrawerOpen(true);
                        }}
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-10 h-10 rounded-md">
                              <AvatarImage src={job?.pic} />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1">
                              <p className="text-base font-medium ps-1">
                                {job?.jobName}
                              </p>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="secondary"
                                  className="!text-xs capitalize"
                                >
                                  {job?.jobType}
                                </Badge>
                                <span className="text-gray-400">•</span>
                                <Badge
                                  variant="secondary"
                                  className="!text-xs capitalize"
                                >
                                  {job?.serviceType}
                                </Badge>
                                <span className="text-gray-400">•</span>
                                <Badge variant="secondary" className="!text-xs">
                                  {job?.requiredExperience}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 text-sm">
                            <div className="flex items-center gap-1">
                              <MapPin width={18} className="text-gray-500" />
                              <span>{job?.city + ", " + job?.country}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign
                                width={18}
                                className="text-gray-500"
                              />
                              <span>{job?.salary} USD</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm line-clamp-2">
                          {job?.jobDescription}
                        </p>
                      </div>
                    ))}
                  </>
                )}
                <JobDrawer />
              </>
            )}
          </div>
        </div>
        <div className="w-full flex justify-center">
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            onPageChange={handlePaginatonChange}
            renderOnZeroPageCount={null}
            activeClassName="active"
            className="pagination"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
