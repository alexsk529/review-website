import {Strategy as VkStrategy} from 'passport-vkontakte';
import {db} from '../db.js';
import dotenv from 'dotenv';

dotenv.config()

export default new VkStrategy({
    clientID: process.env.VK_CLIENT_ID,
    clientSecret: process.env.VK_CLIENT_SECRET,
    callbackURL: '/api/auth/vkontakte/callback'
},
    async function verify(accessToken, refreshToken, params, profile, cb) {
        try {
            const cred = await db.query('SELECT * FROM author WHERE provider = $1 AND subject = $2', [profile.provider, profile.id])
            if (!cred.rows[0]) {
                await db.query('INSERT INTO author(author_name, email, provider, subject) VALUES($1, $2, $3, $4)',
                    [profile.displayName, profile.emails[0].value, profile.provider, profile.id], (err) => {
                        if (err) return cb (err)
                    })

                const user = {
                    subject: profile.id,
                    email: profile.emails[0].value,
                    role: 'user'
                }
                return cb(null, user)
            } else {
                await db.query('UPDATE author SET last_login=CURRENT_TIMESTAMP where subject=$1', [cred.rows[0].subject], (err)=>{
                    if (err) return cb(err)
                })
                try {
                    const user = await db.query('SELECT email, subject, role FROM author WHERE subject=$1', [cred.rows[0].subject])
                    if (!user) return cb(null, false);
                    return cb(null, user.rows[0]);
                } catch (err) {
                    return cb(err)
                }
            }
        } catch (err) {
            return cb(err)
        }
    });