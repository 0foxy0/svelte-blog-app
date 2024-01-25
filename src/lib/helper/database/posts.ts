import type { Post } from "$lib/types/Post";
import { db } from ".";

export const getPostsFromDatabase = () => {
  const sql = "SELECT * FROM posts";
  const statement = db.prepare(sql);

  const posts = statement.all() as Post[];
  posts.sort((a, b) => {
    return a.date > b.date ? -1 : a.date > b.date ? 1 : 0;
  });

  return posts;
};

export const getPostFromDatabase = (postId: Post["id"]) => {
  const sql = `SELECT * FROM posts WHERE id=${postId}`;
  const statement = db.prepare(sql);
  return statement.get() as Post | undefined;
};

export const createPostInDatabase = (
  title: Post["title"],
  description: Post["description"],
  body: Post["body"]
) => {
  const currentISODateString = new Date().toISOString();
  title = title.replaceAll("'", "''");
  description = description.replaceAll("'", "''");
  body = body.replaceAll("'", "''");

  const sql = `INSERT INTO posts (date, title, description, body) VALUES ('${currentISODateString}', '${title}', '${description}', '${body}')`;
  const statement = db.prepare(sql);
  return statement.run();
};

export const deletePostFromDatabase = (postId: Post["id"]) => {
  const sql = `DELETE FROM posts WHERE id=${postId}`;
  const statement = db.prepare(sql);
  return statement.run();
};

export const updatePostFromDatabase = (
  postId: Post["id"],
  title: Post["title"],
  description: Post["description"],
  body: Post["body"]
) => {
  const currentISODateString = new Date().toISOString();
  title = title.replaceAll("'", "''");
  description = description.replaceAll("'", "''");
  body = body.replaceAll("'", "''");

  const sql = `UPDATE posts SET title='${title}', description='${description}', body='${body}', latestChangeDate='${currentISODateString}' WHERE id=${postId}`;
  const statement = db.prepare(sql);
  return statement.run();
};
