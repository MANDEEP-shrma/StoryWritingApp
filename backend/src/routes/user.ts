import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupInputs, signinInputs } from "@lovermafia/medium-validation";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.get("/detail", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const authorId = "1";
  const user = await prisma.user.findFirst({
    where: {
      id: Number(authorId),
    },
    select: {
      email: true,
      name: true,
    },
  });

  return c.json({
    user,
  });
});

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInputs.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "The Inputs are wrong",
    });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      msg: `hello ${user.name}! You successfully signedup`,
      jwt,
    });
  } catch (e) {
    c.status(411);
    return c.text("The email is already registered with us");
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInputs.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "The Inputs are wrong",
    });
  }

  try {
    const getUser = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!getUser) {
      c.status(404);
      return c.text("User not found");
    }

    const jwt = await sign({ id: getUser.id }, c.env.JWT_SECRET);
    return c.json({
      msg: `hello ${getUser.name}! You successfully loggedIn`,
      jwt,
    });
  } catch (error) {
    c.status(403);
    c.text("Password is wrong");
  }
});
