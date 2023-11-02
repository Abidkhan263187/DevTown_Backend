const { Router } = require('express');
const { Product } = require('../Models/productModel');

const productRoute = Router();

productRoute.get('/', async (req, res) => {
    const { sortby, order, pageNo, limit, category, size, rating } = req.query;


   
    const currPage = parseInt(pageNo || 1);
    const currLimit = parseInt(limit || 6);
    const skip = (currPage - 1) * currLimit;
    
    try {
        let query = {};

        if (category) {
            query.category = category;
        }

        if (size) {
            query.size = size;
        }
        if(rating){
            query.rating={$gt:rating};
        }
            // find({rating:{$gt:rating}})
        let list;
        if (sortby && order !== "") {
            const ordering = order === 'asc' ? 1 : -1;
            list = await Product.find(query) //{cate:'men'}
                .sort({ [sortby]: ordering })
                .skip(skip)
                .limit(currLimit);
        } else {
            list = await Product.find(query)
                .skip(skip)
                .limit(currLimit);
        }

        res.status(200).json({ mssg: "success", data: list });
    } catch (error) {
        res.status(500).json({ mssg: "error" });
        console.log(error);
    }
});


module.exports = { productRoute }