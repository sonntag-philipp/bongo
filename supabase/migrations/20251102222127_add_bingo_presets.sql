create table
    presets (
        id uuid primary key default uuid_generate_v4 (),
        owner uuid not null references auth.users (id) on delete cascade,
        name text not null,
        created_at timestamp
        with
            time zone not null default now (),
            deleted_at timestamp
        with
            time zone
    );

create table
    preset_items (
        id uuid primary key default uuid_generate_v4 (),
        preset_id uuid not null references presets (id) on delete cascade,
        name text not null,
        description text
    );

alter table presets enable row level security;

alter table preset_items enable row level security;

create policy "Allow access to all rows in presets" on presets using (true);

create policy "Allow access to all rows in preset_items" on preset_items using (true);