create table follows (
    id uuid primary key,
    follower_id uuid not null,
    following_id uuid not null,
    created_at timestamp not null,
    unique (follower_id, following_id),
    foreign key (follower_id) references users(id) on delete cascade,
    foreign key (following_id) references users(id) on delete cascade
);

create index idx_follows_follower_id on follows(follower_id);
create index idx_follows_following_id on follows(following_id);
