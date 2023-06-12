import { Router } from "express";
import bcrypt from  "bcrypt";
import jwt from "jsonwebtoken";

const pool = require('../src/postgres')
const router = Router();

export const SECRET_JWT_KEY = "Pass1";
 
router.post('/Registro', async (req,res)=>{
    try {
        const {Username,Email,Password} = req.body;
        const Salt = await bcrypt.genSalt();
        const PasswordHashed = await bcrypt.hash(Password,Salt);
        
        pool.query('INSERT INTO users (username, email,password) VALUES ($1, $2, $3) RETURNING *', [Username, Email , PasswordHashed], (error, results) => {
            if (error) {
              throw error
            }
            res.status(201).send(`User added with ID: ${results.rows[0].id}`)
          })

    } catch (err) {
        if (typeof err === 'object' && err !== null) {
            console.log(err.toString());
        }else {
            console.log('Unexpected error', err);
        }
    }
});

router.post('/Login', async (req,res)=>{
    try {
        const {Email,Password} = req.body;
        const Users = await pool.query('SELECT * FROM users WHERE email = $1', [Email])
        const UserFound = Users.rows[0];
        if(!UserFound){
            res.send('email no encontrado')
            } else{
                const PassMatched = await bcrypt.compare(Password,UserFound.password);
                if(!PassMatched){return res.status(401).json({error:"Pass Incorrecta"})
                
                } else{
                    const Token = jwt.sign({id:UserFound.id},SECRET_JWT_KEY)
                    res.status(200).json({'Estado':'Bienvenido',Token});

                }
            }
    } catch (err) {
        if (typeof err === 'object' && err !== null) {
            console.log(err.toString());
        }else{
            console.log('Unexpected error', err);
        }
    }
});

module.exports = router;
