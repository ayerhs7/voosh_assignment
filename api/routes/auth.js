const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', async (req,res) => {
    // register validation code
    const {error} = registerValidation(req.body);
    console.log(error);
    if(error) return res.status(400).send(error.details[0].message);

    // check if user already exists
    const phoneExists = await User.findOne({phone: req.body.phone});
    if(phoneExists){
        return res.status(400).send('Phone already exists');
    }

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // console.log((req.body.phone).length);
    // create a new user
    const user = new User({
        name: req.body.name,
        phone: req.body.phone,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    } catch(err){
        res.status(400).send(err);
    }
});

// Login code
router.post('/login-user',async (req,res) => {
    // login validation code
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // check if user doesn't exists
    const user = await User.findOne({phone: req.body.phone});
    if(!user){
        return res.status(400).send('User does not exists');
    }

    // check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    // create and assign a token
    const token = jwt.sign({_id: user._id},`${process.env.TOKEN_SECRET}`);
    res.header('auth-token', token).send(token);
});

module.exports = router;