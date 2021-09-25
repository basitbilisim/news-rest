import {getCategories,postCategories,deleteCategories,updateCategories} from './../controllers/categoryModel.js'

const GET_CATEGORIES = async (req,res)=> {
	return res.json(await getCategories(req.query))
}
const POST_CATEGORIES = async  (req, res, next) => {
	try {
		let category = await postCategories(req.body)
		if(category) {
			res.json({
				status: 201,
				message: "The new category added",
				data: category
			})
		} else throw new Error("There is an error")
	} catch(error) {
		return next(error)
	}
}
const DELETE_CATEGORIES = async  (req, res, next) => {
	try {
		let category = await deleteCategories(req.body)
		if(category) {
			res.json({
				status: 201,
				message: "The category deleted",
				data: category
			})
		} else throw new Error("There is an error")
	} catch(error) {
		return next(error)
	}
}
const UPDATE_CATEGORIES = async  (req, res, next) => {
	try {
		let category = await updateCategories(req.body)
		if(category) {
			res.json({
				status: 201,
				message: "The category updated",
				data: category
			})
		} else throw new Error("There is an error")
	} catch(error) {
		return next(error)
	}
}
export {
	GET_CATEGORIES,
	POST_CATEGORIES,DELETE_CATEGORIES,UPDATE_CATEGORIES
}