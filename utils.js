const mongoose = require('mongoose')

// import models
const User = require("./models/User")
const Chatroom = require("./models/Chatroom")

// socket helper functions

// create chatroom
// expects array of sorted usernames
const createChatroom = (usernames) => {
const newChatroom = new Chatroom({Users : usernames, roomName : usernames.toString(), messages : [], userNum: usernames.length })
newChatroom.save()
console.log('chatroom created with users ' + usernames)
usernames.forEach((user) => {
    User.findOneAndUpdate({username: user},
    {$push: {rooms: newChatroom._id.toString()}}, (err) => {
        if (err) {
        console.log(err)
        } else {
        console.log('room added to user')
        }
    }
    )      
})
}

// edits User
// expects strings username proprety and newProprety
const editUser = (username, proprety, newProprety) => {
return new Promise((resolve, reject) => {
    let tempProprety = {}
    tempProprety[proprety] = newProprety
    User.findOneAndUpdate({username}, {$set: tempProprety}, (err, doc, res) => {        
    if (err) {
        resolve('error')
    } else if (doc) {
        resolve(`Success! ${proprety} changed to ${newProprety}`)
    } else {
        reject('monkas')
    }
    })
})
}

// check existence of one user and implement promises lmoa wtf
// expects string username
const searchUser = (username) => {
return new Promise((resolve, reject) => {
    User.findOne({username}).exec((err, res) => {
    if (err) {
        reject(err)
    }
    else if (res) {
        resolve({res})
    }
    else {
        resolve('error')
    }
    })
})
}

module.exports = {createChatroom, editUser, searchUser}