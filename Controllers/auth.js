const User = require('../Model/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../Config/config')

const generateToken = (data) => {
        const token = jwt.sign(data, config.privateKey);
        return token;
}

const register = async (req, res) => {
        const { password } = req.body;
        if (password.length < 6) {
                console.log('Password must at least 6 characters');
                return
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await new User({ ...req.body, password: hashedPassword });

        newUser.save()
                .then((data) => {
                        const token = generateToken({
                                userID: data._id,
                                userEmail: data.email
                        });
                        res.status(200).header('Authorization', token).send(data)
                })
                .catch((err) => {
                        if (err.code === 11000) {
                                res.status(400).send(err.keyValue)
                        }

                });
}

const login = async (req, res) => {
        const { email, password } = req.body
        const user = await User.findOne({ email });
        if (!user) {
                res.status(200).send('The email does not exist')
                return;
        }
        const status = await bcrypt.compare(password, user.password)
        if (!status) {
                console.log('Wrong email or password');
                res.header('Authorization', 'none').send()
                return;
        }
        const token = generateToken({
                userID: user._id,
                userEmail: user.email
        });
        if (user && status) {
                res.header('Authorization', token).send(user)
        }
}

const verify = async (req, res) => {
        const token = req.headers.authorization;
        if (!token) {
                res.header('auth', false).send({ auth: false })
                return
        }
        try {
                const key = await jwt.verify(token, config.privateKey)
                if (key) {

                        const { email, userId } = key;
                        const user = await User.findOne(email);
                        if (!user) {
                                console.log('Wrong username or password 2');
                                return;
                        }
                        res.header(token).send({ auth: true })
                }
        } catch {
                return
        }
}
const getuser=async(req,res)=>{

    try {
                const user = await User.findOne({email:'rfgeorgieva@gmail.com'});
                res.send(user)
        }
 catch {
        return
}
} 
const updateUser=async(req,res)=>{
        const {id}=req.body;
        const user= await User.findOneAndUpdate({_id:id},{$set:{...req.body}})
        }
module.exports = {
        register,
        login,
        verify,
        getuser,
        updateUser
};