import {Strategy as VkStrategy} from 'passport-vkontakte';
import db from '../db.js';
import dotenv from 'dotenv';

dotenv.config()

export default new VkStrategy({
    clientID: process.env.VK_CLIENT_ID,
    clientSecret: process.env.VK_CLIENT_SECRET,
    callbackURL: '/api/auth/vkontakte/callback'
},
    async function verify(accessToken, refreshToken, params, profile, done) {
        console.log('params: ', params);
        console.log('profile: ', profile)
    });