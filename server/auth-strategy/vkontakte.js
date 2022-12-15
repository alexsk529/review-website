import {Strategy as VkStrategy} from 'passport-vkontakte';
import {db, Author} from '../db.js';
import dotenv from 'dotenv';

dotenv.config()

export default new VkStrategy({
    clientID: process.env.VK_CLIENT_ID,
    clientSecret: process.env.VK_CLIENT_SECRET,
    callbackURL: '/api/auth/vkontakte/callback'
},
    async function verify(accessToken, refreshToken, params, profile, cb) {
        try {
            const cred = await Author.findAll({
                where: {
                    provider: profile.provider,
                    subject: String(profile.id)
                },
                raw: true
            })
            console.log(cred[0]);
            if (!cred) {
                try{
                    await Author.create({
                        author_name: profile.displayName,
                        email: profile.emails[0].value,
                        provider: profile.provider,
                        subject: profile.id
                    })
                } catch(e) {
                    return cb(e)
                }
                const user = {
                    subject: profile.id,
                    email: profile.emails[0].value,
                    role: 'user'
                }
                return cb(null, user)
            } else {
                try{ 
                    await Author.update({
                        last_login: db.literal('CURRENT_TIMESTAMP')
                    }, {
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
                    return cb(null, user[0])
                } catch(e) {
                    return cb(e)
                }
            }
        } catch (err) {
            return cb(err)
        }
    });