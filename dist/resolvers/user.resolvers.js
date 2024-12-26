"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolversUser = void 0;
const generate = __importStar(require("../helper/generate"));
const user_model_1 = require("../models/user.model");
const md5_1 = __importDefault(require("md5"));
exports.resolversUser = {
    Query: {
        getUser: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const inforUser = yield user_model_1.User.findOne({
                token: context["user"].token,
                deleted: false
            });
            if (!inforUser) {
                return {
                    code: 400,
                    message: "Người dùng không tồn tại"
                };
            }
            else {
                return {
                    code: 200,
                    message: "Lấy thông tin người dùng thành công",
                    id: inforUser.id,
                    fullName: inforUser.fullName,
                    email: inforUser.email,
                    token: inforUser.token
                };
            }
        })
    },
    Mutation: {
        registerUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            const emailExist = yield user_model_1.User.findOne({
                email: user.email,
                deleted: false
            });
            if (emailExist) {
                return {
                    code: 400,
                    message: "Email đã tồn tại"
                };
            }
            else {
                user.password = (0, md5_1.default)(user.password);
                user.token = generate.generateRandomString(30);
                const newUser = new user_model_1.User(user);
                const data = yield newUser.save();
                return {
                    code: 200,
                    message: "Đăng ký thành công",
                    id: data.id,
                    fullName: data.fullName,
                    email: data.email,
                    token: data.token
                };
            }
        }),
        loginUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, password } = args.user;
            const inforUser = yield user_model_1.User.findOne({
                email: email,
                deleted: false
            });
            if (!inforUser) {
                return {
                    code: 400,
                    message: "Email không tồn tại"
                };
            }
            if ((0, md5_1.default)(password) !== inforUser.password) {
                return {
                    code: 400,
                    message: "Mật khẩu không đúng"
                };
            }
            return {
                code: 200,
                message: "Đăng nhập thành công",
                id: inforUser.id,
                fullName: inforUser.fullName,
                email: inforUser.email,
                token: inforUser.token
            };
        })
    }
};
