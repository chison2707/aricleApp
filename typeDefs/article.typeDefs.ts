import { gql } from "apollo-server-express";

export const typeDefsArticle = gql`
    type Article {
        id: ID,
        title: String,
        avatar: String,
        description: String,
        category: Category
    }


    type Query {
        getListArticle(
            sortKey:String, 
            sortValue: String,
            curentPage: Int = 1,
            limitItem: Int = 3,
            fillterKey: String,
            fillterValue: String,
            keyword: String
            ): [Article],
        getArticle(id: ID): Article,
    }

    input ArticleInput {
        title: String, 
        avatar: String,
        description: String,
        categoryId: String
    }

    type Mutation {
        createArticle(article: ArticleInput): Article,
        deleteArticle(id: ID): String,
        updateArticle(id: ID, article: ArticleInput): Article
    }
`;