import {Router} from 'express';
import passport from 'passport';
import GoogleStrategy from '../auth-strategy/google.js'
import VkStrategy from '../auth-strategy/vkontakte.js'

const authRouter = Router();
passport.use(GoogleStrategy);
passport.use(VkStrategy);
passport.serializeUser((user,cb) => {
    process.nextTick(()=> {
        cb(null, {email: user.email, id: user.subject, role: user.role})
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
authRouter.get('/oauth2/redirect/google', passport.authenticate('google', { failureRedirect: process.env.FRONT_END_URL || 'http://localhost:3000', failureMessage: true }),
    function (req, res) {
        res.redirect(process.env.FRONT_END_URL || 'http://localhost:3000')
    })

authRouter.get('/vkontakte', passport.authenticate('vkontakte', {
    scope: ['email'],
    profileFields: ['email']
})); 
authRouter.get('/vkontakte/callback',
    passport.authenticate('vkontakte', {
        failureRedirect: process.env.FRONT_END_URL || 'http://localhost:3000',
        failureMessage: true
    }),
    function (req, res) {
        res.redirect(process.env.FRONT_END_URL || 'http://localhost:3000')
    }
)

authRouter.post('/logout', async (req, res, next) => {
    req.logout(req.user, (err)=> {
        if (err) return next(err);
    })
    res.clearCookie('connect.sid');
    res.send({isAuth: req.isAuthenticated(), user: req.user})
    
})


export default authRouter