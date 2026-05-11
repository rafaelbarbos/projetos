create table users (
    id uuid primary key,
    username varchar(50) not null unique,
    display_name varchar(100) not null,
    email varchar(150) not null unique,
    password_hash varchar(255) not null,
    avatar varchar(255),
    bio text,
    verified boolean not null default false,
    followers_count bigint not null default 0,
    following_count bigint not null default 0,
    reputation bigint not null default 0,
    created_at timestamp not null,
    updated_at timestamp not null
);