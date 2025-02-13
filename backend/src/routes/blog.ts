import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {verify} from 'hono/jwt'
import { createblogInputs,updateblogInputs } from "@lovermafia/medium-validation";

export const blogRouter= new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    },
    Variables:{
      userId:string
    }
}>()


//first we declare authentication middleware for our every request.
blogRouter.use("/*", async(c,next)=>{
  //extract the user id 
  //and we pass down it to the route handler
  try {
    const authHeader:string= c.req.header("authorization") || ""
    const token:string = authHeader?.split(' ')[1]
    const user = await verify(token,c.env.JWT_SECRET)
  
    if(!user){
      c.status(403)
      c.json({
      msg:"Access denied"
    })
  }
    c.set('userId',user.id as string)
    await next();  
  } catch (error) {
    c.status(411)
    c.json({
      msg:"The JWT Verification failed"
    })
  }
  
})


blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const {success} = createblogInputs.safeParse(body);
    if(!success){
      c.json({
        msg:"Format data in a correct way"
      })
    }
    const authorId = c.get("userId")
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    try {
      const blog = await prisma.blog.create({
        data:{
            title: body.title,
            content:body.content,
            authorId: parseInt(authorId)//comes from the middleware through jwt token
        }
      })
      return c.json({
        id:blog.id
      })  

    } catch (e) {
      c.status(411)
      return c.json({
        message:"Error while Fetching"
      })
    }
    
  })
  
  
blogRouter.put('/', async(c) => {
    
  const body = await c.req.json();
  const {success} = updateblogInputs.safeParse(body);
    if(!success){
      c.json({
        msg:"Format data in a correct way"
      })
    }
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  try {
    const blog = await prisma.blog.update({
      where:{
        id:body.id
      },
  
      data:{
          title: body.title,
          content:body.content,
      }
    })
    return c.json({
      id:blog.id
    })
  } catch (e) {
    c.status(411)
    c.json({
      message:"Error while Fetching"
    })
  }
  
})

  
blogRouter.get('/',async (c) => {
  const id =c.req.query('id');

  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  try {
    const blog = await prisma.blog.findFirst({
     
      where:{
        id:Number(id) //or you can use parseInt
      },

      select:{
        id:true,
        title:true,
        content:true,
        author:{
          select:{
            name:true
          }
        }
      }
    })
    
    return c.json({
      blog:blog
    })  
  } catch (e) {
    c.status(411)
    return c.json({
      message:"Error while Fetching"
    })
  }
  
})  
  
//Todo : Add pagination
blogRouter.get('/bulk',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())

    const blogs = await prisma.blog.findMany({
      select:{
        content:true,
        title:true,
        id:true,
        author:{
          select:{
            name:true
          }
        }
      }
    });

    return c.json({
      blogs
    })
  })
  