const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const multer = require("multer");
const blogModel = require("./database/blogSchema");
const path = require("path");
require("dotenv").config();
const userRoute = require("./routes/route");

const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//===============================================
const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/");
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    callback(null, `image-${Date.now()}.${ext}`);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error(" Only images are supported"));
  }
};

const upload2 = multer({
  storage: multerConfig,
  fileFilter: isImage,
});

const uploadImage = upload2.single("image");

function createBlog3(req, res) {
  const newBlog = req.body;
  console.log(req.file);
  blogModel.create({
    author: newBlog.author,
    title: newBlog.title,
    body: newBlog.body,
    image: {
      data: req.file.filename,
      contentType: "image/png",
    },
  });

  res.status(200).json({ status: "Successfully" });
}

//================================================

// getting all posts
async function getBlogs(req, res) {
  const ads = await blogModel.find();
  res.status(200).json({
    status: true,
    message: "Blogs Retrieved Successfully",
    data: ads,
  });
}

// getting a single blog post
async function getBlog(req, res) {
  const id = req.params.id;
  try {
    const blog = await blogModel.findById(id);
    if (blog) {
      console.log(blog);
      res.status(201).json(blog);
    } else {
      res.status(404).json({ status: false });
    }
  } catch (err) {
    console.log(err);
  }
}

async function deleteBlogById(req, res) {
  // get the user id from req.params
  const id = req.params.id;
  try {
    // find and delete the blog
    const deleteBlog = await blogModel.findByIdAndDelete(id);
    // responds to the client

    res.status(200).json({
      status: true,
      message: "Blog deleted successfully",
      data: deleteUser,
    });
    console.log("deleted");
  } catch (err) {
    console.log("not deleted");
    res.status(404).json({ status: false, message: "Something went wrong" });
  }
}

// Updating Blog
async function updateBlog(req, res) {
  const id = req.params.id;
  const dataToUpdate = req.body;
  try {
    const updatedData = await blogModel.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
    });

    if (updatedData) {
      res.status(201).json({
        status: true,
        message: "Profile updated successfully",
        data: updatedData,
      });
    } else {
      res.status(404).json({ status: false, message: "Fail to update Blog" });
    }
  } catch (error) {
    res.status(404).json({ status: false, message: "Something went wrong" });
  }
}

// app.post("/blog1", createBlog);
// app.post("/blog2", createBlog2);
app.post("/blog", uploadImage, createBlog3);
app.put("/blog/:id", updateBlog);
app.get("/blog", getBlogs);
app.get("/blog/:id", getBlog);
app.delete("/blog/:id", deleteBlogById);

app.use("/", userRoute);

mongoose
  .connect(process.env.API_KEY)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(port, () => console.log("listening on port", port));
