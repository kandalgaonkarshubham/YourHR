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

export default function Jobs() {
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
      <div className="w-full flex gap-4 p-10">
        <div className="w-[30vw] border border-gray-300 rounded-xl">
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
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-teal-700 font-medium rounded-lg text-sm px-4 py-2 pt-1.5"
              >
                Find Jobs
              </button>
            </div>
          </div>

          <p className="font-semibold text-gray-500 mt-4">250 Jobs Results</p>
          <div className="w-full flex flex-col gap-4 border border-gray-200 rounded-xl shadow hover:shadow-lg p-4 my-2 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="w-14 h-14 rounded-md">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <p className="text-lg ps-1">Product Designer</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Permanent</Badge>
                    <span className="text-gray-400">•</span>
                    <Badge variant="secondary">Remote</Badge>
                    <span className="text-gray-400">•</span>
                    <Badge variant="secondary">1-2 Years</Badge>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <MapPin width={18} className="text-gray-500" />
                  <span>Marina East, Singapore</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign width={18} className="text-gray-500" />
                  <span>6000 - 8000 USD</span>
                </div>
              </div>
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              ipsam exercitationem iste asperiores facere dicta adipisci
              explicabo, quae tempore dolorum pariatur perspiciatis recusandae
              esse quisquam, atque voluptate deserunt expedita et? Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Saepe atque quam
              maiores a molestias vitae dicta, sapiente labore amet eligendi.
              Necessitatibus voluptatum culpa error excepturi placeat, delectus
              veritatis dignissimos minus?
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
