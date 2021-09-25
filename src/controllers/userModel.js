import  {fetch,fetchAll} from './../lib/postgres.js'


const INSERT_USER = `
	insert into users (
		firstname,
		lastname,
		password,
		email,
		special
	)values($1,$2,$3,$4,$5)
	returning *
 `
const CHECK_USER =`
SELECT EXISTS (
  SELECT * FROM users u WHERE u.email = $1 AND password = $2
) `
const GET_USER =`
	select * from users
`
const PUT_USER =`
	WITH old_data as (
		SELECT
			user_id,
			firstname,
			lastname,
			password,
			email,
			special
		FROM users
		WHERE user_id = $1
	) UPDATE users u SET
		firstname = (
		CASE
			WHEN length($2) > 1 THEN $2
			ELSE o.firstname
		END),
		lastname = (
		CASE
				WHEN length($3) > 1 THEN $3
				ELSE o.lastname
		END),
		password = (
		CASE
			WHEN length($4) > 1 THEN $4
			ELSE o.password
		END),
		email = (
		CASE
			WHEN length($5) > 1 THEN $5
			ELSE o.email
		END),
		special = (
		CASE
			WHEN length($6) > 1 THEN $6
			ELSE o.special
		END)
	FROM old_data o
	WHERE u.user_id = $1
	RETURNING u.user_id, 
	u.firstname as new_firstname, o.firstname as old_firstname, 
	u.lastname as new_lastname, o.lastname as old_lastname,
	u.password as new_password, o.password as old_password,
	u.email as new_email, o.password as old_email,
	u.special as new_special, o.special as old_special
`
const DELETE_USER =`
	delete from users
	where user_id = $1
	returning *

 `

const register = ({firstname,lastname,password,email,special}) =>{
	return fetchAll(INSERT_USER,firstname,lastname,password,email,special)
}
const login = ({email,password}) =>{
	return fetchAll(CHECK_USER,email,password)
}
const deleteUser = ({user_id}) =>{
	return fetchAll(DELETE_USER,user_id)
}
const getUser = () =>{
	return fetchAll(GET_USER)
}
const putUser = ({user_id,firstname,lastname,password,email,special}) =>{
	return fetchAll(PUT_USER,user_id,firstname,lastname,password,email,special)
}

export {
	register,
	login,
	deleteUser,
	getUser,putUser
}