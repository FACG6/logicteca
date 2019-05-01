BEGIN;

INSERT INTO users (user_name,full_name,password,role) VALUES ('amin','Amin ALakhsham','123','Developer');
INSERT INTO users (user_name,full_name,password,role) VALUES ('israa','Israa Suliman','123','Scrum Master');
INSERT INTO users (user_name,full_name,password,role) VALUES ('ahmed','Ahmed Shatat','123','Developer');
INSERT INTO users (user_name,full_name,password,role) VALUES ('Angham116','Angham116','$2a$10$ELrdejLuU6uuCfHilqwr8OJ4JxqbEoVMyckfQjfjCg5K8j8qaka7y','Developer');

INSERT INTO projects (name,description) VALUES ('logicteca','Custom built task management system');
INSERT INTO projects (name,description) VALUES ('AMIDEAST','connecting students with our different programs has been a challenge');
INSERT INTO projects (name) VALUES ('Digital Cloud');

COMMIT;