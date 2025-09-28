CREATE TABLE users (
    id serial primary key,
    username varchar(255) not null,
    password varchar(255) not null,
    token varchar(255) default null,
    expires_at timestamp default null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

INSERT INTO users (username, password)
VALUES ('admin', 'password');