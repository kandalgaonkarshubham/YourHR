const prisma = require('../prisma/client');

const update = async (req, res) => {
  const { email, updatedInfo } = req.body;
  try {
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const updatedUser = await prisma.users.update({
      where: { email: email },
      data: updatedInfo,
    });

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = { update }
