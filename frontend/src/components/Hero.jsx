import {
  FigmaLogoIcon,
  FramerLogoIcon,
  SketchLogoIcon,
  TwitterLogoIcon,
  GitHubLogoIcon,
  VercelLogoIcon,
  NotionLogoIcon,
  DiscordLogoIcon,
  LinkedInLogoIcon,
  DimensionsIcon,
  PersonIcon,
  GearIcon,
  LayersIcon,
  CodeIcon,
  OpenInNewWindowIcon,
  CameraIcon,
  ActivityLogIcon,
} from "@radix-ui/react-icons";

const LOGOS = [
  {
    icon: <FigmaLogoIcon width={44} height={44} />,
    name: "Figma",
  },
  {
    icon: <FramerLogoIcon width={44} height={44} />,
    name: "Framer",
  },
  {
    icon: <SketchLogoIcon width={44} height={44} />,
    name: "Sketch",
  },
  {
    icon: <TwitterLogoIcon width={44} height={44} />,
    name: "Twitter",
  },
  {
    icon: <GitHubLogoIcon width={44} height={44} />,
    name: "Github",
  },
  {
    icon: <VercelLogoIcon width={44} height={44} />,
    name: "Vercel",
  },
  {
    icon: <NotionLogoIcon width={44} height={44} />,
    name: "Notion",
  },
  {
    icon: <DiscordLogoIcon width={44} height={44} />,
    name: "Discord",
  },
  {
    icon: <LinkedInLogoIcon width={44} height={44} />,
    name: "LinkedIn",
  },
];

