const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const { IGNORE_ROUTERS, TOKEN_KEY } = require('./config/index')
const { checkToken } = require('./utils/index')
const menu = require('./routers/menu')
const user = require('./routers/user')
const role = require('./routers/role')
const upload = require('./routers/upload')

const app = new Koa()


const router = new Router()

router.use('/menu', menu)
router.use('/user', user)
router.use('/role', role)
router.use('/upload', upload)

app.use(bodyParser({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024   
    }
}))

app.use(checkToken(TOKEN_KEY, IGNORE_ROUTERS))
app.use(router.routes())


app.use(async (ctx, next) => {
    next()
    if (ctx.status === 404) {
        return ctx.body = {
            code: 404,
            msg: '404'
        }
    }
})


app.listen(3000, () => {
    console.log('[demo] route-use-middleware is starting at port 3000')
})