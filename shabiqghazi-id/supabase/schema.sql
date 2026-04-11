-- Jalankan di Supabase SQL Editor (atau migrasi) setelah project dibuat.
-- 1) Authentication: buat user di Dashboard > Authentication > Users (email/password).
-- 2) Sisipkan profil CMS untuk user tersebut (ganti UUID dan email):

-- INSERT INTO public.profiles (id, email, full_name, role)
-- VALUES ('<uuid-dari-auth-users>', 'you@example.com', 'Nama Anda', 'super_admin');

-- Bucket Storage: buat bucket bernama "media" (public) untuk gambar artikel, galeri, og image.
-- Policies storage (contoh public read + authenticated upload) bisa diset di Dashboard,
-- atau gunakan service role dari server Nuxt saja (tanpa upload dari browser ke Supabase langsung).

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'author')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  body JSONB NOT NULL DEFAULT '{"blocks":[]}'::jsonb,
  cover_url TEXT,
  cover_width INT,
  cover_height INT,
  category_id UUID REFERENCES public.categories (id) ON DELETE SET NULL,
  author_id UUID NOT NULL REFERENCES public.profiles (id) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  og_image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS articles_status_published_at_idx
  ON public.articles (status, published_at DESC NULLS LAST);

CREATE TABLE IF NOT EXISTS public.photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  slug TEXT,
  media_url TEXT NOT NULL,
  media_width INT,
  media_height INT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.about_page (
  id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  title TEXT NOT NULL DEFAULT 'Tentang',
  content JSONB NOT NULL DEFAULT '{"blocks":[]}'::jsonb,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  og_image_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO public.about_page (id, title, content)
VALUES (1, 'Tentang', '{"blocks":[]}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Kolom updated_at diisi oleh aplikasi (Nitro) saat PATCH.