export default function Hero() {
  return (
    <>
      <div className="relative mx-auto px-4 pt-16 sm:max-w-xl md:max-w-full md:px-8 lg:py-32 xl:px-20">
        <div className="mx-auto max-w-xl lg:max-w-screen-xl">
          <div className="mb-16 text-center lg:mb-0 lg:max-w-lg lg:text-left">
            <div className="mb-6 max-w-xl">
              <div>
                <p className="bg-teal-accent-400 mb-4 inline-block rounded-full bg-teal-200 px-3 py-px text-sm font-semibold tracking-wider text-teal-900">
                  We know the Way to Success
                </p>
              </div>
              <h2 className="mb-6 max-w-lg text-3xl font-bold tracking-tight text-slate-700 sm:text-5xl sm:leading-snug">
                A regular job seeker website but better in
                <br />
                <span className="inline-block text-teal-500 capitalize">
                  every aspect
                </span>
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
                Good Life begins with a Good Company. Start exploring thousands
                of jobs in one place and find your dream job.
              </p>
            </div>
            <div className="relative border-2 rounded-md">
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
          <div className="hidden h-full justify-center overflow-hidden lg:absolute lg:bottom-0 lg:right-0 lg:flex lg:w-1/2 lg:items-end lg:justify-start">
            <svg
              className="h-full w-full"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="img1" x="0" y="0" width="1" height="1">
                  <image
                    x="-22"
                    y="-30"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMaxYMax slice"
                    href="img/hero.svg"
                  />
                </pattern>
              </defs>

              <path
                fill="url(#img1)"
                d="M40,-62.6C52.2,-54.5,62.5,-43.9,66.9,-31.4C71.3,-18.9,69.6,-4.6,65.9,8.3C62.2,21.1,56.4,32.5,49.2,45.2C42.1,57.9,33.7,72.1,22.2,75.3C10.7,78.5,-3.9,70.7,-14.8,62.1C-25.7,53.5,-32.8,44.1,-44.9,35.8C-57,27.5,-74,20.3,-82.1,7.7C-90.3,-4.8,-89.5,-22.7,-80.8,-34.8C-72,-46.9,-55.2,-53.3,-40.4,-60.2C-25.6,-67,-12.8,-74.3,0.6,-75.2C13.9,-76.1,27.9,-70.6,40,-62.6Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-44 lg:px-8 lg:py-20">
        <div className="grid row-gap-8 sm:grid-cols-3">
          <div className="text-center">
            <h6 className="text-5xl font-bold text-teal-500">144K+</h6>
            <p className="font-bold">Registered Users</p>
          </div>
          <div className="text-center">
            <h6 className="text-5xl font-bold text-teal-500">7.9B+</h6>
            <p className="font-bold">Jobs Posted</p>
          </div>
          <div className="text-center">
            <h6 className="text-5xl font-bold text-teal-500">27.3K</h6>
            <p className="font-bold">Avaiable Jobs</p>
          </div>
        </div>
      </div>

      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-44 lg:px-8 my-16">
        <h4 className="text-center text-3xl font-bold">
          We are <span className="text-teal-500">supported</span>
        </h4>
        <p className="text-center text-sm text-slate-600 mt-4">
          Millions of users secured
        </p>
        <div className="relative w-full overflow-hidden bg-white before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] after:content-[''] mt-10">
          <div className="animate-infinite-slider flex w-[calc(250px*10)] gap-20 text-slate-400">
            {LOGOS.map((logo, index) => (
              <div
                className="slide flex w-[125px] items-center justify-center gap-2"
                key={index}
              >
                {logo.icon}
                <span className="text-2xl">{logo.name}</span>
              </div>
            ))}
            {LOGOS.map((logo, index) => (
              <div
                className="slide flex w-[125px] items-center justify-center gap-1"
                key={index}
              >
                {logo.icon}
                <span className="text-2xl">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-teal-50 mt-32 mb-10">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <p className="text-3xl text-black font-semibold mb-20">
            Most demanding Categories.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col justify-between overflow-hidden duration-200 bg-white rounded-md">
              <div className="p-5">
                <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-teal-100">
                  <DimensionsIcon className="w-6 h-6 stroke-teal-800" />
                </div>
                <p className="mb-2 font-bold">Design & Development</p>
                <p className="text-sm leading-5 text-gray-900">
                  1275 vacancies
                </p>
              </div>
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            </div>
            <div className="flex flex-col justify-between overflow-hidden duration-200 bg-white rounded-md">
              <div className="p-5">
                <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-teal-100">
                  <ActivityLogIcon className="w-6 h-6 stroke-teal-800" />
                </div>
                <p className="mb-2 font-bold">Business & Marketing</p>
                <p className="text-sm leading-5 text-gray-900">
                  8460 vacancies
                </p>
              </div>
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            </div>
            <div className="flex flex-col justify-between overflow-hidden duration-200 bg-white rounded-md">
              <div className="p-5">
                <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-teal-100">
                  <PersonIcon className="w-6 h-6 stroke-teal-800" />
                </div>
                <p className="mb-2 font-bold">Customer Marketing & Sales</p>
                <p className="text-sm leading-5 text-gray-900">979 vacancies</p>
              </div>
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            </div>
            <div className="flex flex-col justify-between overflow-hidden duration-200 bg-white rounded-md">
              <div className="p-5">
                <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-teal-100">
                  <GearIcon className="w-6 h-6 stroke-teal-800" />
                </div>
                <p className="mb-2 font-bold">Game Design & Development</p>
                <p className="text-sm leading-5 text-gray-900">772 vacancies</p>
              </div>
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            </div>
            <div className="flex flex-col justify-between overflow-hidden duration-200 bg-white rounded-md">
              <div className="p-5">
                <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-teal-100">
                  <CodeIcon className="w-6 h-6 stroke-teal-800" />
                </div>
                <p className="mb-2 font-bold">FrontEnd Web Development</p>
                <p className="text-sm leading-5 text-gray-900">
                  4532 vacancies
                </p>
              </div>
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            </div>
            <div className="flex flex-col justify-between overflow-hidden duration-200 bg-white rounded-md">
              <div className="p-5">
                <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-teal-100">
                  <LayersIcon className="w-6 h-6 stroke-teal-800" />
                </div>
                <p className="mb-2 font-bold">Graphics Designing</p>
                <p className="text-sm leading-5 text-gray-900">
                  2346 vacancies
                </p>
              </div>
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            </div>
            <div className="flex flex-col justify-between overflow-hidden duration-200 bg-white rounded-md">
              <div className="p-5">
                <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-teal-100">
                  <CameraIcon className="w-6 h-6 stroke-teal-800" />
                </div>
                <p className="mb-2 font-bold">Commercial Photography</p>
                <p className="text-sm leading-5 text-gray-900">
                  7819 vacancies
                </p>
              </div>
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            </div>
            <div className="flex flex-col justify-between overflow-hidden duration-200 bg-teal-600 font-[Syne] rounded-md">
              <div className="p-5">
                <p className="font-bold text-5xl text-white">3.7K+</p>
                <p className="text-sm leading-5 text-white mb-6">
                  Categories to work with
                </p>
                <div className="flex items-center justify-center w-full h-10 mb-4 rounded-full bg-teal-100">
                  <OpenInNewWindowIcon className="w-6 h-6 stroke-teal-800" />
                </div>
              </div>
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
