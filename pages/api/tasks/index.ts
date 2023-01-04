import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req;

    switch (method) {
        case 'GET':
            return res.json('Get Task')
            break;
        case 'POST':
            return res.json('Create Task')
            break;
        default:
            return res.status(400).json('Invalid Method')
            break;
    }
}