const User = require("../model/userModel");

exports.loginOrRegisterUser = async (req, res) => {
  const { name } = req.body;

  try {
    let user = await User.findOne({ name });

    if (!user) {
      user = new User({ name });
      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to login/register user" });
  }
};
