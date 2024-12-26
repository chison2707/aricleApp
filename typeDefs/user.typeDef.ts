import { gql } from "apollo-server-express";

export const typeDefsUser = gql`
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