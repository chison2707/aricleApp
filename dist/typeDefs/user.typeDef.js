"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsUser = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsUser = (0, apollo_server_express_1.gql) `
    type User {
        id: ID,
        fullName: String,
        email: String,
        token: String,
        code: Int,
        message: String
    }

    type Query {
        getUser: User
    }

    input registerUserInput {
        fullName: String,
        email: String,
        password: String
    }

    input loginUserInput {
        email: String,
        password: String
    }

    type Mutation {
        registerUser(user: registerUserInput): User,
        loginUser(user: loginUserInput): User
    }
`;
