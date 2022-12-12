import {Router} from 'express';
import passport from 'passport';
import GoogleStrategy from '../auth-strategy/google.js'
import VkStrategy from '../auth-strategy/vkontakte.js'

const authRouter = Router();
passport.use(GoogleStrategy);
passport.use(VkStrategy);
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

authRouter.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}));
authRouter.get('/oauth2/redirect/google', passport.authenticate('google', { failureRedirect: '/', failureMessage: true }),
    function (req, res) {
        res.redirect(`/${req.user.email}`)
    })

authRouter.get('/vkontakte', passport.authenticate('vkontakte', {
    scope: ['email'],
    profileFields: ['email']
}));
authRouter.get('/vkontakte/callback',
    passport.authenticate('vkontakte', {
        failureRedirect: '/',
        failureMessage: true
    }),
    function (req, res) {
        res.redirect(`/${req.user.email}`)
    }
)

authRouter.post('/logout', (req, res, next) => {
    req.logout((err)=> {
        if (err) return next(err);
        res.redirect('/')
    })
})


export default authRouter