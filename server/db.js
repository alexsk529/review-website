import pg from 'pg'

const pool = new pg.Pool({
    user: "pyzrbyqn",
    password: "800XiuGqvT5ifiXRGFHV4c9WN2VBwGDn",
    host: "dumbo.db.elephantsql.com",
    port: 5432,
    database: "pyzrbyqn"
});

export default pool