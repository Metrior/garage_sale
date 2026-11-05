-- Replaces the booked flag with who the item is booked by; an item is booked when this is set.
-- The app shows it only to the admin, but like the rest of the row it is readable by anyone through the API.
alter table public.items add column booked_by text check (length(trim(booked_by)) > 0);

update public.items set booked_by = '@metrior' where booked;

alter table public.items drop column booked;
