import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./Models/UserModel.js";
import bcrypt from "bcrypt";
import PostModel from "./Models/Posts.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import * as ENV from "./config.js";
const app = express();
app.use(express.json());
app.use(cors());

//Database connection
const connectString = `mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASSWORD}@${ENV.DB_CLUSTER}/${ENV.DB_NAME}?retryWrites=true&w=majority&appName=PostITCluster`;
mongoose.connect(connectString);
app.post("/registerUser", async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const hashedpassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            name: name,
            email: email,
            password: hashedpassword,
        });

        await user.save();
        res.send({ user: user, msg: "Added." });
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }

});
// Convert the URL of the current module to a file path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name from the current file path
const __dirname = dirname(__filename);

// Set up middleware to serve static files from the 'uploads' directory
// Requests to '/uploads' will serve files from the local 'uploads' folder
app.use("/uploads", express.static(__dirname + "/uploads"));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Specify the directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Unique filename
    },
});
// Create multer instance
const upload = multer({ storage: storage });
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body; //using destructuring
        //search the user
        const user = await UserModel.findOne({ email: email });

        //if not found
        if (!user) {
            return res.status(500).json({ error: "User not found." });
        }
        console.log(user);
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Authentication failed" });
        }

        //if everything is ok, send the user and message
        res.status(200).json({ user, message: "Success." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.post("/logout", async (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
});
//POST API - savePost
app.post("/savePost", async (req, res) => {
    try {
        const postMsg = req.body.postMsg;
        const email = req.body.email;

        const post = new PostModel({
            postMsg: postMsg,
            email: email,
        });

        await post.save();
        res.send({ post: post, msg: "Added." });
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
});
app.get("/getPosts", async (req, res) => {
    try {
        // Fetch all posts from the "PostModel" collection, sorted by createdAt in descending order
        const posts = await PostModel.find({}).sort({ createdAt: -1 });

        const countPost = await PostModel.countDocuments({});

        res.send({ posts: posts, count: countPost });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
    }
});
app.put(
    "/updateUserProfile/:email/",
    upload.single("profilePic"),
    async (req, res) => {
      const email = req.params.email;
      const name = req.body.name;
      const password = req.body.password;
  
      try {
        // Find the user by email in the database
        const userToUpdate = await UserModel.findOne({ email: email });
  
        // If the user is not found, return a 404 error
        if (!userToUpdate) {
          return res.status(404).json({ error: "User not found" });
        }
  
        // Check if a file was uploaded and get the filename
        let profilePic = null;
        if (req.file) {
          profilePic = req.file.filename; // Filename of uploaded file
          // Update profile picture if a new one was uploaded but delete first the old image
          if (userToUpdate.profilePic) {
            const oldFilePath = path.join(
              __dirname,
              "uploads",
              userToUpdate.profilePic
            );
            fs.unlink(oldFilePath, (err) => {
              if (err) {
                console.error("Error deleting file:", err);
              } else {
                console.log("Old file deleted successfully");
              }
            });
            userToUpdate.profilePic = profilePic;
          }
        } else {
          console.log("No file uploaded");
        }
  
        
        userToUpdate.name = name;
  
        
        if (password !== userToUpdate.password) {
          const hashedPassword = await bcrypt.hash(password, 10);
          userToUpdate.password = hashedPassword;
        } else {
          userToUpdate.password = password; 
        }
  
        await userToUpdate.save();
  
        res.send({ user: userToUpdate, msg: "Updated." });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  );
app.listen(3001, () => {
    console.log("You are connected");
});
