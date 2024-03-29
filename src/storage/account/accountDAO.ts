import { QueryConfigValues, QueryResult } from 'pg';
import { pool } from '../database';
import { AccountFilter, CreateAccount } from './types';

/**
 * DAO class to be used for managing account resources.
 */
class AccountDAO {

    public async create(insertData: CreateAccount) {
        const { username, password } = insertData;

        const result = await pool.query(
            `INSERT INTO project_schema.account (username, password) VALUES ($1, $2) RETURNING id`,
            [username, password] as QueryConfigValues<CreateAccount>
        );

        /* Could not add the account row to the database. */
        if (!result.rowCount) {
            return false;
        }

        /* An account with this auto-generated ID was added. */
        return result.rows[0].id;
    }

    public async readById(id: number) {
        const result: QueryResult = await pool.query(
            `SELECT id, username FROM project_schema.account WHERE id = $1`,
            [id]
        );

        if (result.rowCount) {
            return result.rows[0];
        }

        return undefined;
    }

    public async read(filter: AccountFilter) {
        let query = 'SELECT id, username, password FROM project_schema.account';
        const params = [];

        if (filter && filter.filterBy === 'username') {
            query += ' WHERE username = $1';
            params.push(filter.filterValue);
        }

        const result: QueryResult = await pool.query(query, params);
        return result.rows;
    }

    public async exists(filter: AccountFilter): Promise<boolean> {
        let query = 'SELECT 1 FROM project_schema.account';
        const params = [];

        if (filter && filter.filterBy === 'username') {
            query += ' WHERE username = $1';
            params.push(filter.filterValue);
        }

        const result: QueryResult = await pool.query(query, params);
        return !!result.rowCount;
    }
}

export {
    AccountDAO
};
