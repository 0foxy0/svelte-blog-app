# Blog App

A blog web-app with Markdown based blogs and SQLite database!\
Created with svelte and TypeScript.

## create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

```bash
# start the server and open the app in a new browser tab
npm run dev -- --open
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Setup SQLite database

```
CREATE TABLE "drafts" (
	"id"	INTEGER NOT NULL UNIQUE,
	"title"	TEXT NOT NULL,
	"description"	TEXT NOT NULL,
	"body"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "posts" (
	"id"	INTEGER NOT NULL UNIQUE,
	"date"	TEXT NOT NULL CHECK(date LIKE '____-__-__T__:__:__.___Z'),
	"title"	TEXT NOT NULL,
	"description"	TEXT NOT NULL,
	"body"	TEXT NOT NULL,
	"latestChangeDate" TEXT CHECK(latestChangeDate LIKE '____-__-__T__:__:__.___Z'),
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "sessions" (
	"id"	TEXT NOT NULL UNIQUE,
	"timestamp"	TEXT NOT NULL CHECK(timestamp LIKE '____-__-__T__:__:__.___Z'),
	PRIMARY KEY("id")
);
```

## Environment Variables

> see [.env.example](./.env.example)

- ADMIN_USERNAME
- ADMIN_PASSWORD
- API_AUTHORIZATION
- DB_PATH

## Queued ToDo's

- Content editor toolbar actions
- Blog article search on home page
- Views count of Blog articles
- Allow pictures in blog posts
- Legal Notice page (/legal-notice)
- Privacy Policy page (/privacy-policy)
