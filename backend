require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

/* ==========================
   DATABASE CONNECTION
========================== */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* ==========================
   USER MODEL
========================== */

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    role: {
      type: String,
      default: "Student",
    },
    bio: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

/* ==========================
   COMMUNITY MODEL
========================== */

const communitySchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    creator: String,
    members: [String],
  },
  { timestamps: true }
);

const Community = mongoose.model(
  "Community",
  communitySchema
);

/* ==========================
   POST MODEL
========================== */

const postSchema = new mongoose.Schema(
  {
    content: String,
    author: String,
    community: String,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

/* ==========================
   HOME
========================== */

app.get("/", (req, res) => {
  res.send("CampusCircle Backend Running");
});

/* ==========================
   REGISTER
========================== */

app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, role } =
      req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "Registration successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* ==========================
   LOGIN
========================== */

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Login Successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* ==========================
   PROFILE
========================== */

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

/* ==========================
   CREATE COMMUNITY
========================== */

app.post(
  "/api/community/create",
  async (req, res) => {
    try {
      const {
        name,
        description,
        creator,
      } = req.body;

      const community =
        await Community.create({
          name,
          description,
          creator,
          members: [creator],
        });

      res.json(community);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

/* ==========================
   GET COMMUNITIES
========================== */

app.get(
  "/api/communities",
  async (req, res) => {
    const communities =
      await Community.find();

    res.json(communities);
  }
);

/* ==========================
   JOIN COMMUNITY
========================== */

app.post(
  "/api/community/join/:id",
  async (req, res) => {
    try {
      const community =
        await Community.findById(
          req.params.id
        );

      if (!community) {
        return res
          .status(404)
          .json({
            message:
              "Community not found",
          });
      }

      community.members.push(
        req.body.user
      );

      await community.save();

      res.json({
        message:
          "Joined Successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

/* ==========================
   CREATE POST
========================== */

app.post(
  "/api/post/create",
  async (req, res) => {
    try {
      const {
        content,
        author,
        community,
      } = req.body;

      const post = await Post.create({
        content,
        author,
        community,
      });

      res.json(post);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

/* ==========================
   GET POSTS
========================== */

app.get("/api/posts", async (req, res) => {
  const posts = await Post.find();

  res.json(posts);
});

/* ==========================
   DELETE POST
========================== */

app.delete(
  "/api/post/:id",
  async (req, res) => {
    try {
      await Post.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Post Deleted Successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

/* ==========================
   START SERVER
========================== */

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server Running On Port ${PORT}`
  );
});
