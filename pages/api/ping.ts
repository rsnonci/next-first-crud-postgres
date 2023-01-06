import type { NextApiRequest, NextApiResponse } from 'next'
import {conn} from '../../utils/database'

type Data = {
  message: String,
  time: String
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const response = await conn.query("select now()")
  return res.json({
    message: 'ping',
    time: response.rows[0].now
  })
}