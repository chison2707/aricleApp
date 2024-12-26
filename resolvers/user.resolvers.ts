import * as generate from "../helper/generate";
import { User } from "../models/user.model";
import md5 from "md5";

export const resolversUser = {
    Mutation: {
        registerUser: async (_, args) => {
            const { user } = args;

            const emailExist = await User.findOne({
                email: user.email,
                deleted: false
            });

            if (emailExist) {
                return {
                    code: 400,
                    message: "Email đã tồn tại"
                }
            } else {
                user.password = md5(user.password);
                user.token = generate.generateRandomString(30);

                const newUser = new User(user);
                const data = await newUser.save();

                return {
                    code: 200,
                    message: "Đăng ký thành công",
                    id: data.id,
                    fullName: data.fullName,
                    email: data.email,
                    token: data.token
                }
            }
        },
        loginUser: async (_, args) => {
            const { email, password } = args.user;


            const inforUser = await User.findOne({
                email: email,
                deleted: false
            });

            if (!inforUser) {
                return {
                    code: 400,
                    message: "Email không tồn tại"
                }
            }
            if (md5(password) !== inforUser.password) {
                return {
                    code: 400,
                    message: "Mật khẩu không đúng"
                }
            }

            return {
                code: 200,
                message: "Đăng nhập thành công",
                id: inforUser.id,
                fullName: inforUser.fullName,
                email: inforUser.email,
                token: inforUser.token
            }
        }
    }
};