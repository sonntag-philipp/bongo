INSERT INTO
    "auth"."users" (
        "instance_id",
        "id",
        "aud",
        "role",
        "email",
        "encrypted_password",
        "email_confirmed_at",
        "invited_at",
        "confirmation_token",
        "confirmation_sent_at",
        "recovery_token",
        "recovery_sent_at",
        "email_change_token_new",
        "email_change",
        "email_change_sent_at",
        "last_sign_in_at",
        "raw_app_meta_data",
        "raw_user_meta_data",
        "is_super_admin",
        "created_at",
        "updated_at",
        "phone",
        "phone_confirmed_at",
        "phone_change",
        "phone_change_token",
        "phone_change_sent_at",
        "confirmed_at",
        "email_change_token_current",
        "email_change_confirm_status",
        "banned_until",
        "reauthentication_token",
        "reauthentication_sent_at",
        "is_sso_user",
        "deleted_at",
        "is_anonymous"
    )
VALUES
    (
        '00000000-0000-0000-0000-000000000000',
        '3bc0bcba-0d33-4b1c-9109-afc6b20e03cb',
        'authenticated',
        'authenticated',
        'test@flyp.si',
        '$2a$10$elzbg1.qQhuHBJmns5L/Z.1/plQpzH0b3bEMfdsYI9sNtjGsoDGnS',
        '2025-11-02 23:17:59.369053+00',
        null,
        '',
        null,
        '',
        null,
        '',
        '',
        null,
        null,
        '{"provider":"email","providers":["email"]}',
        '{"email_verified":true}',
        null,
        '2025-11-02 23:17:59.363775+00',
        '2025-11-02 23:17:59.369333+00',
        null,
        null,
        '',
        '',
        null,
        '2025-11-02 23:17:59.369053+00',
        '',
        '0',
        null,
        '',
        null,
        'false',
        null,
        'false'
    );

INSERT INTO
    "public"."presets" ("id", "owner", "name", "created_at", "deleted_at")
VALUES
    (
        '31ba03c3-3ac8-4e51-adc7-deaf5d9a8846',
        '3bc0bcba-0d33-4b1c-9109-afc6b20e03cb',
        'Moodi Foodi',
        '2025-11-02 23:18:28.278999+00',
        null
    );

INSERT INTO
    "public"."preset_items" ("id", "preset_id", "name", "description")
