create table posts (
    id uuid primary key,
    author_id uuid not null,
    content text not null,
    votes_gl bigint not null default 0,
    votes_rl bigint not null default 0,
    comments_count bigint not null default 0,
    created_at timestamp not null,
    updated_at timestamp not null,
    foreign key (author_id) references users(id) on delete cascade
);

create index idx_posts_author_id on posts(author_id);
create index idx_posts_created_at on posts(created_at desc);
