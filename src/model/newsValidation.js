import {getNews,postNews,putNews,deleteNews} from './../controllers/newsModel.js'

const GETNEWS = async(req,res) => {
	return res.json(await getNews(req.query))
}
const POSTNEWS = async(req,res) => {
	try {
		let news = await postNews(req.body)
		if(news) {
			res.json({
				status: 201,
				message: "The new news added",
				data: news
			})
		} else throw new Error("There is an error")
	} catch(error) {
		return next(error)
	}
}
const PUTNEWS = async(req,res,next) => {
	try {
		let news = await putNews(req.body)
		if(news) {
			res.json({
				status: 201,
				message: "The new updated",
				data: news
			})
		} else throw new Error("There is an error")
	} catch(error) {
		return next(error)
	}
}
const DELETENEWS = async(req,res,next) => {
	try {
		let news = await deleteNews(req.body)
		if(news) {
			res.json({
				status: 201,
				message: "The new deleted",
				data: news
			})
		} else throw new Error("There is an error")
	} catch(error) {
		return next(error)
	}
}

export{
	GETNEWS,
	POSTNEWS,
	PUTNEWS,
	DELETENEWS
}