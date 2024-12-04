const jwt = require('jsonwebtoken')
require('dotenv').config();

const secretKey =  process.env.JWT_SECRET;

const gerarToken = (id, nome) => {
    const token = jwt.sign(
        {
            id,
            nome
        },
        secretKey,
        {
            expiresIn: "900s"
        }
    );
    return token;
}


const validaToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    
    if (!token) {
        return res.status(403).send({ message: 'Token não fornecido.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => { 
        if (err) {
            return res.status(401).send({ message: 'Token Invalido ou expirado! Faça login novamente.' });
        }
        
        req.user = decoded; 
        next();  
    });

}


module.exports = { gerarToken, validaToken };