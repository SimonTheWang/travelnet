const express = require('express')
const jwt = require('jsonwebtoken')
const jwtSecret = 'MonkasczI69'
const jwtMiddleware = require('../jwt.middleware')

const router = express.Router()

router.get('', (req, res, next) => {
    console.log(req)
    if (req) {
        res.status(200).sendFile('../Tf/JsModel/model.json')
    }
})

module.exports = router