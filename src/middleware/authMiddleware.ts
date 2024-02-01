import express, { Request, Response, NextFunction } from "express";
import jwt, { GetPublicKeyOrSecret } from "jsonwebtoken";

const jwtSecret: string | undefined =
  process.env.JWT_SECRET_TOKEN || "change_your_jwt_secret";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const [bearer, token] = authorizationHeader.split(" ");
  if (bearer.toLowerCase() !== "bearer" || !token) {
    return res
      .status(401)
      .json({ message: "Invalid Authorization header format" });
  }

  // Check if jwtSecret is defined before using it
  if (jwtSecret !== undefined) {
    // Now, you can safely use jwtSecret without TypeScript complaining
    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) return res.status(403);
      req.user = user;
      next();
    });
  } else {
    console.error("JWT secret is undefined");
  }
}
