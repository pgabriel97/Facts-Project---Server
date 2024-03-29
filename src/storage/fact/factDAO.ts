import {QueryConfigValues, QueryResult} from 'pg';
import { pool } from '../database';
import { CreateFact } from './types';

/**
 * DAO class to be used for managing fact resources.
 */
class FactDAO {

    public async create(insertData: CreateFact) {
        const result = await pool.query(
            `INSERT INTO project_schema.fact (title, content, owner_id) VALUES ($1, $2, $3) RETURNING id`,
            [insertData.title, insertData.content, insertData.owner_id] as QueryConfigValues<CreateFact>
        );

        /* Could not add the fact row to the database. */
        if (!result.rowCount) {
            return false;
        }

        /* A fact with this auto-generated ID was added. */
        return result.rows[0].id;
    }

    public async read() {
        const result: QueryResult = await pool.query('SELECT * FROM project_schema.fact');
        return result.rows;
    }

    public async readById(id: number) {
        const result: QueryResult = await pool.query(
            `SELECT * FROM project_schema.fact WHERE id = $1`,
            [id]
        );

        if (result.rowCount) {
            return result.rows[0];
        }

        return undefined;
    }

    public async deleteById(id: number) {
        const result: QueryResult = await pool.query(
            `DELETE FROM project_schema.fact WHERE id = $1`,
            [id]
        );

        return !!result.rowCount;
    }
}

export {
    FactDAO
};
