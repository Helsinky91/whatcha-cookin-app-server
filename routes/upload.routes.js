const router = require("express").Router();

const uploader = require("../middlewares/cloudinary")

router.post("/", uploader.single("image"), (req, res, next) => {

  if (req.file === undefined) {
    res.status(400).json("problems when uploading the img")
    return
  }

    // console.log(req.file.path) // el URL de cloudinary
  res.status(200).json({ image: req.file.path })

})

module.exports = router