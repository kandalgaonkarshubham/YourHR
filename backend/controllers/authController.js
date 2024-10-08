const bcrypt = require('bcryptjs');
const prisma = require('../prisma/client');


const register = async (req, res) => {
  const { fullname, email, password, number, experience } = req.body;
  if (!fullname || !email || !password, !number, !experience) return res.status(400).json({ message: 'Incomplete Request' });

  try {
    let user = await prisma.users.findUnique({ where: { email } });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await prisma.users.create({
      data: {
        fullname,
        email,
        number,
        experience,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
}

const login = async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const { id, password, createdAt, updatedAt, ...restUser } = user;

    res.json({ ...restUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports = { register, login }
