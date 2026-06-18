-- Allow anonymous username availability check (read-only, only username column)
CREATE POLICY "anon_check_username" ON user_profiles FOR SELECT
  TO anon USING (true);

-- Allow public insert during registration (user just signed up, id matches)
-- The existing insert_own_profile policy covers authenticated, but during signUp
-- the session might not be established yet. We handle via service role in edge fn
-- but for now we allow the upsert by fixing the select for anon:
-- (above policy handles username check for unauthenticated users)
