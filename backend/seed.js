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
  "Product Marketing Manager",
  "HR Specialist",
  "Legal Counsel",
  "IT Project Manager",
  "Web Developer",
  "Software Tester",
  "User Experience Designer",
  "Marketing Coordinator",
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
        requiredExperience: `${faker.helpers.rangeToNumber({ min: 0, max: 10 })} Years`,
        serviceType: faker.helpers.arrayElement(['remote', 'onsite', 'hybrid']),
        jobType: faker.helpers.arrayElement(['permanent', 'parttime', 'freelance', 'contract']),
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
