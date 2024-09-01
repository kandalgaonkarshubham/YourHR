export const checkSalary = (required, user) => {
  const [start, end] = required.split('-').map(Number);
  const desiredSalary = +user;
  return desiredSalary >= start && desiredSalary <= end;
};

export const filterAccordingJobs = (profile, jobs) => {
  const {
    // department,
    // country,
    desiredJobType,
    desiredWorkLocation,
    // desiredSalary
  } = profile;

  return jobs.filter(job => {
    const {
      jobType,
      serviceType,
      // country: jobCountry,
      // department: jobDepartment,
      // salary
    } = job;

    // const departmentMatch = department ? jobDepartment.name.toLowerCase() == department.toLowerCase() : true;
    // const countryMatch = country ? jobCountry == country.toLowerCase() : true;
    const jobTypeMatch = desiredJobType ? jobType == desiredJobType.toLowerCase() : true;
    const workLocationMatch = desiredWorkLocation ? serviceType == desiredWorkLocation.toLowerCase() : true;
    // const salaryMatch = desiredSalary ? checkSalary(desiredSalary, salary) : true;

    return jobTypeMatch &&
      workLocationMatch
    // salaryMatch &&
    // countryMatch &&
    // departmentMatch
  });
};

export const filterJobs = (filter, jobs) => {
  const {
    location: country,
    experience,
    jobType: desiredJobType,
    serviceType: desiredWorkLocation,
  } = filter;
  return jobs.filter(job => {
    const {
      country: jobCountry,
      requiredExperience,
      jobType,
      serviceType,
    } = job;

    const countryMatch = country ? jobCountry.toLowerCase().includes(country.toLowerCase()) : true;
    const experienceMatch = experience != null ? experience == parseInt(requiredExperience.split(' ')[0]) : true;
    const jobTypeMatch = desiredJobType && desiredJobType.length != 0 ? desiredJobType.includes(jobType) : true;
    const workLocationMatch = desiredWorkLocation && desiredWorkLocation.length != 0 ? desiredWorkLocation.includes(serviceType) : true;

    return jobTypeMatch &&
      workLocationMatch &&
      countryMatch &&
      experienceMatch
  });
};

export const compareJobWithUser = (jobDialogContent, user) => {
  const parseExperience = (job) => {
    const userExp = user.experience.toLowerCase();
    const jobExp = +job.split(' ')[0];
    if (userExp == "fresher" && jobExp == 0) {
      return true
    } else if (userExp != "fresher" && jobExp > 0) {
      return true
    }
    return false;
  };


  const countryMatch = user.country ? jobDialogContent.country.toLowerCase().includes(user.country.toLowerCase()) : false;

  const experienceMatch = user.experience ? parseExperience(jobDialogContent.requiredExperience) : false;
  const jobTypeMatch = user.desiredJobType ? jobDialogContent.jobType == user.desiredJobType.toLowerCase() : false;
  const workLocationMatch = user.desiredWorkLocation ? jobDialogContent.serviceType == user.desiredWorkLocation.toLowerCase() : false;

  const [minSalary, maxSalary] = jobDialogContent.salary.split("-").map(Number);
  const salaryMatch = user.desiredSalary ? +user.desiredSalary >= minSalary && user.desiredSalary <= maxSalary : false;

  const jobSkills = jobDialogContent.requiredSkills
    .split(",")
    .map((skill) => skill.trim().toLowerCase());
  const userSkills = user.skills ? user.skills
    .split(",")
    .map((skill) => skill.trim().toLowerCase()) : false;
  const skillsMatch = user.skills ? userSkills.every((skill) => jobSkills.includes(skill)) : false;

  const requirementsMatch =
    experienceMatch && jobTypeMatch && workLocationMatch
      ? true
      : experienceMatch || jobTypeMatch || workLocationMatch
        ? "inequal"
        : false;

  return [countryMatch, requirementsMatch, salaryMatch, skillsMatch];
}
