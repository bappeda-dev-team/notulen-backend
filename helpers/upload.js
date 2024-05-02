const multer = require('multer');
const path = require('path');
const uploadFolder = path.join('uploads');
console.log(uploadFolder, '>>>>> pathname');
// const uploadFolder = path.join(__dirname, "Videos"); // use a variable to hold the value of upload folder

const storage = multer.diskStorage({
  destination: uploadFolder, // use it when upload
  filename: (req, file, cb) => {
    // nameFile = file.originalname + " "+ Date.now() // --> give "video.mp4 1622180824748"
    let [filename, extension] = file.originalname.split('.');
    let nameFile = filename + "-" + Date.now() + "." + extension; // --> give "video-1622181268053.mp4"
    cb(null, nameFile)
  }
})

const upload = multer({ storage });

module.exports = upload;