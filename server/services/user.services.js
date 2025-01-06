import User from "../models/user.model.js";

export const createUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and Password are required");
  }

  try {
    const hashedPass = await User.hashPassword(password);

    const user = await User.create({ email, password: hashedPass });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
