-- Items for sale and their photos. Anyone can read them; only the admin can add, edit or delete.
--
-- The admin is any user whose app_metadata has "role": "admin". app_metadata can only be changed
-- with the secret key or SQL, never by the signed-in user, so it is safe to trust in these rules:
--   update auth.users set raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}' where email = '...';

create table public.items (
  -- Imported items keep their readable ids from items.json so visitors' saved carts still match.
  id text primary key default gen_random_uuid()::text,
  title text not null check (length(trim(title)) > 0),
  description text not null default '',
  price integer not null check (price >= 0), -- whole shekels
  tag text, -- optional note shown under the price, e.g. "за штуку"
  -- Photo keys in display order; the first is the cover. See src/utils/photoFiles.ts for the storage paths.
  images text[] not null check (cardinality(images) > 0),
  created_at timestamptz not null default now()
);

alter table public.items enable row level security;

grant select on public.items to anon, authenticated;
grant insert, update, delete on public.items to authenticated;

create policy "Anyone can read items"
  on public.items for select
  to anon, authenticated
  using (true);

create policy "Admin can add items"
  on public.items for insert
  to authenticated
  with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admin can edit items"
  on public.items for update
  to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admin can delete items"
  on public.items for delete
  to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Public bucket: anyone can view a photo by its URL, but there is no policy that lets visitors
-- list the bucket. Photos are always re-encoded (WebP, or JPEG from browsers that can't make WebP)
-- before upload, which also strips metadata such as GPS location.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('item-photos', 'item-photos', true, 5242880, array['image/webp', 'image/jpeg']);

create policy "Admin can see item photos"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'item-photos' and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admin can upload item photos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'item-photos' and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admin can delete item photos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'item-photos' and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
