import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "../auth/AuthContext";
import {
  filterAccordingJobs,
  compareJobWithUser,
  filterJobs,
} from "../hooks/useFilters";

import Header from "components/Header";
import Footer from "components/Footer";

import {
  MapPin,
  DollarSign,
  Filter,
  BadgeCheck,
  BadgeX,
  BadgeAlert,
} from "lucide-react";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 6;
  const [pageCount, setPageCount] = useState(0);

  const [filters, setFilters] = useState({
    location: null,
    experience: null,
    jobType: [],
    serviceType: [],
  });

  const [search, setSearch] = useState("");

  const [jobDialogOpen, setJobDialogOpen] = useState(false);
  const [jobDialogContent, setJobDialogContent] = useState({});

  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/jobs`
        );
        setJobs(response.data);
      } catch (error) {
        setError(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);
  useEffect(() => {
    if (user.desiredJobType || user.desiredWorkLocation) {
      setTimeout(() => {
        filterAccordingly();
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobs]);
  useEffect(() => {
    setLoading(true);
    setSearchedJob(true);
    const filteredJobs = filterJobs(filters, jobs);
    setCurrentJobsCount(filteredJobs.length);
    setPageCount(Math.ceil(filteredJobs.length / itemsPerPage));
    setCurrentJobs(filteredJobs.slice(0, itemsPerPage));
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  function filterAccordingly(clearFilter = false) {
    setLoading(true);
    if (clearFilter) {
      setFilters({
        location: null,
        experience: null,
        jobType: null,
        serviceType: null,
      });
    }
    setSearchedJob(false);
    const fetchedAccordingly = filterAccordingJobs(user, jobs);
    setCurrentJobsCount(fetchedAccordingly.length);
    setPageCount(Math.ceil(fetchedAccordingly.length / itemsPerPage));
    setCurrentJobs(fetchedAccordingly.slice(0, itemsPerPage));
    setLoading(false);
  }

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
          <DialogTitle className="opacity-0">Filters</DialogTitle>
          <DialogHeader>
            <DialogDescription asChild>
              <div className="w-full h-max bg-white border border-gray-300 rounded-xl">
                <div className="flex items-center justify-between border-b border-gray-300 px-6 py-3 mb-2">
                  <p className="text-xl font-semibold">Filter</p>
                  <p className="text-sm text-red-500 font-medium">
                    <button onClick={() => filterAccordingly(true)}>
                      Clear all
                    </button>
                  </p>
                </div>
                <div className="flex flex-col items-start px-6 py-3">
                  <p className="text-base font-semibold mb-2">Location</p>
                  <Locationbox
                    data={Country.getAllCountries()}
                    name="location"
                    setUpdatedInfo={setFilters}
                    selected={filters.location}
                  />
                  <hr className="w-full border-gray-200 mt-8" />
                </div>
                <div className="flex flex-col items-start px-6 py-3">
                  <p className="text-base font-semibold mb-4">
                    Experience {filters.experience}
                  </p>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    name="experience"
                    value={
                      filters.experience != null ? [filters.experience] : [0]
                    }
                    onValueChange={(v) => {
                      setFilters((prev) => ({ ...prev, experience: v[0] }));
                    }}
                  />
                  <hr className="w-full border-gray-200 mt-8" />
                </div>
                <div className="flex flex-col items-start px-6 py-3">
                  <p className="text-base font-semibold mb-4">Job Type</p>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="w-36 flex items-center space-x-2">
                      <Checkbox
                        id="permanent"
                        checked={
                          filters.jobType
                            ? filters.jobType.includes("permanent")
                            : false
                        }
                        onCheckedChange={(e) => {
                          let updatedJobType = [...filters.jobType];
                          if (e) {
                            updatedJobType.push("permanent");
                          } else {
                            updatedJobType = updatedJobType.filter(
                              (type) => type != "permanent"
                            );
                          }
                          setFilters((prev) => ({
                            ...prev,
                            jobType: updatedJobType,
                          }));
                        }}
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
                        checked={
                          filters.jobType
                            ? filters.jobType.includes("parttime")
                            : false
                        }
                        onCheckedChange={(e) => {
                          let updatedJobType = [...filters.jobType];
                          if (e) {
                            updatedJobType.push("parttime");
                          } else {
                            updatedJobType = updatedJobType.filter(
                              (type) => type != "parttime"
                            );
                          }
                          setFilters((prev) => ({
                            ...prev,
                            jobType: updatedJobType,
                          }));
                        }}
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
                        checked={
                          filters.jobType
                            ? filters.jobType.includes("internship")
                            : false
                        }
                        onCheckedChange={(e) => {
                          let updatedJobType = [...filters.jobType];
                          if (e) {
                            updatedJobType.push("internship");
                          } else {
                            updatedJobType = updatedJobType.filter(
                              (type) => type != "internship"
                            );
                          }
                          setFilters((prev) => ({
                            ...prev,
                            jobType: updatedJobType,
                          }));
                        }}
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
                        checked={
                          filters.jobType
                            ? filters.jobType.includes("freelance")
                            : false
                        }
                        onCheckedChange={(e) => {
                          let updatedJobType = [...filters.jobType];
                          if (e) {
                            updatedJobType.push("freelance");
                          } else {
                            updatedJobType = updatedJobType.filter(
                              (type) => type != "freelance"
                            );
                          }
                          setFilters((prev) => ({
                            ...prev,
                            jobType: updatedJobType,
                          }));
                        }}
                        className="rounded border-gray-300 data-[state=checked]:text-teal-500 data-[state=checked]:border-teal-500 data-[state=checked]:bg-teal-50"
                      />
                      <label
                        htmlFor="freelance"
                        className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Freelance
                      </label>
                    </div>
                    <div className="w-36 flex items-center space-x-2">
                      <Checkbox
                        id="contract"
                        checked={
                          filters.jobType
                            ? filters.jobType.includes("contract")
                            : false
                        }
                        onCheckedChange={(e) => {
                          let updatedJobType = [...filters.jobType];
                          if (e) {
                            updatedJobType.push("contract");
                          } else {
                            updatedJobType = updatedJobType.filter(
                              (type) => type != "contract"
                            );
                          }
                          setFilters((prev) => ({
                            ...prev,
                            jobType: updatedJobType,
                          }));
                        }}
                        className="rounded border-gray-300 data-[state=checked]:text-teal-500 data-[state=checked]:border-teal-500 data-[state=checked]:bg-teal-50"
                      />
                      <label
                        htmlFor="contract"
                        className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Contract
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
                        checked={
                          filters.serviceType
                            ? filters.serviceType.includes("onsite")
                            : false
                        }
                        onCheckedChange={(e) => {
                          let updatedServiceType = [...filters.serviceType];
                          if (e) {
                            updatedServiceType.push("onsite");
                          } else {
                            updatedServiceType = updatedServiceType.filter(
                              (type) => type != "onsite"
                            );
                          }
                          setFilters((prev) => ({
                            ...prev,
                            serviceType: updatedServiceType,
                          }));
                        }}
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
                        checked={
                          filters.serviceType
                            ? filters.serviceType.includes("remote")
                            : false
                        }
                        onCheckedChange={(e) => {
                          let updatedServiceType = [...filters.serviceType];
                          if (e) {
                            updatedServiceType.push("remote");
                          } else {
                            updatedServiceType = updatedServiceType.filter(
                              (type) => type != "remote"
                            );
                          }
                          setFilters((prev) => ({
                            ...prev,
                            serviceType: updatedServiceType,
                          }));
                        }}
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
                        checked={
                          filters.serviceType
                            ? filters.serviceType.includes("hybrid")
                            : false
                        }
                        onCheckedChange={(e) => {
                          let updatedServiceType = [...filters.serviceType];
                          if (e) {
                            updatedServiceType.push("hybrid");
                          } else {
                            updatedServiceType = updatedServiceType.filter(
                              (type) => type != "hybrid"
                            );
                          }
                          setFilters((prev) => ({
                            ...prev,
                            serviceType: updatedServiceType,
                          }));
                        }}
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
    const matchingFields = compareJobWithUser(jobDialogContent, user);
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
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    Location{" "}
                    {matchingFields[0] ? (
                      <span
                        className="text-green-400"
                        aria-label="This Job is in your Country"
                        title="This Job is in your Country"
                      >
                        <BadgeCheck width={18} />
                      </span>
                    ) : (
                      <span
                        className="text-red-400"
                        aria-label="This Job is out of your Country"
                        title="This Job is out of your Country"
                      >
                        <BadgeX width={18} />
                      </span>
                    )}
                  </h3>
                  <ul className="list-disc ml-6 mb-4">
                    <li>
                      {jobDialogContent.country}, {jobDialogContent.city}
                    </li>
                  </ul>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    Requirements{" "}
                    {matchingFields[1] ? (
                      <>
                        {matchingFields[1] == "inequal" ? (
                          <span
                            className="text-amber-400"
                            aria-label="Some requirements don't match your Profile"
                            title="Some requirements don't match your Profile"
                          >
                            <BadgeAlert width={18} />
                          </span>
                        ) : (
                          <span
                            className="text-green-400"
                            aria-label="Requirements match your Profile"
                            title="Requirements match your Profile"
                          >
                            <BadgeCheck width={18} />
                          </span>
                        )}
                      </>
                    ) : (
                      <span
                        className="text-red-400"
                        aria-label="Requirements don't match your Profile"
                        title="Requirements don't match your Profile"
                      >
                        <BadgeX width={18} />
                      </span>
                    )}
                  </h3>
                  <ul className="list-disc ml-6 mb-4">
                    <li>{jobDialogContent.requiredExperience}</li>
                    <li className="capitalize">
                      {jobDialogContent.serviceType}
                    </li>
                    <li className="capitalize">{jobDialogContent.jobType}</li>
                  </ul>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    Salary{" "}
                    {matchingFields[2] ? (
                      <span
                        className="text-green-400"
                        aria-label="Your Desired Salary"
                        title="Your Desired Salary"
                      >
                        <BadgeCheck width={18} />
                      </span>
                    ) : (
                      <span
                        className="text-red-400"
                        aria-label="This Job's Salary doesnt match your Expectations"
                        title="This Job's Salary doesnt match your Expectations"
                      >
                        <BadgeX width={18} />
                      </span>
                    )}
                  </h3>
                  <p>${jobDialogContent.salary} USD</p>
                  <h3 className="text-lg font-semibold mt-4 mb-2 flex items-center gap-2">
                    Required Skills{" "}
                    {matchingFields[3] ? (
                      <span
                        className="text-green-400"
                        aria-label="Your Skills are required for this Job"
                        title="Your Skills are required for this Job"
                      >
                        <BadgeCheck width={18} />
                      </span>
                    ) : (
                      <span
                        className="text-red-400"
                        aria-label="You lack the skillset for this Job"
                        title="You lack the skillset for this Job"
                      >
                        <BadgeX width={18} />
                      </span>
                    )}
                  </h3>
                  <p>{jobDialogContent.requiredSkills}</p>
                  <p className="text-gray-500 text-xs text-end uppercase mt-4 mb-4">
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
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-400 text-base font-medium text-white sm:w-auto sm:text-sm"
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
              <p className="text-sm text-red-500 font-medium">
                <button onClick={() => filterAccordingly(true)}>
                  Clear all
                </button>
              </p>
            </div>
            <div className="flex flex-col items-start px-6 py-3">
              <p className="text-base font-semibold mb-2">Location</p>
              <Locationbox
                data={Country.getAllCountries()}
                name="location"
                setUpdatedInfo={setFilters}
                selected={filters.location}
              />
              <hr className="w-full border-gray-200 mt-8" />
            </div>
            <div className="flex flex-col items-start px-6 py-3">
              <p className="text-base font-semibold mb-4">
                Experience {filters.experience}
              </p>
              <Slider
                min={0}
                max={10}
                step={1}
                name="experience"
                value={filters.experience != null ? [filters.experience] : [0]}
                onValueChange={(v) => {
                  setFilters((prev) => ({ ...prev, experience: v[0] }));
                }}
              />
              <hr className="w-full border-gray-200 mt-8" />
            </div>
            <div className="flex flex-col items-start px-6 py-3">
              <p className="text-base font-semibold mb-4">Job Type</p>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="w-36 flex items-center space-x-2">
                  <Checkbox
                    id="permanent"
                    checked={
                      filters.jobType
                        ? filters.jobType.includes("permanent")
                        : false
                    }
                    onCheckedChange={(e) => {
                      let updatedJobType = [...filters.jobType];
                      if (e) {
                        updatedJobType.push("permanent");
                      } else {
                        updatedJobType = updatedJobType.filter(
                          (type) => type != "permanent"
                        );
                      }
                      setFilters((prev) => ({
                        ...prev,
                        jobType: updatedJobType,
                      }));
                    }}
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
                    checked={
                      filters.jobType
                        ? filters.jobType.includes("parttime")
                        : false
                    }
                    onCheckedChange={(e) => {
                      let updatedJobType = [...filters.jobType];
                      if (e) {
                        updatedJobType.push("parttime");
                      } else {
                        updatedJobType = updatedJobType.filter(
                          (type) => type != "parttime"
                        );
                      }
                      setFilters((prev) => ({
                        ...prev,
                        jobType: updatedJobType,
                      }));
                    }}
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
                    checked={
                      filters.jobType
                        ? filters.jobType.includes("internship")
                        : false
                    }
                    onCheckedChange={(e) => {
                      let updatedJobType = [...filters.jobType];
                      if (e) {
                        updatedJobType.push("internship");
                      } else {
                        updatedJobType = updatedJobType.filter(
                          (type) => type != "internship"
                        );
                      }
                      setFilters((prev) => ({
                        ...prev,
                        jobType: updatedJobType,
                      }));
                    }}
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
                    checked={
                      filters.jobType
                        ? filters.jobType.includes("freelance")
                        : false
                    }
                    onCheckedChange={(e) => {
                      let updatedJobType = [...filters.jobType];
                      if (e) {
                        updatedJobType.push("freelance");
                      } else {
                        updatedJobType = updatedJobType.filter(
                          (type) => type != "freelance"
                        );
                      }
                      setFilters((prev) => ({
                        ...prev,
                        jobType: updatedJobType,
                      }));
                    }}
                    className="rounded border-gray-300 data-[state=checked]:text-teal-500 data-[state=checked]:border-teal-500 data-[state=checked]:bg-teal-50"
                  />
                  <label
                    htmlFor="freelance"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Freelance
                  </label>
                </div>
                <div className="w-36 flex items-center space-x-2">
                  <Checkbox
                    id="contract"
                    checked={
                      filters.jobType
                        ? filters.jobType.includes("contract")
                        : false
                    }
                    onCheckedChange={(e) => {
                      let updatedJobType = [...filters.jobType];
                      if (e) {
                        updatedJobType.push("contract");
                      } else {
                        updatedJobType = updatedJobType.filter(
                          (type) => type != "contract"
                        );
                      }
                      setFilters((prev) => ({
                        ...prev,
                        jobType: updatedJobType,
                      }));
                    }}
                    className="rounded border-gray-300 data-[state=checked]:text-teal-500 data-[state=checked]:border-teal-500 data-[state=checked]:bg-teal-50"
                  />
                  <label
                    htmlFor="contract"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Contract
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
                    checked={
                      filters.serviceType
                        ? filters.serviceType.includes("onsite")
                        : false
                    }
                    onCheckedChange={(e) => {
                      let updatedServiceType = [...filters.serviceType];
                      if (e) {
                        updatedServiceType.push("onsite");
                      } else {
                        updatedServiceType = updatedServiceType.filter(
                          (type) => type != "onsite"
                        );
                      }
                      setFilters((prev) => ({
                        ...prev,
                        serviceType: updatedServiceType,
                      }));
                    }}
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
                    checked={
                      filters.serviceType
                        ? filters.serviceType.includes("remote")
                        : false
                    }
                    onCheckedChange={(e) => {
                      let updatedServiceType = [...filters.serviceType];
                      if (e) {
                        updatedServiceType.push("remote");
                      } else {
                        updatedServiceType = updatedServiceType.filter(
                          (type) => type != "remote"
                        );
                      }
                      setFilters((prev) => ({
                        ...prev,
                        serviceType: updatedServiceType,
                      }));
                    }}
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
                    checked={
                      filters.serviceType
                        ? filters.serviceType.includes("hybrid")
                        : false
                    }
                    onCheckedChange={(e) => {
                      let updatedServiceType = [...filters.serviceType];
                      if (e) {
                        updatedServiceType.push("hybrid");
                      } else {
                        updatedServiceType = updatedServiceType.filter(
                          (type) => type != "hybrid"
                        );
                      }
                      setFilters((prev) => ({
                        ...prev,
                        serviceType: updatedServiceType,
                      }));
                    }}
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
          {filterOpen && <FilterDialog />}
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
                              <AvatarFallback>
                                {job?.jobName
                                  .split(" ")
                                  .map((word) => word.charAt(0).toUpperCase())
                                  .join("")}
                              </AvatarFallback>
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
                {jobDialogOpen && <JobDialog />}
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
