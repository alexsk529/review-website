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
                    email: profile.emails[0].value
                },
                raw: true
            })
            if (!(cred[0])) {
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
                console.log(user);
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
                    if (!(user[0])) return cb(null, false);
                    console.log(user[0]);
                    return cb(null, user[0])
                } catch(e) {
                    return cb(e)
                }
            }
        } catch (err) {
            return cb(err)
        }
    });