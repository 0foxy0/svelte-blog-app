import type { Session } from "$lib/types/Session";
import { db } from ".";
import { SessionCookieMaxAge } from "../constants";

const deleteExpiredSessionsFromDatabase = () => {
  const sql = `DELETE FROM sessions WHERE strftime('%s', 'now') - strftime('%s', timestamp) > ${SessionCookieMaxAge}`;
  const statement = db.prepare(sql);
  return statement.run();
};

export const getSessionFromDatabase = (sessionId: Session["id"]) => {
  deleteExpiredSessionsFromDatabase();

  sessionId = sessionId.replaceAll("'", "''");

  const sql = `SELECT * FROM sessions WHERE id='${sessionId}'`;
  const statement = db.prepare(sql);
  return statement.get() as Session | undefined;
};

export const createSessionInDatabase = (sessionId: Session["id"]) => {
  deleteExpiredSessionsFromDatabase();

  const currentISODateString = new Date().toISOString();
  sessionId = sessionId.replaceAll("'", "''");

  const sql = `INSERT INTO sessions (id, timestamp) VALUES ('${sessionId}', '${currentISODateString}')`;
  const statement = db.prepare(sql);
  return statement.run();
};

export const deleteSessionFromDatabase = (sessionId: Session["id"]) => {
  deleteExpiredSessionsFromDatabase();

  sessionId = sessionId.replaceAll("'", "''");

  const sql = `DELETE FROM sessions WHERE id='${sessionId}'`;
  const statement = db.prepare(sql);
  return statement.run();
};
