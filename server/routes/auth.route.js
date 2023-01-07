import { Router } from 'express';
import passport from 'passport';

import GoogleStrategy from '../auth-strategy/google.js'
import VkStrategy from '../auth-strategy/vkontakte.js'

const authRouter = Router();
const redirectURL = process.env.FRONT_END_URL || 'http://localhost:3000';
passport.use(GoogleStrategy);
passport.use(VkStrategy);

passport.serializeUser((user, cb) => {
    process.nextTick(() => {
        console.log('serialize');
        cb(null, { email: user.email, id: user.subject, role: user.role })
    })
})

passport.deserializeUser((user, cb) => {
    process.nextTick(() => {
        console.log('deserialize');
        return cb(null, user);
    })
})

authRouter.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile'],
    prompt: 'select_account'
}));
authRouter.get('/oauth2/redirect/google',
    passport.authenticate('google', {
        failureRedirect: redirectURL,
        failureMessage: true,
        successRedirect: redirectURL
    }),
    function (req, res) {
        console.log('User: ', req.user);
        res.send('Thank you for signing in')
    })

authRouter.get('/vkontakte', passport.authenticate('vkontakte', {
    scope: ['email'],
    profileFields: ['email'],
}));
authRouter.get('/vkontakte/callback',
    passport.authenticate('vkontakte', {
        failureRedirect: redirectURL,
        failureMessage: true,
        successRedirect: redirectURL
    }),
    function (req, res) {
        console.log('User: ', req.user);
        res.send('Thank you for signing in')
    }
)

authRouter.post('/logout', async (req, res, next) => {
    req.logout(req.user, (err) => {
        if (err) return next(err);
    })
    res.clearCookie('connect.sid');
    res.send({ isAuth: req.isAuthenticated(), user: req.user })
})


export default authRouter