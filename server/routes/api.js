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



router.post('/register', checkIfEmailExistInDB, (req, res)=>{
	let registerUser = req.body
	let user         = new User(registerUser)

	// Save email to database
	user.save((error, registeredUser) => {
		if(error)return res.status(503).send(error)
		
		// Send token and email as response
		payload = {subject: registerUser._id}		
		token   = jwt.sign(payload, tokenKey)
		return res.status(200).send({"token":token, "email":user.email})
	})
})

router.post('/login', (req, res)=>{
	let loginUser = req.body

	// Find email from database
	User.findOne({email: loginUser.email}, (error, user)=>{		
		if(error)return res.status(503).send(error)
		
		// User doesn't exist
		if(!user)return res.status(404).send("User doesn't exist")
		// Password error
		if(loginUser.password != user.password)return res.status(401).send("Wrong password")
		
		// Send token and email as response
		payload = {subject:user._id}
		token = jwt.sign(payload, tokenKey)
		return res.status(200).send({"token":token, "email":user.email})
	})
})

router.route('/user')
	.put(tokenVerification, (req, res)=>{
		
		// Find user with _id
		User.findOne({_id: req.body._id}, (error, user)=>{
			if(error) return res.status(503).send(error)			
			
			// User doesn't exist
			if(!user) return res.status(404).send("User doesn't exist")

			// find user, update email and save
			user.email = req.body.email
			token = req.headers.authorization.split(' ')[1]
			user.save((error, updatedUser)=>{
				return error?res.status(503).send(error):res.status(200).send({"token":token, "email":user.email})
			})			
		})
	})
	.delete(tokenVerification, (req, res)=>{

		// Delete user with id
		User.deleteOne({_id: req.body._id}, (error, user)=>{
			return error?res.status(503).send(error):res.status(200).send("User delete successfully")
		})
	})

// Middleware functions
function tokenVerification(req, res, next){
	// Check if request is authorized
	if(!req.headers.authorization) {
		return res.status(401).send("Unauthorized request")
	}
	// Get token from authorization header, then decode it
	jwt.verify(req.headers.authorization.split(' ')[1], tokenKey, (error, payload)=>{
		if(error)return res.status(401).send("Unauthorized request")
		
		req.body._id = payload.subject;
		next()
	})
}

function checkIfEmailExistInDB(req, res, next){
	// Check if email exists
	User.findOne({email: req.body.email}, (error, user)=>{
		//if(error)return next(error)
		//if(user)return next("Register email exits")
		if(error)return res.status(503).send(error)
		if(user)return res.status(409).send("User email exists")
		return next()
	})
}

module.exports = router