VALUES
    (
        '1ff83e8d-f391-4be6-b4b7-75aa298abfa5',
        '31ba03c3-3ac8-4e51-adc7-deaf5d9a8846',
        'Mayonnaise à la truffe',
        'Es werden total fancy Saucen benutzt im Restaurant. Aber auch möglich wenn ein random Imbiss sich total toll findet, weil er einen fertigen Ketchup mit 3 TL Curry anreichert. (Hier bin ich mir nicht sicher lol)'
    ),
    (
        '3ca4a612-4e86-491b-abb8-e71cef908643',
        '31ba03c3-3ac8-4e51-adc7-deaf5d9a8846',
        'Berliner Schnack',
        'Berliner Schnack is’ dit, wenn man locker, frech und mit ’nem Augenzwinkern redet – direkt, ehrlich und ohne viel Gelaber. So wie die Berliner eben sind: Herz uff’m Mund und keen Blatt dazwischen.'
    ),
    (
        '3d4384e3-b3cf-4d89-a38c-b81bf6668fc2',
        '31ba03c3-3ac8-4e51-adc7-deaf5d9a8846',
        '10x Butter',
        'In das Essen wird extrem viel Butter bzw. Alternativen zu Butter gepackt.'
    ),
    (
        '60a15ed9-77fc-48b6-8fbd-02b0e921b279',
        '31ba03c3-3ac8-4e51-adc7-deaf5d9a8846',
        'Stück Kohle',
        'Das Essen sieht so aus wie ein Stück Steinkohle.'
    ),
    (
        '6dae560c-1a89-49af-8599-42cccf57ecba',
        '31ba03c3-3ac8-4e51-adc7-deaf5d9a8846',
        'Sauce direkt auf Pommes',
        'Die Sauce wird direkt auf die Pommes gepackt, auch wenn mehr Platz vorhanden wäre.'
    ),
    (
        '79dd6b67-7a25-48f3-8c1b-754060e2714a',
        '31ba03c3-3ac8-4e51-adc7-deaf5d9a8846',
        'Speisekarte in dämlich',
        'Die Preise oder Gerichte auf der Speisekarte wurden überklebt bzw. überschrieben weil niemand dran gedacht hat, dass sich die Preise oder das Angebot bald ändern könnten.'
    ),
    (
        '943d1108-a678-490b-a7ad-fdc7d454e17b',
        '31ba03c3-3ac8-4e51-adc7-deaf5d9a8846',
        'Veggie ist doof',
        'Auf der Karte gibt es keine nennenswerten vegetarischen Gerichte. Das wäre auch der Fall bei z.B. Five Guys.'
    ),
    (
        '9c240294-ee3c-4e86-bfcf-02c19690e52e',
        '31ba03c3-3ac8-4e51-adc7-deaf5d9a8846',
        'Obdachlose <3',
        'Die Besitzer oder Mitarbeiter spenden Obdachlosen ein Essen oder geben heiße Getränke etc. aus - oder verhalten sich generell sehr nett gegenüber Obdachlosen.'
    ),
    (
        'ba782ed9-2947-4e0f-95d0-9c1413e1415c',
        '31ba03c3-3ac8-4e51-adc7-deaf5d9a8846',
        'Alles für die Fans',
        'Das Restaurant "lohnt sich nicht". Der Betreiber macht alles aus "Liebe" zu seinen Kunden und weil "es ihm einfach Spaß macht".'
    ),
    (
        'c842272a-d17e-4f62-abce-e8947f226b69',
        '31ba03c3-3ac8-4e51-adc7-deaf5d9a8846',
        'Frau Schreiber kann nicht ruhig sein',
        'Eine Person in der Doku stellt sich selbst in den Mittelpunkt und nicht die Taten. Es werden irgendwelche Background Infos über Herrmann gegeben der vor 100 Jahren mal den Parkplatz vermietet hat auf dem der Cousin sein Auto gekauft hat.'
    ),
    (
        'cd5f651a-6ca0-4b75-bab8-69e354badb37',
        '31ba03c3-3ac8-4e51-adc7-deaf5d9a8846',
        'Gigantische Eimer',
        'Das Essen wird in großen Eimern von bspw. Bautzner durch die Gegend getragen.'
    ),
    (
        'd265ab78-3d77-4964-b088-143b7806c29a',
        '31ba03c3-3ac8-4e51-adc7-deaf5d9a8846',
        'Finanzamt macht Auge',
        'Das Restaurant benutzt keine Kassensysteme, akzeptiert kein EC oder schließt Kassensysteme nicht.'
    ),
    (
        'e1edab1d-fb91-4dcd-a71a-8302f952047b',
        '31ba03c3-3ac8-4e51-adc7-deaf5d9a8846',
        'Schaschlik Maschlik',
        'Das Restaurant hat einen sehr prägnanten Werbespruch für die Gerichte. Dieser kann auch wie beim Hamburger Fischmarkt gerufen werden.'
    ),
    (
        'e2bb9ad1-c7bf-495a-aa55-6b08bbeff704',
        '31ba03c3-3ac8-4e51-adc7-deaf5d9a8846',
        'Schwarze Handschuhe',
        'Die Person trägt die ganze Zeit (schwarze) Handschuhe, auch beim Annehmen/Herausgeben von Bargeld.'
    ),
    (
        'fbbaf55e-4a00-41cf-83d8-9ffa6543f660',
        '31ba03c3-3ac8-4e51-adc7-deaf5d9a8846',
        'Handarbeit sein Vadder',
        'Vermeintlich einfache Gerichte erfordern extrem viel Handarbeit die auch von den Protagonisten investiert wird.'
    ),
    (
        'fe515452-a7fe-4215-a39b-3dc80fddef01',
        '31ba03c3-3ac8-4e51-adc7-deaf5d9a8846',
        'Thermomix',
        'Es wird ein Thermomix in der Küche verwendet.'
    );