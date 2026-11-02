-- Development seed data, generated. Only runs with the Liquibase context 'dev'. All passwords: password123

INSERT INTO marketplace_user (username, email, password, created_at, updated_at)
VALUES ('tester', 'tester@example.com', '$2a$10$MrPBHahnKPc3HIzZykk7k.Bz92J1El2fIuTYm01lh2pa9yovqN1GK', now(), now())
ON CONFLICT DO NOTHING;

INSERT INTO marketplace_user (username, email, password, created_at, updated_at)
VALUES ('anna_novakova', 'anna.novakova@example.com', '$2a$10$MrPBHahnKPc3HIzZykk7k.Bz92J1El2fIuTYm01lh2pa9yovqN1GK', now(), now())
ON CONFLICT DO NOTHING;

INSERT INTO marketplace_user (username, email, password, created_at, updated_at)
VALUES ('petr_svoboda', 'petr.svoboda@example.com', '$2a$10$MrPBHahnKPc3HIzZykk7k.Bz92J1El2fIuTYm01lh2pa9yovqN1GK', now(), now())
ON CONFLICT DO NOTHING;

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Škoda Octavia 2.0 TDI', 'Kombi, 2016, 180 000 km, servisní knížka, nová STK.', 229000, 'CZK', 'transport', 'cars', 'used_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/10b981/ffffff/png?text=%C5%A0koda%20Octavia%202.0%20TDI',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '180 minutes', now() - interval '180 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '602 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Horské kolo Specialized Rockhopper', 'Velikost M, hydraulické brzdy, najeto málo.', 12500, 'CZK', 'transport', 'bicycles', 'used_very_good',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/3b82f6/ffffff/png?text=Horsk%C3%A9%20kolo%20Specialized%20Rockhopper',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '60 minutes', now() - interval '60 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '110 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Yamaha MT-07', '2019, 21 000 km, pravidelný servis, zimováno v garáži.', 149000, 'CZK', 'transport', 'motorcycles', 'used_very_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/f59e0b/ffffff/png?text=Yamaha%20MT-07',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '1800 minutes', now() - interval '1800 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '702 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Zimní pneu 205/55 R16', 'Sada 4 ks Michelin Alpin, vzorek 6 mm.', 3800, 'CZK', 'transport', 'tires_discs', 'used_good',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/ef4444/ffffff/png?text=Zimn%C3%AD%20pneu%20205%2F55%20R16',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '4200 minutes', now() - interval '4200 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '301 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Střešní box Thule 420 l', 'Včetně klíčů, drobné škrábance.', 5900, 'CZK', 'transport', 'car_accessories', 'used_good',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/8b5cf6/ffffff/png?text=St%C5%99e%C5%A1n%C3%AD%20box%20Thule%20420%20l',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '9000 minutes', now() - interval '9000 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '120 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Dětské kolo 20"', 'Pro věk 6–9 let, nové pláště.', 2400, 'CZK', 'transport', 'bicycles', 'used_fair',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/14b8a6/ffffff/png?text=D%C4%9Btsk%C3%A9%20kolo%2020%22',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '24000 minutes', now() - interval '24000 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '779 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'iPhone 13 128 GB', 'Modrý, baterie 88 %, s krabicí a obalem.', 11900, 'CZK', 'electronics', 'mobile_phones', 'used_like_new',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/10b981/ffffff/png?text=iPhone%2013%20128%20GB',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '120 minutes', now() - interval '120 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '110 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Samsung Galaxy S22', 'Černý, 256 GB, drobné stopy používání.', 9500, 'CZK', 'electronics', 'mobile_phones', 'used_good',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/3b82f6/ffffff/png?text=Samsung%20Galaxy%20S22',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '2880 minutes', now() - interval '2880 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '602 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'MacBook Air M1', '8 GB RAM, 256 GB SSD, 120 cyklů baterie.', 15900, 'CZK', 'electronics', 'laptops', 'used_like_new',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/f59e0b/ffffff/png?text=MacBook%20Air%20M1',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '300 minutes', now() - interval '300 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '110 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Lenovo ThinkPad T14', 'Ryzen 5, 16 GB, 512 GB, Windows 11.', 13500, 'CZK', 'electronics', 'laptops', 'used_very_good',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/ef4444/ffffff/png?text=Lenovo%20ThinkPad%20T14',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '5400 minutes', now() - interval '5400 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '500 02');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'iPad 9. generace', '64 GB, Wi-Fi, bez škrábanců.', 5800, 'CZK', 'electronics', 'tablets', 'used_like_new',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/8b5cf6/ffffff/png?text=iPad%209.%20generace',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '12000 minutes', now() - interval '12000 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '460 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'PlayStation 5 s mechanikou', '2 ovladače a 3 hry.', 10900, 'CZK', 'electronics', 'gaming_consoles', 'used_very_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/14b8a6/ffffff/png?text=PlayStation%205%20s%20mechanikou',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '720 minutes', now() - interval '720 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '702 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Nintendo Switch OLED', 'Bílý, v záruce, s obalem.', 7200, 'CZK', 'electronics', 'gaming_consoles', 'new',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/10b981/ffffff/png?text=Nintendo%20Switch%20OLED',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '30 minutes', now() - interval '30 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '110 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Televize LG 55" OLED', 'Model C1, 4K, perfektní obraz.', 18900, 'CZK', 'electronics', 'tv_audio_video', 'used_very_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/3b82f6/ffffff/png?text=Televize%20LG%2055%22%20OLED',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '18000 minutes', now() - interval '18000 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '370 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Fotoaparát Canon EOS 250D', 'Objektiv 18–55 mm, 8 000 snímků.', 9900, 'CZK', 'electronics', 'cameras', 'used_like_new',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/f59e0b/ffffff/png?text=Fotoapar%C3%A1t%20Canon%20EOS%20250D',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '1560 minutes', now() - interval '1560 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '110 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Rohová sedačka', 'Šedá, rozkládací, 260 × 180 cm.', 8500, 'CZK', 'household', 'furniture', 'used_good',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/ef4444/ffffff/png?text=Rohov%C3%A1%20seda%C4%8Dka',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '3600 minutes', now() - interval '3600 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '602 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Jídelní stůl dub + 4 židle', 'Masiv, stůl 160 × 90 cm.', 6500, 'CZK', 'household', 'furniture', 'used_very_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/8b5cf6/ffffff/png?text=J%C3%ADdeln%C3%AD%20st%C5%AFl%20dub%20%2B%204%20%C5%BEidle',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '15000 minutes', now() - interval '15000 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '779 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Pračka Bosch 8 kg', 'Energetická třída A, 3 roky stará.', 5500, 'CZK', 'household', 'appliances', 'used_good',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/14b8a6/ffffff/png?text=Pra%C4%8Dka%20Bosch%208%20kg',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '2160 minutes', now() - interval '2160 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '110 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Kávovar DeLonghi Magnifica', 'Plnoautomat, po odvápnění.', 4200, 'CZK', 'household', 'kitchen_appliances', 'used_very_good',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/10b981/ffffff/png?text=K%C3%A1vovar%20DeLonghi%20Magnifica',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '240 minutes', now() - interval '240 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '120 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Robotický vysavač Roborock', 'S mopem, mapování bytu.', 4900, 'CZK', 'household', 'cleaning_equipment', 'used_like_new',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/3b82f6/ffffff/png?text=Robotick%C3%BD%20vysava%C4%8D%20Roborock',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '6600 minutes', now() - interval '6600 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '301 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Stojací lampa IKEA', 'Výška 180 cm, teplá bílá.', 450, 'CZK', 'household', 'lighting', 'used_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/f59e0b/ffffff/png?text=Stojac%C3%AD%20lampa%20IKEA',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '30000 minutes', now() - interval '30000 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '400 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Sekačka Husqvarna', 'Benzínová, záběr 46 cm, samopojezd.', 4500, 'CZK', 'garden_workshop', 'machines_mowers', 'used_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/ef4444/ffffff/png?text=Seka%C4%8Dka%20Husqvarna',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '4800 minutes', now() - interval '4800 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '500 02');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Plynový gril Weber Spirit', '3 hořáky, s krytem.', 8900, 'CZK', 'garden_workshop', 'grills', 'used_very_good',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/8b5cf6/ffffff/png?text=Plynov%C3%BD%20gril%20Weber%20Spirit',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '1080 minutes', now() - interval '1080 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '602 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Aku vrtačka Makita', '2 baterie, nabíječka, kufr.', 2900, 'CZK', 'garden_workshop', 'tools', 'used_good',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/14b8a6/ffffff/png?text=Aku%20vrta%C4%8Dka%20Makita',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '9600 minutes', now() - interval '9600 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '702 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Zahradní set ratan', 'Stůl a 4 křesla s polštáři.', 5200, 'CZK', 'garden_workshop', 'garden_furniture', 'used_very_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/10b981/ffffff/png?text=Zahradn%C3%AD%20set%20ratan',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '21000 minutes', now() - interval '21000 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '460 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Monstera deliciosa', 'Velká rostlina, cca 120 cm.', 800, 'CZK', 'garden_workshop', 'plants', 'used_like_new',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/3b82f6/ffffff/png?text=Monstera%20deliciosa',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '420 minutes', now() - interval '420 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '120 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Zimní bunda North Face', 'Pánská, velikost L, černá.', 2500, 'CZK', 'fashion', 'men', 'used_very_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/f59e0b/ffffff/png?text=Zimn%C3%AD%20bunda%20North%20Face',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '1440 minutes', now() - interval '1440 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '110 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Šaty Zara', 'Velikost S, nenošené, s visačkou.', 600, 'CZK', 'fashion', 'women', 'new',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/ef4444/ffffff/png?text=%C5%A0aty%20Zara',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '180 minutes', now() - interval '180 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '602 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Tenisky Nike Air Max', 'Velikost 42, nošené jednu sezónu.', 1400, 'CZK', 'fashion', 'footwear', 'used_good',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/8b5cf6/ffffff/png?text=Tenisky%20Nike%20Air%20Max',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '3300 minutes', now() - interval '3300 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '779 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Běžky Fischer + boty', 'Délka 190 cm, boty vel. 43.', 2200, 'CZK', 'sport_hobby', 'winter_sports', 'used_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/14b8a6/ffffff/png?text=B%C4%9B%C5%BEky%20Fischer%20%2B%20boty',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '13200 minutes', now() - interval '13200 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '460 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Činky 2 × 20 kg', 'Nakládací, včetně kotoučů.', 1600, 'CZK', 'sport_hobby', 'fitness', 'used_good',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/10b981/ffffff/png?text=%C4%8Cinky%202%20%C3%97%2020%20kg',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '600 minutes', now() - interval '600 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '110 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Stan Husky pro 4 osoby', 'Použitý dvakrát, kompletní.', 2900, 'CZK', 'sport_hobby', 'camping', 'used_like_new',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/3b82f6/ffffff/png?text=Stan%20Husky%20pro%204%20osoby',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '10800 minutes', now() - interval '10800 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '370 01');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Akustická kytara Yamaha', 'S obalem a ladičkou.', 2800, 'CZK', 'sport_hobby', 'musical_instruments', 'used_very_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/f59e0b/ffffff/png?text=Akustick%C3%A1%20kytara%20Yamaha',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '2700 minutes', now() - interval '2700 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '500 02');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Kočárek Cybex 2v1', 'Hluboká i sportovní část, pláštěnka.', 7500, 'CZK', 'children', 'strollers', 'used_very_good',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/ef4444/ffffff/png?text=Ko%C4%8D%C3%A1rek%20Cybex%202v1',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '840 minutes', now() - interval '840 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '110 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'LEGO Technic 42115', 'Lamborghini, kompletní s návodem.', 6500, 'CZK', 'children', 'toys', 'used_like_new',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/8b5cf6/ffffff/png?text=LEGO%20Technic%2042115',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '1680 minutes', now() - interval '1680 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '602 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Autosedačka Britax Römer', '9–18 kg, Isofix.', 2200, 'CZK', 'children', 'car_seats', 'used_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/14b8a6/ffffff/png?text=Autoseda%C4%8Dka%20Britax%20R%C3%B6mer',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '19200 minutes', now() - interval '19200 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '301 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Škrabadlo pro kočky', 'Výška 150 cm, 3 patra.', 900, 'CZK', 'animals', 'cats', 'used_good',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/10b981/ffffff/png?text=%C5%A0krabadlo%20pro%20ko%C4%8Dky',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '3900 minutes', now() - interval '3900 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '702 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Pelíšek pro psa XL', 'Omyvatelný potah.', 700, 'CZK', 'animals', 'dogs', 'used_like_new',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/3b82f6/ffffff/png?text=Pel%C3%AD%C5%A1ek%20pro%20psa%20XL',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '8400 minutes', now() - interval '8400 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '110 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Harry Potter 1–7', 'Kompletní série v češtině.', 1500, 'CZK', 'culture_education', 'books', 'used_good',
       u.email, '+420 602 222 222', 'https://placehold.co/600x400/f59e0b/ffffff/png?text=Harry%20Potter%201%E2%80%937',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '1320 minutes', now() - interval '1320 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'anna_novakova'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '602 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Učebnice angličtiny Maturita', 'Nepopsané, aktuální vydání.', 350, 'CZK', 'culture_education', 'textbooks', 'used_like_new',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/ef4444/ffffff/png?text=U%C4%8Debnice%20angli%C4%8Dtiny%20Maturita',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '10200 minutes', now() - interval '10200 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '779 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Vinylové desky - rock', 'Sbírka 30 LP.', 3000, 'CZK', 'culture_education', 'cds_dvds', 'used_good',
       u.email, '+420 601 111 111', 'https://placehold.co/600x400/8b5cf6/ffffff/png?text=Vinylov%C3%A9%20desky%20-%20rock',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '48000 minutes', now() - interval '48000 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'tester'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '120 00');

INSERT INTO item (name, description, price, currency, category, subcategory, condition, email, phone_number, image_url,
                  user_id, location_id, geom, created_at, updated_at)
SELECT 'Obraz - olejomalba', 'Krajina, 60 × 80 cm, s rámem.', 2500, 'CZK', 'culture_education', 'posters_pictures', 'used_very_good',
       u.email, '+420 603 333 333', 'https://placehold.co/600x400/14b8a6/ffffff/png?text=Obraz%20-%20olejomalba',
       u.id, l.id, ST_SetSRID(ST_MakePoint(l.longitude, l.latitude), 4326), now() - interval '72000 minutes', now() - interval '72000 minutes'
FROM marketplace_user u, location l
WHERE u.username = 'petr_svoboda'
  AND l.id = (SELECT min(id) FROM location WHERE country_code = 'CZ' AND postal_code = '110 00');
