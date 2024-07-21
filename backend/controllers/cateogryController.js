
import Category from '../models/categories.js';


const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort( { _id: -1 } );
        res.status(200).json(categories);
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

const getCategoryByID = async (req, res) => {
    try {
        let id = req.params.id;
        await Category.findById(id, (err, data) => {
            if(err) return res.json({message: 'Kategoria nuk ekziston.'});
            res.send(data);
        });
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

const createCategory = async (req, res) => { 
    const newCategory = new Category({ 
        category_name: req.body.category_name,
        category_description: req.body.category_description,
        createdAt: new Date().toISOString()
    });
    try {
        await newCategory.save();
        res.status(201).json({ newCategory: newCategory, success: true });
    } catch(error) {
        res.status(409).json({ message: error.message });
    }
}

const updateCategory = async (req, res) => {
    const id = req.params.id;

    const category = await Category.findById(id);

    if(!id) {
        return res.status(404).send('No category with that id.');
    }

    if(category) {
        category.category_name = req.body.category_name;
        category.category_description = req.body.category_description;
        const updatedPost = await category.save();
        
        if(updatedPost) {
            return res.status(200).send({ msg: 'Category Updated', data: updatedPost, success: true });
        } else {
            return res.status(500).send({ msg: 'Error in Updating category' });
        }
    }
}

const deleteCategory = async (req, res) => {
    const id = req.params.id;

    if(!id) {
        return res.status(404).send('No category with that id.');
    }
    const deletedCategory = await Category.findByIdAndRemove(id);

    res.json({ message: 'Category deleted successfully', post: deletedCategory });
}

export { getAllCategories, getCategoryByID, createCategory, updateCategory, deleteCategory };
