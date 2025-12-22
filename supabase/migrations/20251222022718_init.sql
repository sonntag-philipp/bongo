create table
    public.board_presets (
        id uuid not null default extensions.uuid_generate_v4 (),
        owner uuid not null,
        name text not null,
        created_at timestamp
        with
            time zone not null default now (),
            deleted_at timestamp
        with
            time zone null,
            slug text null,
            description text null,
            constraint presets_pkey primary key (id),
            constraint board_presets_slug_key unique (slug),
            constraint presets_owner_fkey foreign KEY (owner) references auth.users (id) on delete CASCADE
    ) TABLESPACE pg_default;

create table
    public.board_preset_items (
        id uuid not null default extensions.uuid_generate_v4 (),
        preset_id uuid not null,
        name text not null,
        description text null,
        constraint preset_items_pkey primary key (id),
        constraint preset_items_preset_id_fkey foreign KEY (preset_id) references board_presets (id) on delete CASCADE
    ) TABLESPACE pg_default;