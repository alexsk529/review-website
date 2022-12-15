import GoogleStrategy from 'passport-google-oidc';
import {db, Author} from '../db.js';
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
            const cred = await Author.findAll({
                where: {
                    provider: issuer,
                    subject: profile.id
                },
                raw: true
            })
            if (!cred) {
                try {
                    await Author.create({
                        author_name: profile.displayName,
                        email: profile.emails[0].value,
                        provider: issuer,
                        subject: profile.id
                    }) 
                } catch (err) {
                    return cb(err)
                }
                
                const user = {
                    subject: profile.id,
                    email: profile.emails[0].value,
                    role: 'user'
                }
                return cb(null, user)
            } else {
                try {
                    await Author.update({
                        last_login: db.literal('CURRENT_TIMESTAMP')
                    },{
                        where: {
                            subject: cred[0].subject
                        }
                    })
                    
                    const user = await Author.findAll({
                        attributes: ['email', 'subject', 'role'],
                        where: {
                            subject: cred[0].subject
                        },
                        raw: true
                    })
                    if (!user) return cb(null, false);
                    return cb(null, user[0]);

                } catch(err) {
                    return cb(err)
                }
            }
        } catch (err) {
            return cb(err)
        }
    }
)
