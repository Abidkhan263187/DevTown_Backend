const {Router}=require('express');
const { Product } = require('../Models/productModel');

const productRoute=Router();

productRoute.get('/', async (req, res) => {
    const { sortby, order, pageNo, limit,category } = req.query;

    const currPage = parseInt(pageNo || 1);
    const currLimit = parseInt(limit || 3);
    const skip = (currPage - 1) * currLimit;
    try {
        let list;
        if (sortby && order && category) {
           const ordering = order == 'asc' ? 1 : -1;
            list = await Product.find({category:category}).sort({ [sortby]: ordering }).skip(skip).limit(currLimit)
        }else if (sortby && order ) {
            const ordering = order == 'asc' ? 1 : -1;
             list = await Product.find().sort({ [sortby]: ordering }).skip(skip).limit(currLimit)
         }
        else{
            list = await Product.find(req.query).skip(skip).limit(currLimit)
        }
      
        res.status(200).json({ mssg: "success", data: list })
    } catch (error) {
        res.status(501).json({ mssg: "error" })
        console.log(error)
    }
})

module.exports={productRoute}