const prisma = require('../prisma/client');

const fetchJobs = async (req, res) => {
  try {
    const jobs = await prisma.jobs.findMany({
      include: {
        departmentId: false,
        department: {
          select: {
            name: true
          }
        },
      },
    });
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: true, message: 'An error occurred while fetching jobs.' });
  }
};
const fetchSkills = async (req, res) => {
  try {
    const jobs = await prisma.skills.findMany();
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: true, message: 'An error occurred while fetching jobs.' });
  }
};
const fetchDepartments = async (req, res) => {
  try {
    const jobs = await prisma.jobs.findMany();
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: true, message: 'An error occurred while fetching jobs.' });
  }
};

module.exports = { fetchJobs, fetchSkills, fetchDepartments }
