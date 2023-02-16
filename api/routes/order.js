const router = require('express').Router();
const User = require('../model/User');
const {orderValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', async (req,res) => {
    // register validation code
    const {error} = orderValidation(req.body);
    console.log(error);
    if(error) return res.status(400).send(error.details[0].message);

    // check if user doesn't exists
    const user = await User.findOne({phone: req.body.phone});
    if(!user){
        return res.status(400).send('User does not exists');
    }

    const order = new Order({
        user_id: req.body.user_id,
        subtotal: req.body.subtotal,
        phone: req.body.phone
    });
    console.log(order);
    try{
        const savedOrder = await order.save();
        res.send(savedOrder);
    } catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});

module.exports = router;