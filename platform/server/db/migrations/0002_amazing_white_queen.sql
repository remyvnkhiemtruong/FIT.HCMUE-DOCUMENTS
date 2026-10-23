CREATE TABLE "legacy_anchors" (
	"path" text NOT NULL,
	"id" text NOT NULL,
	CONSTRAINT "legacy_anchors_path_id_pk" PRIMARY KEY("path","id")
);
