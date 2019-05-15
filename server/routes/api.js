const express = require('express')
const router  = express.Router()
const User    = require('../models/user')
const jwt     = require('jsonwebtoken')
const mongoose = require('mongoose')
const db       = 'mongodb+srv://yibo:dO60x20ak3CO6uaF@cluster0-7crlb.mongodb.net/test?retryWrites=true'

const tokenKey = "whatever"
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
		error ? console.log(error) 
		: (payload = { subject: registerUser._id},		
		   token   = jwt.sign(payload, tokenKey),
		   res.status(200).send({"token":token, "email":user.email}))
	})
})

router.post('/login', (req, res)=>{
	let loginUser = req.body

	User.findOne({email: loginUser.email}, (error, user)=>{
		user ? (loginUser.password == user.password ? (payload = {subject:user._id}, token = jwt.sign(payload, tokenKey),res.status(200).send({"token":token, "email":user.email})) 
				: res.status(401).send("Wrong password"))
		: (res.status(401).send("Invalid email"))
	})
})

router.put('/update', (req, res)=>{
	if(!req.headers.authorization) {
		return res.status(401).send("Unauthorized request")
	}
	if(!req.body.email){
		return res.status(401).send("Request update is null")
	}
	// get token from authorization header, then decode it
	let token   = req.headers.authorization.split(' ')[1]
	jwt.verify(token, tokenKey, (error, payload)=>{
		console.log(payload)
		// token can't be decoded
		if(error){
			console.log(error)
			return res.status(401).send("Unauthorized request")
		}		
		// find one user with the decoded id
		User.findOne({_id: payload.subject}, (error, user)=>{
			// can't find the id from database
			if(error){
				console.log(error)
				return res.status(401).send("User can't be found")
			}
			// find user, update email and save
			user.email = req.body.email
			user.save((error, updatedUser)=>{
				error?console.log(error):res.status(200).send({"token":token, "email":user.email})
			})
			
		})
			
	})
})

module.exports = router