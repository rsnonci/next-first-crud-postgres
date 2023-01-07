import type { NextApiRequest, NextApiResponse } from 'next'
import { conn } from 'src/utils/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        method, 
        query, 
        body
    } = req;

    switch (method) {
        case 'GET':
            try {
                const queryCommand = `SELECT * FROM tasks WHERE id=$1;`
                const values = [query.id]
                const response = await conn.query(queryCommand, values)

                if (response.rows.length == 0) {
                    return res.status(404).json({error: 'Not Found'})
                }
                
                return res.status(200).json(response.rows)
            } catch (error: any) {
                return res.status(400).json({error: error.message})
            }
        case 'PUT':
            try {
                const {
                    title, 
                    description
                } = body
                const queryCommand = `UPDATE tasks SET title=$1, description=$2 WHERE id=$3 RETURNING *;`
                const values = [
                    title, 
                    description,
                    query.id
                ]
                const response = await conn.query(queryCommand, values)

                if (response.rows.length == 0) {
                    return res.status(404).json({error: 'Not Found'})
                }
                
                return res.status(200).json(response.rows)
            } catch (error: any) {
                return res.status(400).json({error: error.message})
            }
        case 'DELETE':
            try {
                const queryCommand = `DELETE FROM tasks WHERE id=$1 RETURNING *;`
                const values = [query.id]
                const response = await conn.query(queryCommand, values)

                if (response.rows.length == 0) {
                    return res.status(404).json({error: 'Not Found'})
                }
                
                return res.status(200).json(response.rows)
            } catch (error: any) {
                return res.status(400).json({error: error.message})
            }
        default:
            return res.status(400).json('Invalid Method')
    }
}