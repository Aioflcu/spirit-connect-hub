# Fix Google OAuth Signup/Login Error

## Steps:

- [x] 1. Plan approved by user
- [x] 2. Confirmed .env exists (cannot read contents for security) 
- [ ] 3. User enables Google provider in Supabase dashboard: https://supabase.com/dashboard/project/nqmdqczverhgzciqaurz/auth/providers
  - Toggle Google ON
  - Add Client ID/Secret from Google Cloud Console (https://console.cloud.google.com/apis/credentials)
  - Add Redirect URIs:
    * https://nqmdqczverhgzciqaurz.supabase.co/auth/v1/callback (production)
    * http://localhost:54321/auth/v1/callback (local dev)
- [ ] 4. Verify .env has:
```
VITE_SUPABASE_URL=https://nqmdqczverhgzciqaurz.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=[your anon/public key from dashboard settings → API]
```
  Restart dev server (`bun dev` / `npm run dev`) after .env changes
- [ ] 5. Test: http://localhost:5173/login → Click \"Continue with Google\"
- [ ] 6. Mark complete

## Status
**Waiting for Step 3** (dashboard config - takes ~5-10 min incl Google Cloud setup)

Once dashboard configured, reply \"Step 3 done\" to continue testing.

