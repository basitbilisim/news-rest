import  {fetch,fetchAll} from './../lib/postgres.js'
const GETCATEGORIES = `
	SELECT 
	*
	FROM categories
	where
	case 
		when $1 > 0 then lang_id = $1
		else true
	end
	
 `
const POSTCATEGORIES = `
	insert into categories (
		category_name,
		lang_id
	)values($1,$2)
	returning *
 `
const DELETECATEGORIES =`
	delete from categories
	where category_id = $1
	returning *

 `

const UPDATECATEGORIES = `
	WITH old_data as (
		SELECT
			category_id,
			category_name,
			lang_id
		FROM categories
		WHERE category_id = $1
	) UPDATE categories c SET
		category_name = (
		CASE
			WHEN length($2) > 1 THEN $2
			ELSE o.category_name
		END),
		lang_id = (
		CASE
			WHEN $3 > 0 THEN $3
			ELSE o.lang_id
		END)
	FROM old_data o
	WHERE c.category_id = $1
	RETURNING c.category_id, 
	c.category_name as new_name, o.category_name as old_name, 
	c.lang_id as new_price, o.lang_id as old_lang_id
`
const getCategories = ({lang_id=0}) => {
	return fetchAll(GETCATEGORIES,lang_id)
}
const postCategories = ({category_name,lang_id}) => {
	return fetchAll(POSTCATEGORIES,category_name,lang_id)
}
const deleteCategories = ({category_id}) => {
	return fetchAll(DELETECATEGORIES,category_id)
}
const updateCategories = ({category_id,category_name,lang_id}) => {
	return fetchAll(UPDATECATEGORIES,category_id,category_name,lang_id)
}


export{
	getCategories,
	postCategories,
	deleteCategories,
	updateCategories
}