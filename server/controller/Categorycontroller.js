// const CategorySchema = require('../model/Category_model');

// // Add Category
// const AddCategory = async (req, res) => {
//     try {
//         console.log("AddCategory endpoint hit"); // Log endpoint hit
//         const { category_name, category_description } = req.body;
//         if (!req.file) {
//             throw new Error('Category image is required');
//         }
//         const category_img = req.file.filename;

//         const catdata = new CategorySchema({ category_name, category_description, category_image: category_img });
//         const catdatasave = await catdata.save();
//         res.status(201).json(catdatasave); // Changed to status 201 (Created)
//     } catch (error) {
//         console.error("Error in AddCategory:", error.message);
//         res.status(500).send("Error adding category");
//     }
// };

// // Get Categories
// const Getcategory = async (req, res) => {
//     try {
//         const category = await CategorySchema.find();
//         res.status(200).json(category);
//     } catch (err) {
//         console.error("Error in Getcategory:", err.message);
//         res.status(500).send("Error fetching categories");
//     }
// };

// // Delete Category
// const DeleteCategory = async (req, res) => {
//     try {
//         let category = await CategorySchema.findById(req.params.id);
//         if (!category) {
//             return res.status(404).send("Category not found");
//         }
//         await CategorySchema.findByIdAndDelete(req.params.id);
//         res.status(200).json({ success: "Category deleted", category });
//     } catch (error) {
//         console.error("Error in DeleteCategory:", error.message);
//         res.status(500).send("Error deleting category");
//     }
// };

// // Update Category
// const UpdateCategory = async (req, res) => {
//     const { category_name, category_description, category_img } = req.body;

//     try {
//         const NewCategory = {};
//         if (category_name) { NewCategory.category_name = category_name; }
//         if (category_description) { NewCategory.category_description = category_description; }
//         if (category_img) { NewCategory.category_image = category_img; }

//         let category = await CategorySchema.findByIdAndUpdate(req.params.id, { $set: NewCategory }, { new: true });
//         if (!category) {
//             return res.status(404).send("Category not found");
//         }
//         res.status(200).json({ category });
//     } catch (error) {
//         console.error("Error in UpdateCategory:", error.message);
//         res.status(500).send("Error updating category");
//     }
// };

// module.exports = { AddCategory, Getcategory, UpdateCategory, DeleteCategory };

const CategorySchema = require('../model/Category_model');

// Define AddCategory function
const AddCategory = async (req, res) => {
    try {
        console.log("Category added Successfully"); // Log endpoint hit
        const { category_name, category_description, subcategories } = req.body;
        if (!req.file) {
            throw new Error('Category image is required');
        }
        const category_img = req.file.filename;

        const catdata = new CategorySchema({
            category_name,
            category_description,
            category_image: category_img,
        });

        const catdatasave = await catdata.save();
        res.status(201).json(catdatasave); // Changed to status 201 (Created)
    } catch (error) {
        console.error("Error in AddCategory:", error.message);
        res.status(500).send("Error adding category");
    }
};


// Define Getcategory function
const Getcategory = async (req, res) => {
    try {
        const category = await CategorySchema.find();
        res.status(200).json(category);
    } catch (err) {
        console.error("Error in Getcategory:", err.message);
        res.status(500).send("Error fetching categories");
    }
};

// Define UpdateCategory function
const UpdateCategory = async (req, res) => {
    const { category_name, category_description, category_img } = req.body;

    try {
        const NewCategory = {};
        if (category_name) { NewCategory.category_name = category_name; }
        if (category_description) { NewCategory.category_description = category_description; }
        if (category_img) { NewCategory.category_image = category_img; }

        let category = await CategorySchema.findByIdAndUpdate(req.params.id, { $set: NewCategory }, { new: true });
        if (!category) {
            return res.status(404).send("Category not found");
        }
        res.status(200).json({ category });
    } catch (error) {
        console.error("Error in UpdateCategory:", error.message);
        res.status(500).send("Error updating category");
    }
};

// Define DeleteCategory function
const DeleteCategory = async (req, res) => {
    try {
        let category = await CategorySchema.findById(req.params.id);
        if (!category) {
            return res.status(404).send("Category not found");
        }
        await CategorySchema.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: "Category deleted", category });
    } catch (error) {
        console.error("Error in DeleteCategory:", error.message);
        res.status(500).send("Error deleting category");
    }
};

module.exports = {
    AddCategory,
    Getcategory,
    UpdateCategory,
    DeleteCategory
};
