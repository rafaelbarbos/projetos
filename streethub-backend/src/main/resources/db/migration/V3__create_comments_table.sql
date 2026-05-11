create table comments (
    id uuid primary key,
    post_id uuid not null,
    author_id uuid not null,
    content text not null,
    votes_gl bigint not null default 0,
    votes_rl bigint not null default 0,
    created_at timestamp not null,
    updated_at timestamp not null,
    foreign key (post_id) references posts(id) on delete cascade,
    foreign key (author_id) references users(id) on delete cascade
);

create index idx_comments_post_id on comments(post_id);
create index idx_comments_author_id on comments(author_id);
create index idx_comments_created_at on comments(created_at desc);
