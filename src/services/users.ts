import { db } from "../db/database.js";

type UserRow = {
  id: string;
  username: string;
  password: string;
  role: string;
  created_at: string;
};

export const findUserByUsername = (
  username: string
) => {
  return db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get(username) as UserRow | undefined;
};

export const createUser = (
  id: string,
  username: string,
  password: string,
  role = "user"
) => {
  db.prepare(`
    INSERT INTO users (
      id,
      username,
      password,
      role,
      created_at
    )
    VALUES (?, ?, ?, ?, ?)
  `).run(
    id,
    username,
    password,
    role,
    new Date().toISOString()
  );
};

export const updateUserRole = (
  username: string,
  role: string
) => {
  db.prepare(
    `
    UPDATE users
    SET role = ?
    WHERE username = ?
    `
  ).run(role, username);
};