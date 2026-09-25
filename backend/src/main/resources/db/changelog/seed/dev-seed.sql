-- Development seed data, generated. Only runs with the Liquibase context 'dev'. All passwords: password123

INSERT INTO marketplace_user (username, email, password, country, display_items_from_other_country, created_at, updated_at)
VALUES ('tester', 'tester@example.com', '$2a$10$MrPBHahnKPc3HIzZykk7k.Bz92J1El2fIuTYm01lh2pa9yovqN1GK', 'CZ', true, now(), now())
ON CONFLICT DO NOTHING;

INSERT INTO marketplace_user (username, email, password, country, display_items_from_other_country, created_at, updated_at)
VALUES ('anna_novakova', 'anna.novakova@example.com', '$2a$10$MrPBHahnKPc3HIzZykk7k.Bz92J1El2fIuTYm01lh2pa9yovqN1GK', 'CZ', true, now(), now())
ON CONFLICT DO NOTHING;

INSERT INTO marketplace_user (username, email, password, country, display_items_from_other_country, created_at, updated_at)
VALUES ('petr_svoboda', 'petr.svoboda@example.com', '$2a$10$MrPBHahnKPc3HIzZykk7k.Bz92J1El2fIuTYm01lh2pa9yovqN1GK', 'CZ', true, now(), now())
ON CONFLICT DO NOTHING;

INSERT INTO marketplace_user (username, email, password, country, display_items_from_other_country, created_at, updated_at)
VALUES ('jana_kovacova', 'jana.kovacova@example.com', '$2a$10$MrPBHahnKPc3HIzZykk7k.Bz92J1El2fIuTYm01lh2pa9yovqN1GK', 'SK', true, now(), now())
ON CONFLICT DO NOTHING;

