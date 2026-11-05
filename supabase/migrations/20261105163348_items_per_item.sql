-- "за штуку" used to be stored as the item's tag. It is now its own flag, shown as a "per item" chip;
-- the tag stays for any other note.
alter table public.items add column per_item boolean not null default false;

update public.items set per_item = true, tag = null where tag = 'за штуку';
