CREATE TABLE "support_pages" (
	"path" text PRIMARY KEY NOT NULL,
	"markdown" text NOT NULL,
	"html" text NOT NULL,
	"source_hash" text NOT NULL
);
