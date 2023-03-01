import mysql from "mysql2"

// export const connection = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
// })

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "my_own_social_media",
})

connection.connect(error => {
  if (error) return console.log(error)
  console.log("Conectado ao banco de dados com sucesso!")
})
