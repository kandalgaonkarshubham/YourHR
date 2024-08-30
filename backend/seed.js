const prisma = require('./prisma/client');
const { faker } = require('@faker-js/faker');

const skills = [
  "JavaScript", "Python", "React", "Node.js", "TypeScript", "SQL", "MongoDB", "CSS",
  "HTML", "Git", "Docker", "Kubernetes", "GraphQL", "REST API", "AWS", "Azure", "Java",
  "C#", "PHP", "Ruby", "Public Speaking", "Project Management", "Data Analysis", "Graphic Design",
  "Social Media Marketing", "Content Writing", "SEO Optimization", "Financial Analysis", "Customer Service",
  "Video Editing", "Sales Strategy", "Supply Chain Management", "Leadership", "Negotiation", "Research",
  "Event Planning", "Programming", "Machine Learning", "UI / UX Design", "Marketing Strategy"
];
const jobTitles = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "Graphic Designer",
  "Marketing Specialist",
  "Sales Representative",
  "Project Manager",
  "Content Writer",
  "UX/UI Designer",
  "DevOps Engineer",
  "Systems Analyst",
  "Web Developer",
  "Business Analyst",
  "SEO Specialist",
  "Network Engineer",
  "Database Administrator",
  "HR Manager",
  "Customer Support Specialist",
  "Data Analyst",
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Cloud Engineer",
  "Game Developer",
  "Mobile Developer",
  "Technical Writer",
  "Digital Marketer",
  "Social Media Manager",
  "Event Coordinator",
  "Financial Analyst",
  "Operations Manager",
  "Research Scientist",
  "AI Engineer",
  "Cybersecurity Analyst",
  "E-commerce Manager",
  "Content Strategist",
  "Sales Manager",
  "Software Architect",
  "Web Designer",
  "Customer Success Manager",
  "Technical Support Specialist",
  "Business Development Manager",
  "Systems Administrator",
  "Data Engineer",
  "Blockchain Developer",
  "IT Consultant",
  "Product Designer",
  "Marketing Manager",
  "Project Coordinator",
  "Administrative Assistant",
  "Legal Advisor",
  "Public Relations Specialist",
  "Creative Director",
  "Chief Technology Officer",
  "Chief Financial Officer",
  "Chief Executive Officer",
  "Chief Marketing Officer",
  "Chief Operating Officer",
  "Chief Information Officer",
  "Chief Product Officer",
  "Operations Analyst",
  "Media Buyer",
  "Web Analytics Specialist",
  "Recruitment Consultant",
  "Digital Designer",
  "Video Production Specialist",
  "Community Manager",
  "User Researcher",
  "Brand Strategist",
  "Logistics Coordinator",
  "Training Specialist",
  "Technical Account Manager",
  "Insurance Agent",
  "Accountant",
  "Product Owner",
  "Sales Engineer",
  "Compliance Officer",
  "Environmental Scientist",
  "Health and Safety Officer",
  "Real Estate Agent",
  "Travel Consultant",
  "Executive Assistant",
  "Maintenance Technician",
  "Facilities Manager",
  "Quality Assurance Analyst",
  "Process Improvement Specialist",
  "Customer Experience Manager",
  "Talent Acquisition Specialist",
  "Research Analyst",
  "Innovation Manager",
  "Training and Development Manager",
  "Strategic Planner",
  "Public Health Advisor",
  "Financial Planner",
  "Technical Project Manager",
  "Business Systems Analyst",
  "Retail Manager",
  "Legal Counsel",
  "IT Project Manager",
  "Web Developer",
  "Software Tester",
  "User Experience Designer",
  "Marketing Coordinator",
  "Data Privacy Officer",
  "Ethical Hacker",
  "Sales Director",
  "Product Marketing Manager",
  "HR Specialist",
  "Supply Chain Analyst",
  "Corporate Communications Manager",
  "Manufacturing Engineer",
  "Product Development Engineer",
  "Tax Advisor",
  "Healthcare Administrator",
  "Educational Consultant",
  "Strategy Consultant",
  "Process Analyst",
  "Logistics Manager",
  "Project Scheduler",
  "Product Analyst",
  "Supply Chain Coordinator",
];

function randomSalary() {
  const min = [1000, 2000, 5000, 10000, 20000];
  const rangeMultiplier = [2, 3, 4, 5, 6];

  const minSalary = faker.helpers.arrayElement(min);
  const maxSalaryMultiplier = faker.helpers.arrayElement(rangeMultiplier);
  const maxSalary = minSalary * maxSalaryMultiplier;

  return `${minSalary}-${maxSalary}`;
}




async function main() {
  for (let i = 0; i < 100; i++) {
    await prisma.jobs.create({
      data: {
        pic: faker.image.urlLoremFlickr({ category: 'business' }),
        jobName: faker.helpers.arrayElement(jobTitles),
        jobDescription: faker.lorem.paragraphs(5),
        companyName: faker.company.name(),
        companyDesc: faker.company.catchPhrase(),
        country: faker.location.country(),
        city: faker.location.city(),
        departmentId: faker.helpers.rangeToNumber({ min: 1, max: 10 }),
        requiredSkills: faker.helpers.arrayElements(skills, { min: 3, max: 7 }).join(', '),
        requiredExperience: `${faker.helpers.rangeToNumber({ min: 1, max: 10 })} Years`,
        serviceType: faker.helpers.arrayElement(['remote', 'onsite', 'hybrid']),
        jobType: faker.helpers.arrayElement(['permanent', 'parttime', 'internship', 'contract', 'freelance']),
        salary: randomSalary(),
      }
    });
  }
  console.log('Seed data inserted!');
}



main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
