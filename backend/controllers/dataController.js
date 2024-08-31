const prisma = require('../prisma/client');

const fetchJobs = async (req, res) => {
  try {
    const jobs = await prisma.jobs.findMany({
      include: {
        departmentId: false,
        department: true,
        updatedAt: false,
      }
    });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
const fetchSkills = async (req, res) => {
  try {
    const skills = await prisma.skills.findMany({
      select: {
        name: true
      }
    });
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ error: true, message: 'An error occurred while fetching Skills.' });
  }
};
const fetchDepts = async (req, res) => {
  try {
    const depts = await prisma.departments.findMany({
      select: {
        name: true
      }
    });
    res.status(200).json(depts);
  } catch (error) {
    res.status(500).json({ error: true, message: 'An error occurred while fetching Departments.' });
  }
};

module.exports = { fetchJobs, fetchSkills, fetchDepts };
