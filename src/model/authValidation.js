import {register,login,deleteUser,getUser,putUser} from './../controllers/userModel.js'
import JWT from './../lib/jwt.js'
import validation from './../lib/joi.js'

const REGISTER = async  (req, res, next) => {
	try {
			let {error} = validation.schema.validate(req.body)
			let auth 
		if(error){
			throw error
		}else {
			auth = await register(req.body)
		}
		if(auth) {
			res.json({
				status: 201,
				message: "The new user added",
				token:JWT.sign(req.body.email),
				data: auth
			})
		} else throw new Error("There is an error")
	} catch(error) {
		return next(error)
	}
}
const LOGIN = async  (req, res, next) => {
	//console.log(req.body)
	try {
		let auth = await login(req.body)
		let data = undefined

		for(let i of auth){
			data = i
		}
		console.log(data)
		if(data.exists == true) {
			res.json({
				status: 201,
				message: "The user success login",
				data: JWT.sign(req.body.email)
			})
		} else {
			res.json({
				status:401,
				message:"False",
				data:null
			})
		}
	} catch(error) {
		return next(error)
	}
}
const DELETE_USER = async (req, res, next) =>{
	try {
		let auth = await deleteUser(req.body)
		if(auth) {
			res.json({
				status: 201,
				message: "The user deleted",
				data: auth
			})
		} else throw new Error("There is an error")
	} catch(error) {
		return next(error)
	}
}
const PUTUSER = async (req, res, next) =>{
	try {
		let auth = await putUser(req.body)
		if(auth) {
			res.json({
				status: 201,
				message: "The user updated",
				data: auth
			})
		} else throw new Error("There is an error")
	} catch(error) {
		return next(error)
	}
}
const GETUSER = async (req, res) => {
	res.json(await getUser())
}
export {
	REGISTER,
	LOGIN,
	DELETE_USER,
	GETUSER,
	PUTUSER
}