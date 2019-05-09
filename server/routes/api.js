const express = require('express')
const router  = express.Router()
const User    = require('../models/user')
const mongoose = require('mongoose')
const db       = 'mongodb+srv://yibo:dO60x20ak3CO6uaF@cluster0-7crlb.mongodb.net/test?retryWrites=true'

mongoose.connect(db, error=>{
	error ? console.log("error " + error) : console.log("DB connect successfully")
})

router.get('/', (req, res)=>{
	res.send("Send from api.js")
})

router.post('/register', (req, res)=>{
	let registerUser = req.body
	let user         = new User(registerUser)
	user.save((error, registeredUser) => {
		error ? console.log(error) : res.status(200).send(registeredUser)
	})
})

router.post('/login', (req, res)=>{
	let loginUser = req.body

	User.findOne({email: loginUser.email}, (error, user)=>{
		user ? (loginUser.password == user.password ? res.status(200).send(user) : res.status(401).send("Wrong password"))
		: (res.status(401).send("Invalid email"))
	})
})

module.exports = router