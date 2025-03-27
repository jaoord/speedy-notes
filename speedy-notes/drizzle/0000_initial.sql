CREATE TABLE IF NOT EXISTS "notebooks" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar(255) NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "notes" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" varchar(255) NOT NULL,
  "content" text NOT NULL,
  "notebook_id" uuid NOT NULL REFERENCES "notebooks"("id"),
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "tags" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar(50) NOT NULL UNIQUE,
  "created_at" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "note_tags" (
  "note_id" uuid NOT NULL REFERENCES "notes"("id"),
  "tag_id" uuid NOT NULL REFERENCES "tags"("id"),
  PRIMARY KEY ("note_id", "tag_id")
); 