CREATE FUNCTION public.update_community_links(_whatsapp text, _telegram text) RETURNS void LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
BEGIN
 IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Forbidden'; END IF;
 UPDATE public.community_links SET url = CASE id WHEN 'whatsapp' THEN _whatsapp ELSE _telegram END, updated_at = now() WHERE id IN ('whatsapp', 'telegram');
 IF NOT FOUND THEN RAISE EXCEPTION 'Missing community links'; END IF;
END;
$$;
REVOKE ALL ON FUNCTION public.update_community_links(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_community_links(text, text) TO authenticated;