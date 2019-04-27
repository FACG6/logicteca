BEGIN;
DROP TABLE IF EXISTS users, users_projects, projects, scrums, tasks CASCADE;
DROP TYPE IF EXISTS act_type;

CREATE TABLE users (
    id SERIAL  PRIMARY KEY,
    user_name VARCHAR NOT NULL UNIQUE,
    full_name VARCHAR,
    password TEXT NOT NULL,
    role TEXT
);

CREATE TABLE projects(
    id SERIAL  PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    created_at date NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE users_projects(
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id),
    user_id INTEGER
);

CREATE TABLE scrums(
    id SERIAL  PRIMARY KEY,
    name VARCHAR NOT NULL, 
    project_id INTEGER REFERENCES projects(id) on delete CASCADE on update CASCADE
);

CREATE TYPE act_type AS ENUM ('DEVELOPPER', 'SCRUM MASTER', 'CLIENT');

CREATE TABLE tasks(
    id SERIAL  PRIMARY KEY,
    action_type act_type,
    status VARCHAR,
    modules VARCHAR,
    description TEXT,
    estimated_time float,
    spent_time float,
    priority float,
    initial_test_status VARCHAR,
    ticket TEXT,
    notes TEXT,
    total_efforts float,
    date_to_commit date,
    review_and_test_note TEXT, 
    scrum_id INTEGER REFERENCES scrums(id) on delete CASCADE on update CASCADE,
    assigned_to VARCHAR
);


COMMIT;