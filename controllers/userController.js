const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Register a new user
exports.registerUser = async (req, res, next) => {
    try{    
    //access the data from the request body
        const { fullname, password, proficiency = 'A1' } = req.body;
        let username = req.body.username ? String(req.body.username).trim().toLowerCase() : '';

        //check if the username already exists (case-insensitive)
        const existingUser = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
        if (existingUser){
            return res.status(400).json({ message: 'Username already exists'})
        }

        //validate password strength and fullname presence
        if (!fullname || fullname.trim() === ''){
            return res.status(400).json({ message: 'Full name is required'})
        }
        if (!/^[a-zA-Z0-9]+$/.test(username)){
            return res.status(400).json({ message: 'Username must be alpha-numeric' })
        }
        if (!password || password.length < 6){
            return res.status(400).json({ message: 'Password must be at least 6 characters' })
        }
        if (!['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].includes(proficiency)) {
            return res.status(400).json({ message: 'Choose a valid CEFR proficiency level' });
        }
        //encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create a new user
        const newUser = await User.create({
            fullname,
            username,
            password: hashedPassword,
            role: 'learner',
            proficiency,
        });

        //respond with the new user data (excluding the password)
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                role: newUser.role,
                proficiency: newUser.proficiency,
            },
        });
    }catch (err){
        res.status(500).json({ message: 'Server Error', error: err.message})
    }
};

exports.loginUser = async (req, res) => {
    const username = req.body.username ? String(req.body.username).trim().toLowerCase() : '';
    const { password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !password || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
        { id: user._id.toString(), role: user.role, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '8h' },
    );

    res.json({
        token,
        user: { id: user._id, fullname: user.fullname, username: user.username, role: user.role, proficiency: user.proficiency },
    });
};

exports.createAdmin = async (req, res) => {
    const { fullname, username: rawUsername, password } = req.body;
    const username = rawUsername ? String(rawUsername).trim().toLowerCase() : '';

    if (!fullname || !username || !password || password.length < 6) {
        return res.status(400).json({ message: 'Full name, username, and a password of at least 6 characters are required' });
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return res.status(400).json({ message: 'Username must be alpha-numeric' });
    }
    if (await User.findOne({ username }).collation({ locale: 'en', strength: 2 })) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    const user = await User.create({
        fullname: fullname.trim(),
        username,
        password: await bcrypt.hash(password, 10),
        role: 'admin',
    });
    res.status(201).json({
        message: 'Admin account created',
        user: { id: user._id, fullname: user.fullname, username: user.username, role: user.role, proficiency: user.proficiency },
    });
};