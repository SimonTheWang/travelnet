const express = require('express')
const router = express.Router()
// import model
const User = require("../models/User")

router.get('', (req, res, next) => {
    let query = req.get('user')
    User.find({$or:
        [
                {firstName : {$regex: `.*${query}.*`, $options: 'i'}}, 
        
                {lastName: {$regex: `.*${query}.*`, $options: 'i'}},
        
                {username: {$regex: `.*${query}.*`, $options: 'i'}}],
            },
        (err, result) => {
        if (err) {
            res.status(500).json({
                message: err
              })
        }
        else{
            console.log(query)
            let resArr = []
            result.forEach((e)=>{
            resArr.push(e)
        })
        res.status(200).json({
            users: resArr
            })
            }
        })
    })

module.exports = router