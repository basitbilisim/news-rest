import  {fetch,fetchAll} from './../lib/postgres.js'

const GETNEWS =`
	select 
	* from news
	where
	case 
		when $1 > 0 then lang_id = $1 
		else true
	end	and
	case 
		when $2 > 0 then category_id = $2 
		else true
	end	 and
	case 
		when $3 > 0 then author_id = $3
		else true
	end and
	case 
		when $4 > 0 then new_id = $4 
		else true
	end	
`
const INSERT_NEWS = `
	insert into news (
		title,
		body,
		author_id,
		category_id,
		lang_id
	)values($1,$2,$3,$4,$5)
	returning *
 `
const PUT_NEWS = `
	WITH old_data as (
		SELECT
			new_id,
			title,
			body,
			author_id,
			category_id,
			lang_id
		FROM news
		WHERE new_id = $1
	) UPDATE news n SET
		title = (
		CASE
			WHEN length($2) > 1 THEN $2
			ELSE o.title
		END),
		body = (
		CASE
				WHEN length($3) > 1 THEN $3
				ELSE o.body
		END),
		author_id = (
		CASE
			WHEN $4 > 0 THEN $4
			ELSE o.author_id
		END),
		category_id = (
		CASE
			WHEN $5 > 0 THEN $5
			ELSE o.category_id
		END),
		lang_id = (
		CASE
			WHEN $6 > 0 THEN $6
			ELSE o.lang_id
		END)
	FROM old_data o
	WHERE n.new_id = $1
	RETURNING n.new_id, 
	n.title as new_title, o.title as old_title, 
	n.body as new_body, o.body as old_body,
	n.author_id as new_author_id, o.author_id as old_author_id,
	n.category_id as new_category_id, o.category_id as old_category_id,
	n.lang_id as new_lang_id, o.lang_id as old_lang_id
 `
 const DELETE_NEWS =`
	delete from news
	where new_id = $1
	returning *

 `

const getNews = ({lang_id=0,category_id=0,author_id=0,new_id=0}) =>{
	return fetchAll(GETNEWS,lang_id,category_id,author_id,new_id)
}
const postNews = ({title,body,author_id,category_id,lang_id}) =>{
	return fetchAll(INSERT_NEWS,title,body,author_id,category_id,lang_id)
}
const putNews = ({new_id,title,body,author_id,category_id,lang_id}) =>{
	return fetchAll(PUT_NEWS,new_id,title,body,author_id,category_id,lang_id)
}
const deleteNews = ({new_id}) =>{
	return fetchAll(DELETE_NEWS,new_id)
}

export {
	getNews,postNews,putNews,deleteNews
}