import type { Draft } from "$lib/types/Draft";
import { db } from ".";

export const getDraftsFromDatabase = () => {
  const sql = "SELECT * FROM drafts";
  const statement = db.prepare(sql);
  return statement.all() as Draft[];
};

export const getDraftFromDatabase = (draftId: Draft["id"]) => {
  const sql = `SELECT * FROM drafts WHERE id=${draftId}`;
  const statement = db.prepare(sql);
  return statement.get() as Draft | undefined;
};

export const createDraftInDatabase = (
  title: Draft["title"],
  description: Draft["description"],
  body: Draft["body"]
) => {
  title = title.replaceAll("'", "''");
  description = description.replaceAll("'", "''");
  body = body.replaceAll("'", "''");

  const sql = `INSERT INTO drafts (title, description, body) VALUES ('${title}', '${description}', '${body}')`;
  const statement = db.prepare(sql);
  return statement.run();
};

export const deleteDraftFromDatabase = (draftId: Draft["id"]) => {
  const sql = `DELETE FROM drafts WHERE id=${draftId}`;
  const statement = db.prepare(sql);
  return statement.run();
};

export const updateDraftFromDatabase = (
  draftId: Draft["id"],
  title: Draft["title"],
  description: Draft["description"],
  body: Draft["body"]
) => {
  title = title.replaceAll("'", "''");
  description = description.replaceAll("'", "''");
  body = body.replaceAll("'", "''");

  const sql = `UPDATE drafts SET title='${title}', description='${description}', body='${body}' WHERE id=${draftId}`;
  const statement = db.prepare(sql);
  return statement.run();
};
