const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};


exports.register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    const user = await User.create({ username, password, role });
    //const user = await User.create(req.body);
    const token = generateToken(user);
    res.status(201).json({ token });
    //res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
