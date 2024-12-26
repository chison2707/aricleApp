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

    input UserInput {
        fullName: String,
        email: String,
        password: String
    }

    type Mutation {
        registerUser(user: UserInput): User,
    }
`;