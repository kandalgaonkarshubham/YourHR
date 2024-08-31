import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "../auth/AuthContext";
import { filterAccordingJobs } from "../hooks/useFilters";

import Header from "components/Header";
import Footer from "components/Footer";

import { MapPin, DollarSign, Filter } from "lucide-react";

import Locationbox from "shadcn/locationbox";
import { Checkbox } from "shadcn/checkbox";
import { Slider } from "shadcn/slider";
import { Avatar, AvatarFallback, AvatarImage } from "shadcn/avatar";
import { Badge } from "shadcn/badge";
import { Button } from "shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "shadcn/dialog";

import ReactPaginate from "react-paginate";

import { Country } from "country-state-city";

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
function Error({ reason, error }) {
  return (
    <section className="w-full flex items-center h-full">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto">
        <div className="text-center">
          <img src="img/empty.svg" className="h-[50vh]" />
          <p className="text-xl">
            {reason == 0 ? "We couldnt find any jobs for you" : error}
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Jobs() {
  const { user } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [searchedJob, setSearchedJob] = useState(false);
  const [currentJobs, setCurrentJobs] = useState([]);
  const [currentJobsCount, setCurrentJobsCount] = useState(0);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 6;
  const [pageCount, setPageCount] = useState(0);

  const [locationFilter, setLocationFilter] = useState(null);

  const [search, setSearch] = useState("");

  const [jobDialogOpen, setJobDialogOpen] = useState(false);
  const [jobDialogContent, setJobDialogContent] = useState({});

  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/jobs");
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.response.data.message);
      }
    };
    fetchJobs();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      const fetchedAccordiingly = filterAccordingJobs(user, jobs);
      setCurrentJobs(fetchedAccordiingly);
      setCurrentJobsCount(fetchedAccordiingly.length);
      setPageCount(0);
      setPageCount(Math.ceil(fetchedAccordiingly.length / itemsPerPage));
      setCurrentJobs(fetchedAccordiingly.slice(0, itemsPerPage));
    }, 2000);
  }, [jobs]);

  const handlePaginatonChange = ({ selected }) => {
    const startIndex = selected * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentJobs(jobs.slice(startIndex, endIndex));
  };

  const handleSearch = () => {
    setSearchedJob(true);
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

  const FilterDialog = () => {
    return (
      <Dialog open={filterOpen} onOpenChange={setFilterOpen} className="">
        <DialogContent className="bg-transparent border-none">
          <DialogHeader>
            <DialogDescription asChild>
              <div className="w-full h-max bg-white border border-gray-300 rounded-xl">
                <div className="flex items-center justify-between border-b border-gray-300 px-6 py-3 mb-2">
                  <p className="text-xl font-semibold">Filter</p>
                  <p className="text-sm text-red-500 font-medium">Clear all</p>
                </div>
                <div className="flex flex-col items-start px-6 py-3">
                  <p className="text-base font-semibold mb-2">Location</p>
                  <Locationbox
                    data={Country.getAllCountries()}
                    name="locationFilter"
                    setLocationFilter={setLocationFilter}
                    selected={locationFilter}
                  />
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
                    <div className="w-36 flex items-center space-x-2 mb-4">
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
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };
  const JobDialog = () => {
    return (
      <Dialog open={jobDialogOpen} onOpenChange={setJobDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl mb-4">
              {jobDialogContent.jobName}
            </DialogTitle>
            <DialogDescription asChild>
              <>
                <div className=" max-w-screen-md overflow-y-auto max-h-[70vh]">
                  <h3 className="text-lg font-semibold mb-2">
                    {jobDialogContent.companyName}
                  </h3>
                  <p>{jobDialogContent.companyDesc}</p>
                  <ul className="list-disc ml-6 mb-4">
                    <li>{jobDialogContent.jobDescription}</li>
                  </ul>
                  <h3 className="text-lg font-semibold mb-2">Location</h3>
                  <ul className="list-disc ml-6 mb-4">
                    <li>
                      {jobDialogContent.country}, {jobDialogContent.city}
                    </li>
                  </ul>
                  <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                  <ul className="list-disc ml-6 mb-4">
                    <li>{jobDialogContent.requiredExperience}</li>
                    <li className="capitalize">
                      {jobDialogContent.serviceType}
                    </li>
                    <li className="capitalize">{jobDialogContent.jobType}</li>
                  </ul>
                  <h3 className="text-lg font-semibold mb-2">Salary</h3>
                  <p>${jobDialogContent.salary} USD</p>
                  <h3 className="text-lg font-semibold mt-4 mb-2">
                    Required Skills
                  </h3>
                  <p>{jobDialogContent.requiredSkills}</p>
                  <p className="mt-4">
                    Posted on{" "}
                    {new Date(jobDialogContent.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
                <DialogFooter>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-400 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400  sm:w-auto sm:text-sm"
                  >
                    Apply
                  </button>
                </DialogFooter>
              </>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
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
          <div className="hidden sm:block w-[30vw] h-max border border-gray-300 rounded-xl">
            <div className="flex items-center justify-between border-b border-gray-300 px-6 py-3 mb-2">
              <p className="text-xl font-semibold">Filter</p>
              <p className="text-sm text-red-500 font-medium">Clear all</p>
            </div>
            <div className="flex flex-col items-start px-6 py-3">
              <p className="text-base font-semibold mb-2">Location</p>
              <Locationbox
                data={Country.getAllCountries()}
                name="locationFilter"
                setLocationFilter={setLocationFilter}
                selected={locationFilter}
              />
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
                <div className="w-36 flex items-center space-x-2 mb-4">
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
            </div>
          </div>
          <FilterDialog />
          <div className="w-full flex flex-col">
            <div className="flex items-center gap-2">
              <Button
                className="w-16 h-full bg-transparent hover:bg-transparent border border-gray-300 p-0 m-0 sm:hidden"
                onClick={() => setFilterOpen(true)}
              >
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
                {!currentJobs || currentJobs == 0 ? (
                  <Error error={error} reason={currentJobs} />
                ) : (
                  <>
                    <p className="font-semibold text-gray-500 mt-4">
                      {searchedJob ? (
                        <>{currentJobsCount} Job Results</>
                      ) : (
                        <>
                          We found {currentJobsCount} jobs According to your
                          Profile
                        </>
                      )}
                    </p>
                    {currentJobs.map((job) => (
                      <div
                        key={job?.id}
                        className="w-full flex flex-col gap-4 border border-gray-200 rounded-xl shadow hover:shadow-lg p-4 my-2 cursor-pointer transition-all"
                        onClick={() => {
                          setJobDialogContent(job);
                          setJobDialogOpen(true);
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
                <JobDialog />
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
