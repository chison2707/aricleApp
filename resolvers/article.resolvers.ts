import Article from "../models/article.model";
import Category from "../models/category.model";

export const resolversArticle = {
    Query: {
        getListArticle: async (_, args) => {
            const {
                sortKey,
                sortValue,
                curentPage,
                limitItem,
                fillterKey,
                fillterValue
            } = args;

            const find = {
                deleted: false,
            };

            // sort
            const sort = {};

            if (sortKey && sortValue) {
                sort[sortKey] = sortValue;
            }
            // end sort

            // pagination
            const skip = (curentPage - 1) * limitItem;
            // end pagination

            // fillter
            if (fillterKey && fillterValue) {
                find[fillterKey] = fillterValue;
            }
            // end fillter

            const article = await Article.find(find).sort(sort).limit(limitItem).skip(skip);
            return article;
        },
        getArticle: async (_, args) => {
            const { id } = args;

            const article = await Article.findOne({
                _id: id,
                deleted: false
            });
            return article;
        },
    },
    Article: {
        category: async (article) => {
            const category = await Category.findOne({
                _id: article.categoryId,
                deleted: false
            });
            return category;
        },
    },
    Mutation: {
        createArticle: async (_, args) => {
            const { article } = args;

            const record = new Article(article);

            await record.save();
            return record;
        },
        deleteArticle: async (_, args) => {
            const { id } = args;

            await Article.updateOne({
                _id: id
            }, {
                deleted: true
            });

            return "Delete success";
        },
        updateArticle: async (_, args) => {
            const { id, article } = args;

            await Article.updateOne({
                _id: id
            }, article);

            const record = await Article.findOne({
                _id: id
            });

            return record;
        }
    }
};