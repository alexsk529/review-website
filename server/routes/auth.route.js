import {Router} from 'express';
import passport from 'passport';
import GoogleStrategyInstance from '../auth-strategy/google.js'

const authRouter = Router();
passport.use(GoogleStrategyInstance);
passport.serializeUser((user,cb) => {
    process.nextTick(()=> {
        cb(null, {username: user.author_name, id: user.subject})
    })
})

passport.deserializeUser((user, cb) => {
    process.nextTick(()=> {
        return cb(null, user);
    })
})

authRouter.get('/google', passport.authenticate('google'));
authRouter.get('/oauth2/redirect/google', passport.authenticate('google', { failureRedirect: '/', failureMessage: true }),
    function (req, res) {
        res.redirect(`/${req.user.subject}`)
    })

authRouter.get('/vkontakte', passport.authenticate('vkontakte'));
authRouter.get('/auth/vkontakte/callback',
    passport.authenticate('vkontakte', {
        failureRedirect: '/',
        failureMessage: true
    }),
    function (req, res) {
        res.redirect('/~' + req.user.username)
    }
)

export default authRouter