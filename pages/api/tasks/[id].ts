import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req;

    switch (method) {
        case 'GET':
            return res.json('Show Task')
            break;
        case 'PUT':
            return res.json('Update Task')
            break;
        case 'DELETE':
            return res.json('Delete Task')
            break;
        default:
            return res.status(400).json('Invalid Method')
            break;
    }
}