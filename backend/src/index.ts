import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'
const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  }
}>()

app.use(("/*"),cors())

app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);



export default app


/**
 * Routes that we are gonna create for this project
 * 1)POST /api/v1/user/signup
 * 2)POST /api/v1/user/singin
 * 3)POST /api/v1/blog
 * 4)PUT /api/v1/blog
 * 5)GET /api/v1/blog/:id
 * 6)GET /api/v1/blog/bulk
*/

