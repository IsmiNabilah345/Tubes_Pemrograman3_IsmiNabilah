import jwt from "jsonwebtoken";

const SECRET_KEY = "gudang-pintar-secret";

export const generateToken = (username: string, role: string) => {
  return jwt.sign(
    {
      username,
      role
    },
    SECRET_KEY,
    {
      expiresIn: "1h"
    }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};
