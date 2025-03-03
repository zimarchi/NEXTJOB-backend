const { Client } = require ('pg')

const config = {
    host: 'localhost',
    port: 5432,
    database: 'nextjob',
    user: 'postgres',
    password: '011985',
}

const Nextjob = new Client (config)

Nextjob.connect()
    .then (() => console.log('database connected !!!'))
    .catch (error => console.error(error))

/*client.query('SELECT * FROM users')
.then ((result) => console.log("result", result))*/

module.exports = Nextjob;