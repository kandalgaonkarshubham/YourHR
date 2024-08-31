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
