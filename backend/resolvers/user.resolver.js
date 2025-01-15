import { users } from '../dummyData/data.js'
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const userResolver = {
  Mutation: {
    signUp: async (_, {input}, context) => {
      try {
        const {username, name, email, password} = input;
        if (!username || !name || !email || !password) {
          throw new Error("All fields are required");
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("User already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const user = new User({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        await newUser.save();
        await context.login(user);

        return newUser;

      }catch (error) {
        console.error('Error in signUp resolver: ', error);
        throw new Error(error.message || "An error occurred. Please try again.");
      }
    },
    login: async (_, {input}, context) => {
      try {
        const {username, password} = input;
        const {user} = await context.authenticate("graphql-local", {username, password});
        await context.login(user);
        return user;
      } catch (error) {
        console.error('Error in login resolver: ', error);
        throw new Error(error.message || "An error occurred. Please try again.");
      }
    },
    logout: async(_, __, context) => {
      try {
        await context.logout();
        req.session.destroy((err) => {
          if(err){
            throw new Error("An error occurred", err);
          }
        });
        res.clearCookie("connect.sid");
        return {message: "Logged out successfully"};
      } catch (error) {
        console.log('Error in logout resolver: ', error);
        throw new Error(error.message || "An error occurred. Please try again.");
        
      }
    }
  },
  Query: {
    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (error) {
        console.error('Error in authUser resolver: ', error);
        throw new Error(error.message || "An error occurred. Please try again.");
      }
    },
    user: async(_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (error) {
        console.error('Error in user resolver: ', error);
        throw new Error(error.message || "An error occurred. Please try again.");
      }
    }
  },
}

export default userResolver