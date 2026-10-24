<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Community links live in Cloud and are read through a public server function so changes require no republish; only role-checked authenticated updates are allowed.
- Admin permissions live in user_roles and are assigned only after the owner email is verified; recheck current verified email in has_role to prevent stale privileges after email changes.
- Admin and auth pages use separate routes; the authenticated layout gates UI while every write independently checks authorization and RLS.
