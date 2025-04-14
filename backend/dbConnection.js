const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER || 'foodos',
    password: process.env.DB_PASSWORD || '123',
    connectString: process.env.DB_CONNECT_STRING || 'localhost:1521/XEPDB1'
};

const getQuery = (query, binds = []) => {
    return new Promise(async (resolve, reject) => {
        let connection;
        try {
            connection = await oracledb.getConnection(dbConfig);
            const result = await connection.execute(query, binds);
            resolve(result.rows);
        } catch (err) {
            console.error('Error executing getQuery:', err);
            reject(err);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error('Error closing connection in getQuery:', err);
                }
            }
        }
    });
};

const postQuery = (query, binds = []) => {
    return new Promise(async (resolve, reject) => {
        let connection;
        try {
            connection = await oracledb.getConnection(dbConfig);
            const result = await connection.execute(query, binds, { autoCommit: true });
            resolve(result);
        } catch (err) {
            console.error('Error executing postQuery:', err);
            reject(err);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error('Error closing connection in postQuery:', err);
                }
            }
        }
    });
};

module.exports = {
    postQuery,
    getQuery
}