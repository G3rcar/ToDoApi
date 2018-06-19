-- DATABASE NAME: todo_db

CREATE TABLE "public"."task" (
    "id" serial,
    "title" varchar(45),
    "description" varchar(255),
    "date" timestamp,
    "status" int,
    PRIMARY KEY ("id")
);
