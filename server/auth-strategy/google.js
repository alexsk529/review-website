import GoogleStrategy from 'passport-google-oidc';
import db from '../db.js';
import dotenv from 'dotenv';

dotenv.config()

export default new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/api/auth/oauth2/redirect/google',
    scope: ['profile']
    },
    async function verify(issuer, profile, cb) {
    try {
        const cred = await db.query('SELECT * FROM author WHERE provider = $1 AND subject = $2', [issuer, profile.id])
        console.log('CRED: ', cred.rows[0])
        if (!cred.rows[0]) {
            await db.query('INSERT INTO author(author_name, provider, subject) VALUES($1, $2, $3)',
                [profile.displayName, issuer, profile.id], (err) => {
                if (err) return cb (err)
                })

            const user = {
                subject: profile.id,
                author_name: profile.displayName
            }
            console.log('user is: ', user)
            return cb(null, user)
        } else {
            await db.query('UPDATE author SET last_login=CURRENT_TIMESTAMP where subject=$1', [cred.rows[0].subject], (err)=>{
               if (err) return cb(err)
            })
            try {
                const user = await db.query('SELECT author_name, subject FROM author WHERE subject=$1', [cred.rows[0].subject])
                if (!user) return cb(null, false);
                return cb(null, user.rows[0]);
            } catch (err) {
                return cb(err)
            }
        }
    } catch (err) {
        return cb(err)
    }
})
