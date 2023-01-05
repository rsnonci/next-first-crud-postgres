import {Pool} from 'pg';

let conn: any;

if (!conn) {
    new Pool({
        user: 'postgres',
        password: 'password',
        host: 'localhost',
        port: 54,
        database: 'tasksdb'
    })
};

export {conn};