-- Hides booked items from visitors: only the admin can read them, which also keeps who booked an
-- item out of the public API.
drop policy "Anyone can read items" on public.items;

create policy "Anyone can read items that aren't booked"
  on public.items for select
  to anon, authenticated
  using (booked_by is null);

create policy "Admin can read all items"
  on public.items for select
  to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
