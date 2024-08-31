const multer = require('multer');
const path = require('path');
const fs = require('fs');
const prisma = require('../prisma/client');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const emailDir = path.join(__dirname, '../public/users', req.body.email); // Directory path based on email

    if (!fs.existsSync(emailDir)) {
      fs.mkdirSync(emailDir, { recursive: true });
    }
    cb(null, emailDir);
  },
  filename: (req, file, cb) => {
    let newFileName;

    if (file.fieldname === 'pic') {
      newFileName = 'profile' + path.extname(file.originalname);
    } else if (file.fieldname === 'resume') {
      newFileName = 'CV' + path.extname(file.originalname);
    } else {
      newFileName = file.originalname;
    }

    // cb(null, newFileName);
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });


const updateDatabase = async (fileUrls, email, res) => {
  try {
    const userData = {};
    if (fileUrls.pic) userData.pic = fileUrls.pic;
    if (fileUrls.resume) userData.resume = fileUrls.resume;

    const user = await prisma.users.update({
      where: { email: email },
      data: userData,
    });
    const { id, password, createdAt, updatedAt, ...restUser } = user;
    res.send({ ...restUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Error updating user information' });
  }
}


const uploadFile = (req, res) => {
  upload.fields([
    { name: 'pic', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
  ])(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    const fileUrls = {};
    if (req.files.pic) {
      const picUrl = `http://localhost:5000/public/users/${req.body.email}/${req.files.pic[0].filename}`;
      fileUrls.pic = picUrl;
    }
    if (req.files.resume) {
      const resumeUrl = `http://localhost:5000/public/users/${req.body.email}/${req.files.resume[0].filename}`;
      fileUrls.resume = resumeUrl;
    }

    updateDatabase(fileUrls, req.body.email, res);
  });
};

module.exports = { uploadFile };
