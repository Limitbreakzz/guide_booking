const prisma = require("../prisma.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role === "GUIDE" ? "GUIDE" : "TOURIST" 
      },
    });

    res.json({
      message: "Register success",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error register:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email }});
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign({ 
        id: user.id, 
        role: user.role 
    }, SECRET, { 
        expiresIn: "1d" 
    });

    res.json({
      message: "Login success",
      data: user,
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};
