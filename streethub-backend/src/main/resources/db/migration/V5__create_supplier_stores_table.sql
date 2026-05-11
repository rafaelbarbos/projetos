create table supplier_stores (
    id uuid primary key,
    user_id uuid not null,
    name varchar(150) not null,
    platform varchar(20) not null,
    profile_url varchar(500) not null,
    description varchar(1000),
    created_at timestamp not null,
    updated_at timestamp not null,
    foreign key (user_id) references users(id) on delete cascade
);

create index idx_supplier_stores_user_id on supplier_stores(user_id);
create index idx_supplier_stores_platform on supplier_stores(platform);
