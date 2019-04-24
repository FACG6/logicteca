BEGIN;
DROP TABLE IF EXISTS users, users_projects, projects, scrums, tasks CASCADE;
DROP TYPE IF EXISTS act_type;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    id uuid DEFAULT uuid_generate_v4(),
    user_name VARCHAR NOT NULL,
    full_name VARCHAR,
    password TEXT NOT NULL,
    role TEXT,
    PRIMARY KEY(id)
);

CREATE TABLE projects(
    id uuid DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    description TEXT,
    created_at date NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY(id)
);

CREATE TABLE users_projects(
    id uuid DEFAULT uuid_generate_v4(),
    project_id uuid REFERENCES projects(id),
    user_id uuid REFERENCES users(id),
    PRIMARY KEY(id)
);

CREATE TABLE scrums(
    id uuid DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL, 
    project_id uuid REFERENCES projects(id),
    PRIMARY KEY(id)
);

CREATE TYPE act_type AS ENUM ('DEVELOPPER, SCRUM MASTER', 'CLIENT');

CREATE TABLE tasks(
    id uuid DEFAULT uuid_generate_v4(),
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
    scrum_id uuid REFERENCES scrums(id),
    assigned_to uuid REFERENCES users(id),
    PRIMARY KEY(id)
);

INSERT INTO users (user_name,full_name,password,role) VALUES ('amin','Amin ALakhsham','123','Developer');
INSERT INTO users (user_name,full_name,password,role) VALUES ('israa','Israa Suliman','123','Scrum');
INSERT INTO users (user_name,full_name,password,role) VALUES ('ahmed','Ahmed Shatat','123','Developer');

INSERT INTO projects (name,description) VALUES ('logicteca','Custom built task management system');
INSERT INTO projects (name,description) VALUES ('AMIDEAST','connecting students with our different programs has been a challenge');
INSERT INTO projects (name) VALUES ('Digital Cloud');

COMMIT;