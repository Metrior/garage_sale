-- Marks an item someone has promised to buy. The app shows it only to the admin, but like the rest of
-- the row it is readable by anyone through the API.
alter table public.items add column booked boolean not null default false;
