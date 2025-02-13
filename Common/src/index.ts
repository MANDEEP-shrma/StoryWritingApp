import z from 'zod'


export const signupInputs = z.object({
  email:z.string().email(),
  password:z.string().min(6),
  name:z.string()
})

export const signinInputs = z.object({
  email:z.string().email(),
  password:z.string().min(6),
})

export const createblogInputs = z.object({
  title:z.string(),
  content:z.string(),
})


export const updateblogInputs = z.object({
  title:z.string(),
  content:z.string(),
  id:z.number()
})


export type SignupInput = z.infer<typeof signupInputs>
export type SigninInputs = z.infer<typeof signinInputs>
export type CreateBlogInputs = z.infer<typeof createblogInputs>
export type UpdateblogInputs = z.infer<typeof updateblogInputs>




