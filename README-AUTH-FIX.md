# Google OAuth Fix - No Supabase Access

## Problem
Lovable AI generated project uses remote Supabase (nqmdqczverhgzciqaurz) but Google provider **disabled**. No dashboard access.

## Solution 1: Local Supabase (Recommended)

### 1. Install Supabase CLI
```bash
npm install -g supabase
```

### 2. Start Local Supabase  
```bash
cd supabase
supabase start
```
Copy **local URL/an key** from output.

### 3. Enable Google in local (needs your Google OAuth app)
Update `supabase/config.toml`:
```
[auth]
external.google.enabled = true
external.google.client_id = \"YOUR_GOOGLE_CLIENT_ID\"
external.google.secret = \"YOUR_GOOGLE_CLIENT_SECRET\"
external.google.redirect_uris = [\"http://localhost:54321/auth/v1/callback\"]
```

### 4. Update `.env`
```
VITE_SUPABASE_URL=http://localhost:54321  # from supabase start output
VITE_SUPABASE_PUBLISHABLE_KEY=your_local_key
```

### 5. Test
```bash
npm run dev
```
→ http://localhost:5173/login → Google button works.

## Solution 2: Email/Password Only (Quick)
**Edit LoginPage.tsx/SignupPage.tsx:** Comment out Google buttons.

## Solution 3: Contact Lovable AI
Request Supabase dashboard access + Google configured.

## Next
Run Solution 1 or tell me preference!

