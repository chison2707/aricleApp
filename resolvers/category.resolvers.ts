import Category from "../models/category.model";

export const resolversCategry = {
    Query: {
        getListCategory: async () => {
            const category = await Category.find({
                deleted: false
            });
            return category;
        },
        getCategory: async (_, args) => {
            const { id } = args;

            const category = await Category.findOne({
                _id: id,
                deleted: false
            });
            return category;
        },
    },

    Mutation: {
        createCategory: async (_, args) => {
            const { category } = args;

            const record = new Category(category);

            await record.save();
            return record;
        },
        deleteCategory: async (_, args) => {
            const { id } = args;

            await Category.updateOne({
                _id: id
            }, {
                deleted: true
            });

            return "Delete success";
        },
        updateCategory: async (_, args) => {
            const { id, category } = args;

            await Category.updateOne({
                _id: id
            }, category);

            const record = await Category.findOne({
                _id: id
            });

            return record;
        }
    }
};