import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginResponse, RegisterResponse, UserInfo, Context } from "../types";
import { User, UserModel } from "../models/user"



export default {

  Query: {
    async currentUser(
      _: void,
      _args: any,
      ctx: Context,
    ): Promise<UserInfo> {
      const { userInfo } = ctx;
      if (!userInfo) {
        throw new Error("Not authenticated!");
      }
      const user: User | null = await UserModel.findOne({ _id: userInfo.id });
      if (!user) {
        throw new Error("Not authenticated!");
      }
      return {
        id: user._id,
        username: user.username,
      };
    },

    async getAllUsers(){
     const users = await UserModel.find()
     return users;
    }
    
  },
  Mutations: {
    async register(_: void, args: any): Promise<RegisterResponse> {
      const { username, password, confirmPassword } = args;
      const existingUser: number = await UserModel.countDocuments({ username });
      
      if (existingUser) {
        throw new Error("Username already used!");
      }
      
      if (password !== confirmPassword){
        throw new Error("Enter the same password for the validation!")
      }
      const hashedPassword: string = await bcrypt.hash(password, 10);
      const user: User = new UserModel({
        username,
        password: hashedPassword,
      });
      await user.save();
      return {
        id: user._id,
        username: user.username,
      };
    },
    async login(_: void, args: any): Promise<LoginResponse> {
      const { username, password } = args;
      const user: User | null = await UserModel.findOne({ username });
      if (!user) {
        throw new Error("Invalid login!");
      }
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        throw new Error("Invalid login!");
      }
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        "secret",
      );
      return {
        token,
        id: user._id,
      }
    }
  },
  Custom: {
    isAuthenticated(ctx: Context){
      const { userInfo } = ctx;
      if (!userInfo) throw new Error("User not authenticated!");
      return true;
    }
  }
}

 


