CREATE TYPE public.app_role AS ENUM ('admin');
CREATE TABLE public.user_roles (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
 role public.app_role NOT NULL,
 UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own role" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE FUNCTION public.has_role(_user_id uuid, _role public.app_role) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
 SELECT EXISTS (SELECT 1 FROM public.user_roles r JOIN auth.users u ON u.id = r.user_id WHERE r.user_id = _user_id AND r.role = _role AND lower(u.email) = 'samir@gmail.com' AND u.email_confirmed_at IS NOT NULL);
$$;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
CREATE FUNCTION public.assign_link_admin() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
 IF lower(NEW.email) = 'samir@gmail.com' AND NEW.email_confirmed_at IS NOT NULL THEN
 INSERT INTO public.user_roles(user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING;
 END IF;
 RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.assign_link_admin() FROM PUBLIC;
CREATE TRIGGER assign_link_admin AFTER INSERT OR UPDATE OF email, email_confirmed_at ON auth.users FOR EACH ROW EXECUTE FUNCTION public.assign_link_admin();
CREATE TABLE public.community_links (
 id text PRIMARY KEY CHECK (id IN ('whatsapp', 'telegram')),
 url text NOT NULL CHECK (length(url) <= 2048 AND ((id = 'whatsapp' AND url ~ '^https://chat\.whatsapp\.com/[A-Za-z0-9]+$') OR (id = 'telegram' AND url ~ '^https://t\.me/[+A-Za-z0-9_-]+$'))),
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.community_links TO anon, authenticated;
GRANT UPDATE ON public.community_links TO authenticated;
GRANT ALL ON public.community_links TO service_role;
ALTER TABLE public.community_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public community links" ON public.community_links FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Only admin can update links" ON public.community_links FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
INSERT INTO public.community_links(id, url) VALUES ('whatsapp', 'https://chat.whatsapp.com/CCSoPjr7JgVHtg6rp75ZkZ'), ('telegram', 'https://t.me/+e10G7CD4bawxYjQ0');