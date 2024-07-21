
import Stock from '../models/stocks.js';

const getAllStocks = async (req, res) => {
    try {
        const stocks = await Stock.find().sort({ _id: -1 });
        res.status(200).json(stocks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getStockByID = async (req, res) => {
    try {
        let id = req.params.id;
        await Stock.findById(id, (err, data) => {
            if (err) return res.json({ message: 'Ngjyra nuk ekziston.' });
            res.send(data);
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createStock = async (req, res) => {
    const newStock = new Stock({
        product_id: req.body.product_id,
        stock_amount: req.body.stock_amount,
        createdAt: new Date().toISOString()
    });
    try {
        await newStock.save();
        res.status(200).json({ newStock: newStock, success: true });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateStock = async (req, res) => {
    const id = req.params.id;

    const stock = await Stock.findById(id);

    if (!id) {
        return res.status(404).send('No stock with that id.');
    }

    if (stock) {
        stock.product_id = req.body.product_id;
        stock.stock_amount = req.body.stock_amount;
        const updatedPost = await stock.save();

        if (updatedPost) {
            return res.status(200).send({ msg: 'Stock Updated', data: updatedPost, success: true });
        } else {
            return res.status(500).send({ msg: 'Error in Updating stock' });
        }
    }
}

const deleteStock = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).send('No stock with that id.');
    }
    const deletedStock = await Stock.findByIdAndRemove(id);

    res.json({ message: 'Stock deleted successfully', post: deletedStock });
}

export { getAllStocks, getStockByID, createStock, updateStock, deleteStock };
