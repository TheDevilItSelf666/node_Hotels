const jwt = require('jsonwebtoken');

const jwtAuthMiddleWare = (req , res , next) => {

    const token = req.header.authorization.split(' ')[1];
    if(!token){
        res.status(401).json({message : 'Unauthorized'});
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        req.user = decoded;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({message : 'Invalid token'});

    }
}

const geneToken = (userData) =>{
    return jwt.sign(userData , process.env.JWT_SECRET);
}

module.exports = {jwtAuthMiddleWare , geneToken};