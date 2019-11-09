const mysql = require('promise-mysql')
const config = require('@config').mysql;

const createConnection = async(database) => {
    let configuration = {
        host: eval(`config.database.${database}.host`),
        user: eval(`config.database.${database}.user`),
        password: eval(`config.database.${database}.password`),
        port: eval(`config.database.${database}.port`),
        database: eval(`config.database.${database}.db`)
    }

    try {
        let pool;
        let con;

        if (pool) con = pool.getConnection()
        else {
            pool = await mysql.createPool(configuration);
        }

        return pool
    } catch (ex) {
        throw ex;
    }
}

const closeConnection = (connection) => {
    try {
        connection.destroy()
    } catch (ex) {
        throw ex;
    }
}

module.exports = {
    createConnection: createConnection,
    closeConnection: closeConnection
}