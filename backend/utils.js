import pkg from 'pg';
const { Client } = pkg;

export async function getClient() {
    const client = new Client({
        connectionString: process.env.CONNECTION_STRING,
    });
    await client.connect();
    return client;
}

export const getQuery = async (query, binds = []) => {
    const client = await getClient();
    try {
        const result = await client.query(query, binds);
        return result.rows;
    } catch (err) {
        throw err;
    } finally {
        if (typeof client.end === 'function') {
            await client.end();
        }
    }
};

export const postQuery = async (query, binds = []) => {
    const client = await getClient();
    try {
        const result = await client.query(query, binds);
        return result;
    } catch (err) {
        throw err;
    } finally {
        await client.end();
    }
};

