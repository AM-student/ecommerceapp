import Product from '../models/products.js';

export const getAllProducts = async (req , res ) => {
    try {
        const products = await Product.find().sort({ _id: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getProductById = async (req, res) => {
    let id = req.params.id;
    try {
        const product = await Product.findById(id);
        if (product) {
            return res.status(200).send({ product: product, success: true })
        } else {
            return res.status(404).send({ message: 'N/A' });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

export const createProduct = async (req, res) => {
    const files = req.files;

    const product = new Product({
        product_title: req.body.product_title,
        product_category: req.body.product_category,
        product_price: req.body.product_price,
        product_images: files?.map((file) => file.filename),
        product_colors: req.body.product_colors,
        product_sizes: req.body.product_sizes,
        product_description: req.body.product_description,
        product_tags: req.body.product_tags,
        InStock: req.body.product_InStock,
    });

    try {
        await product.save();
        res.status(200).json({ product: product, success: true, message: 'Product created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    const files = req.files;

    const id = req.params.id;
    const product = await Product.findById(id);

    if (!id) {
        return res.status(404).send("No product with that id.");
    }
    let bodyImages;
    if (req.body.images) {
        bodyImages = Array.isArray(req.body.images) ? req.body.images : req.body.images.split(',');
    }

    if (product) {
        product.title = req.body.product_title;
        product.category = req.body.product_category;
        product.price = req.body.product_price;
        product.discountPrice = req.body.product_discountPrice;
        product.images = files?.length > 0 ? files?.map((file) => file.filename) : bodyImages ? bodyImages?.map((file) => file) : product?.images.map((file) => file);
        product.colors = req.body.product_colors;
        product.sizes = req.body.product_sizes;
        product.description = req.body.product_description;
        product.tags = req.body.product_tags;
        product.inStock = req.body.product_inStock;
        try {
            await product.save();
            return res.status(200).send({ msg: "Product Updated", data: product, success: true });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};

export const deleteProduct = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).send('No product with that id.');
    }
    const deletedProduct = await Product.findByIdAndRemove(id);

    res.json({ message: 'Product deleted successfully', post: deletedProduct });
}