INSERT INTO marketplace_user (username, email, password, country, display_items_from_other_country, created_at, updated_at)
VALUES ('martin_horvath', 'martin.horvath@example.com', '$2a$10$MrPBHahnKPc3HIzZykk7k.Bz92J1El2fIuTYm01lh2pa9yovqN1GK', 'SK', true, now(), now())
ON CONFLICT DO NOTHING;

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Škoda Octavia 2.0 TDI', 'Kombi, 2016, 180 000 km, servisní knížka, nová STK.', 229000, 'CZK', 'transport', 'cars', 'used_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/10b981/ffffff/png?text=%C5%A0koda%20Octavia%202.0%20TDI',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '180 minutes', now() - interval '180 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '602 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Horské kolo Specialized Rockhopper', 'Velikost M, hydraulické brzdy, najeto málo.', 12500, 'CZK', 'transport', 'bicycles', 'used_very_good',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/3b82f6/ffffff/png?text=Horsk%C3%A9%20kolo%20Specialized%20Rockhopper',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '60 minutes', now() - interval '60 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '110 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Yamaha MT-07', '2019, 21 000 km, pravidelný servis, zimováno v garáži.', 149000, 'CZK', 'transport', 'motorcycles', 'used_very_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/f59e0b/ffffff/png?text=Yamaha%20MT-07',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '1800 minutes', now() - interval '1800 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '702 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Zimní pneu 205/55 R16', 'Sada 4 ks Michelin Alpin, vzorek 6 mm.', 3800, 'CZK', 'transport', 'tires_discs', 'used_good',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/ef4444/ffffff/png?text=Zimn%C3%AD%20pneu%20205%2F55%20R16',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '4200 minutes', now() - interval '4200 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '301 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Střešní box Thule 420 l', 'Včetně klíčů, drobné škrábance.', 5900, 'CZK', 'transport', 'car_accessories', 'used_good',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/8b5cf6/ffffff/png?text=St%C5%99e%C5%A1n%C3%AD%20box%20Thule%20420%20l',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '9000 minutes', now() - interval '9000 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '120 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Dětské kolo 20"', 'Pro věk 6–9 let, nové pláště.', 2400, 'CZK', 'transport', 'bicycles', 'used_fair',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/14b8a6/ffffff/png?text=D%C4%9Btsk%C3%A9%20kolo%2020%22',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '24000 minutes', now() - interval '24000 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '779 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'VW Golf VII 1.4 TSI', '2015, 132 000 km, 1. majitel, SR vozidlo.', 11900, 'EUR', 'transport', 'cars', 'used_very_good',
       u.email, '+421 905 555 555', 'https://placehold.co/600x400/10b981/ffffff/png?text=VW%20Golf%20VII%201.4%20TSI',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '1200 minutes', now() - interval '1200 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'martin_horvath'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'SK' AND postal_code = '010 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Nafukovací čln Intex', 'Pre 3 osoby, s veslami a pumpou.', 120, 'EUR', 'transport', 'boats', 'used_good',
       u.email, '+421 904 444 444', 'https://placehold.co/600x400/3b82f6/ffffff/png?text=Nafukovac%C3%AD%20%C4%8Dln%20Intex',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '36000 minutes', now() - interval '36000 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'jana_kovacova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'SK' AND postal_code = '949 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'iPhone 13 128 GB', 'Modrý, baterie 88 %, s krabicí a obalem.', 11900, 'CZK', 'electronics', 'mobile_phones', 'used_like_new',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/f59e0b/ffffff/png?text=iPhone%2013%20128%20GB',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '120 minutes', now() - interval '120 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '110 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Samsung Galaxy S22', 'Černý, 256 GB, drobné stopy používání.', 9500, 'CZK', 'electronics', 'mobile_phones', 'used_good',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/ef4444/ffffff/png?text=Samsung%20Galaxy%20S22',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '2880 minutes', now() - interval '2880 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '602 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'MacBook Air M1', '8 GB RAM, 256 GB SSD, 120 cyklů baterie.', 15900, 'CZK', 'electronics', 'laptops', 'used_like_new',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/8b5cf6/ffffff/png?text=MacBook%20Air%20M1',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '300 minutes', now() - interval '300 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '110 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Lenovo ThinkPad T14', 'Ryzen 5, 16 GB, 512 GB, Windows 11.', 13500, 'CZK', 'electronics', 'laptops', 'used_very_good',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/14b8a6/ffffff/png?text=Lenovo%20ThinkPad%20T14',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '5400 minutes', now() - interval '5400 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '500 02');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'iPad 9. generace', '64 GB, Wi-Fi, bez škrábanců.', 5800, 'CZK', 'electronics', 'tablets', 'used_like_new',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/10b981/ffffff/png?text=iPad%209.%20generace',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '12000 minutes', now() - interval '12000 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '460 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'PlayStation 5 s mechanikou', '2 ovladače a 3 hry.', 10900, 'CZK', 'electronics', 'gaming_consoles', 'used_very_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/3b82f6/ffffff/png?text=PlayStation%205%20s%20mechanikou',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '720 minutes', now() - interval '720 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '702 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Nintendo Switch OLED', 'Bílý, v záruce, s obalem.', 7200, 'CZK', 'electronics', 'gaming_consoles', 'new',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/f59e0b/ffffff/png?text=Nintendo%20Switch%20OLED',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '30 minutes', now() - interval '30 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '110 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Televize LG 55" OLED', 'Model C1, 4K, perfektní obraz.', 18900, 'CZK', 'electronics', 'tv_audio_video', 'used_very_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/ef4444/ffffff/png?text=Televize%20LG%2055%22%20OLED',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '18000 minutes', now() - interval '18000 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '370 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Fotoaparát Canon EOS 250D', 'Objektiv 18–55 mm, 8 000 snímků.', 9900, 'CZK', 'electronics', 'cameras', 'used_like_new',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/8b5cf6/ffffff/png?text=Fotoapar%C3%A1t%20Canon%20EOS%20250D',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '1560 minutes', now() - interval '1560 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '110 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Apple Watch Series 8', '45 mm, GPS, řemínek navíc.', 390, 'EUR', 'electronics', 'smart_watches', 'used_like_new',
       u.email, '+421 904 444 444', 'https://placehold.co/600x400/14b8a6/ffffff/png?text=Apple%20Watch%20Series%208',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '480 minutes', now() - interval '480 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'jana_kovacova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'SK' AND postal_code = '811 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Herný monitor Dell 27"', '165 Hz, QHD, bez vadných pixelov.', 210, 'EUR', 'electronics', 'pc_accessories', 'used_good',
       u.email, '+421 905 555 555', 'https://placehold.co/600x400/10b981/ffffff/png?text=Hern%C3%BD%20monitor%20Dell%2027%22',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '6000 minutes', now() - interval '6000 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'martin_horvath'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'SK' AND postal_code = '040 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Wi-Fi router TP-Link AX1800', 'Nepoužitý, v originálnom balení.', 55, 'EUR', 'electronics', 'network_devices', 'new',
       u.email, '+421 904 444 444', 'https://placehold.co/600x400/3b82f6/ffffff/png?text=Wi-Fi%20router%20TP-Link%20AX1800',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '42000 minutes', now() - interval '42000 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'jana_kovacova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'SK' AND postal_code = '821 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Rohová sedačka', 'Šedá, rozkládací, 260 × 180 cm.', 8500, 'CZK', 'household', 'furniture', 'used_good',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/f59e0b/ffffff/png?text=Rohov%C3%A1%20seda%C4%8Dka',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '3600 minutes', now() - interval '3600 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '602 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Jídelní stůl dub + 4 židle', 'Masiv, stůl 160 × 90 cm.', 6500, 'CZK', 'household', 'furniture', 'used_very_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/ef4444/ffffff/png?text=J%C3%ADdeln%C3%AD%20st%C5%AFl%20dub%20%2B%204%20%C5%BEidle',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '15000 minutes', now() - interval '15000 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '779 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Pračka Bosch 8 kg', 'Energetická třída A, 3 roky stará.', 5500, 'CZK', 'household', 'appliances', 'used_good',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/8b5cf6/ffffff/png?text=Pra%C4%8Dka%20Bosch%208%20kg',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '2160 minutes', now() - interval '2160 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '110 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Kávovar DeLonghi Magnifica', 'Plnoautomat, po odvápnění.', 4200, 'CZK', 'household', 'kitchen_appliances', 'used_very_good',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/14b8a6/ffffff/png?text=K%C3%A1vovar%20DeLonghi%20Magnifica',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '240 minutes', now() - interval '240 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '120 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Robotický vysavač Roborock', 'S mopem, mapování bytu.', 4900, 'CZK', 'household', 'cleaning_equipment', 'used_like_new',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/10b981/ffffff/png?text=Robotick%C3%BD%20vysava%C4%8D%20Roborock',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '6600 minutes', now() - interval '6600 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '301 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Stojací lampa IKEA', 'Výška 180 cm, teplá bílá.', 450, 'CZK', 'household', 'lighting', 'used_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/3b82f6/ffffff/png?text=Stojac%C3%AD%20lampa%20IKEA',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '30000 minutes', now() - interval '30000 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '400 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Šatníková skriňa', 'Biela, 2 dvere, 100 × 200 cm.', 90, 'EUR', 'household', 'furniture', 'used_fair',
       u.email, '+421 905 555 555', 'https://placehold.co/600x400/f59e0b/ffffff/png?text=%C5%A0atn%C3%ADkov%C3%A1%20skri%C5%88a',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '54000 minutes', now() - interval '54000 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'martin_horvath'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'SK' AND postal_code = '080 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Mikrovlnná rúra Samsung', '23 l, s grilom.', 45, 'EUR', 'household', 'kitchen_appliances', 'used_good',
       u.email, '+421 904 444 444', 'https://placehold.co/600x400/ef4444/ffffff/png?text=Mikrovlnn%C3%A1%20r%C3%BAra%20Samsung',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '900 minutes', now() - interval '900 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'jana_kovacova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'SK' AND postal_code = '811 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Sekačka Husqvarna', 'Benzínová, záběr 46 cm, samopojezd.', 4500, 'CZK', 'garden_workshop', 'machines_mowers', 'used_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/8b5cf6/ffffff/png?text=Seka%C4%8Dka%20Husqvarna',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '4800 minutes', now() - interval '4800 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '500 02');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Plynový gril Weber Spirit', '3 hořáky, s krytem.', 8900, 'CZK', 'garden_workshop', 'grills', 'used_very_good',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/14b8a6/ffffff/png?text=Plynov%C3%BD%20gril%20Weber%20Spirit',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '1080 minutes', now() - interval '1080 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '602 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Aku vrtačka Makita', '2 baterie, nabíječka, kufr.', 2900, 'CZK', 'garden_workshop', 'tools', 'used_good',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/10b981/ffffff/png?text=Aku%20vrta%C4%8Dka%20Makita',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '9600 minutes', now() - interval '9600 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '702 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Zahradní set ratan', 'Stůl a 4 křesla s polštáři.', 5200, 'CZK', 'garden_workshop', 'garden_furniture', 'used_very_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/3b82f6/ffffff/png?text=Zahradn%C3%AD%20set%20ratan',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '21000 minutes', now() - interval '21000 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '460 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Monstera deliciosa', 'Velká rostlina, cca 120 cm.', 800, 'CZK', 'garden_workshop', 'plants', 'used_like_new',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/f59e0b/ffffff/png?text=Monstera%20deliciosa',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '420 minutes', now() - interval '420 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '120 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Stavebné lešenie', 'Výška 4 m, kompletné.', 350, 'EUR', 'garden_workshop', 'building_materials', 'used_fair',
       u.email, '+421 905 555 555', 'https://placehold.co/600x400/ef4444/ffffff/png?text=Stavebn%C3%A9%20le%C5%A1enie',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '60000 minutes', now() - interval '60000 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'martin_horvath'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'SK' AND postal_code = '010 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Zimní bunda North Face', 'Pánská, velikost L, černá.', 2500, 'CZK', 'fashion', 'men', 'used_very_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/8b5cf6/ffffff/png?text=Zimn%C3%AD%20bunda%20North%20Face',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '1440 minutes', now() - interval '1440 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '110 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Šaty Zara', 'Velikost S, nenošené, s visačkou.', 600, 'CZK', 'fashion', 'women', 'new',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/14b8a6/ffffff/png?text=%C5%A0aty%20Zara',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '180 minutes', now() - interval '180 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '602 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Tenisky Nike Air Max', 'Velikost 42, nošené jednu sezónu.', 1400, 'CZK', 'fashion', 'footwear', 'used_good',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/10b981/ffffff/png?text=Tenisky%20Nike%20Air%20Max',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '3300 minutes', now() - interval '3300 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '779 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Kožená kabelka', 'Hnedá, pravá koža.', 60, 'EUR', 'fashion', 'bags', 'used_like_new',
       u.email, '+421 904 444 444', 'https://placehold.co/600x400/3b82f6/ffffff/png?text=Ko%C5%BEen%C3%A1%20kabelka',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '2400 minutes', now() - interval '2400 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'jana_kovacova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'SK' AND postal_code = '040 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Hodinky Casio G-Shock', 'Čierne, plne funkčné.', 70, 'EUR', 'fashion', 'jewelry_watches', 'used_good',
       u.email, '+421 905 555 555', 'https://placehold.co/600x400/f59e0b/ffffff/png?text=Hodinky%20Casio%20G-Shock',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '7800 minutes', now() - interval '7800 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'martin_horvath'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'SK' AND postal_code = '949 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Běžky Fischer + boty', 'Délka 190 cm, boty vel. 43.', 2200, 'CZK', 'sport_hobby', 'winter_sports', 'used_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/ef4444/ffffff/png?text=B%C4%9B%C5%BEky%20Fischer%20%2B%20boty',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '13200 minutes', now() - interval '13200 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '460 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Činky 2 × 20 kg', 'Nakládací, včetně kotoučů.', 1600, 'CZK', 'sport_hobby', 'fitness', 'used_good',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/8b5cf6/ffffff/png?text=%C4%8Cinky%202%20%C3%97%2020%20kg',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '600 minutes', now() - interval '600 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '110 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Stan Husky pro 4 osoby', 'Použitý dvakrát, kompletní.', 2900, 'CZK', 'sport_hobby', 'camping', 'used_like_new',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/14b8a6/ffffff/png?text=Stan%20Husky%20pro%204%20osoby',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '10800 minutes', now() - interval '10800 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '370 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Akustická kytara Yamaha', 'S obalem a ladičkou.', 2800, 'CZK', 'sport_hobby', 'musical_instruments', 'used_very_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/10b981/ffffff/png?text=Akustick%C3%A1%20kytara%20Yamaha',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '2700 minutes', now() - interval '2700 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '500 02');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Rybársky prút Shimano', '3 m, s navijakom.', 85, 'EUR', 'sport_hobby', 'fishing', 'used_good',
       u.email, '+421 905 555 555', 'https://placehold.co/600x400/3b82f6/ffffff/png?text=Ryb%C3%A1rsky%20pr%C3%BAt%20Shimano',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '4500 minutes', now() - interval '4500 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'martin_horvath'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'SK' AND postal_code = '080 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Futbalová lopta Adidas', 'Veľkosť 5, nová.', 25, 'EUR', 'sport_hobby', 'ball_games', 'new',
       u.email, '+421 904 444 444', 'https://placehold.co/600x400/f59e0b/ffffff/png?text=Futbalov%C3%A1%20lopta%20Adidas',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '360 minutes', now() - interval '360 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'jana_kovacova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'SK' AND postal_code = '821 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Lyže Atomic 170 cm', 'S viazaním, nabrúsené.', 150, 'EUR', 'sport_hobby', 'winter_sports', 'used_good',
       u.email, '+421 905 555 555', 'https://placehold.co/600x400/ef4444/ffffff/png?text=Ly%C5%BEe%20Atomic%20170%20cm',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '15600 minutes', now() - interval '15600 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'martin_horvath'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'SK' AND postal_code = '010 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Kočárek Cybex 2v1', 'Hluboká i sportovní část, pláštěnka.', 7500, 'CZK', 'children', 'strollers', 'used_very_good',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/8b5cf6/ffffff/png?text=Ko%C4%8D%C3%A1rek%20Cybex%202v1',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '840 minutes', now() - interval '840 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '110 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'LEGO Technic 42115', 'Lamborghini, kompletní s návodem.', 6500, 'CZK', 'children', 'toys', 'used_like_new',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/14b8a6/ffffff/png?text=LEGO%20Technic%2042115',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '1680 minutes', now() - interval '1680 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '602 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Autosedačka Britax Römer', '9–18 kg, Isofix.', 2200, 'CZK', 'children', 'car_seats', 'used_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/10b981/ffffff/png?text=Autoseda%C4%8Dka%20Britax%20R%C3%B6mer',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '19200 minutes', now() - interval '19200 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '301 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Detská postieľka', 'Drevená, s matracom.', 80, 'EUR', 'children', 'children_furniture', 'used_good',
       u.email, '+421 904 444 444', 'https://placehold.co/600x400/3b82f6/ffffff/png?text=Detsk%C3%A1%20postie%C4%BEka',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '27000 minutes', now() - interval '27000 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'jana_kovacova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'SK' AND postal_code = '811 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Škrabadlo pro kočky', 'Výška 150 cm, 3 patra.', 900, 'CZK', 'animals', 'cats', 'used_good',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/f59e0b/ffffff/png?text=%C5%A0krabadlo%20pro%20ko%C4%8Dky',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '3900 minutes', now() - interval '3900 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '702 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Pelíšek pro psa XL', 'Omyvatelný potah.', 700, 'CZK', 'animals', 'dogs', 'used_like_new',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/ef4444/ffffff/png?text=Pel%C3%AD%C5%A1ek%20pro%20psa%20XL',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '8400 minutes', now() - interval '8400 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '110 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Akvárium 120 l', 'S filtrom, osvetlením a ohrievačom.', 95, 'EUR', 'animals', 'aquarium', 'used_good',
       u.email, '+421 905 555 555', 'https://placehold.co/600x400/8b5cf6/ffffff/png?text=Akv%C3%A1rium%20120%20l',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '22800 minutes', now() - interval '22800 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'martin_horvath'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'SK' AND postal_code = '040 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Harry Potter 1–7', 'Kompletní série v češtině.', 1500, 'CZK', 'culture_education', 'books', 'used_good',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/14b8a6/ffffff/png?text=Harry%20Potter%201%E2%80%937',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '1320 minutes', now() - interval '1320 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '602 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Učebnice angličtiny Maturita', 'Nepopsané, aktuální vydání.', 350, 'CZK', 'culture_education', 'textbooks', 'used_like_new',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/10b981/ffffff/png?text=U%C4%8Debnice%20angli%C4%8Dtiny%20Maturita',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '10200 minutes', now() - interval '10200 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '779 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Vinylové desky - rock', 'Sbírka 30 LP.', 3000, 'CZK', 'culture_education', 'cds_dvds', 'used_good',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/3b82f6/ffffff/png?text=Vinylov%C3%A9%20desky%20-%20rock',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '48000 minutes', now() - interval '48000 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '120 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Obraz - olejomalba', 'Krajina, 60 × 80 cm, s rámem.', 2500, 'CZK', 'culture_education', 'posters_pictures', 'used_very_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/f59e0b/ffffff/png?text=Obraz%20-%20olejomalba',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '72000 minutes', now() - interval '72000 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '110 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, country, geom, created_at, updated_at)
SELECT 'Kuchárska kniha', 'Slovenská kuchyňa, nová.', 18, 'EUR', 'culture_education', 'books', 'new',
       u.email, '+421 904 444 444', 'https://placehold.co/600x400/ef4444/ffffff/png?text=Kuch%C3%A1rska%20kniha',
       u.id, l.id, l.country_code, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '3000 minutes', now() - interval '3000 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'jana_kovacova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'SK' AND postal_code = '949 01');
