-- Hero slider slides (CMS-managed)
create table slides (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  cta_text text,
  cta_link text,
  image_url text,
  badge_text text,
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Site-wide content blocks
create table content_blocks (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,   -- e.g. 'hero_tagline', 'about_intro', 'cta_headline'
  value text not null,
  updated_at timestamptz default now()
);

-- Products listed in the CMS
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  image_url text,
  description text,
  tags text[],
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Dynamic landing pages
create table landing_pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,         -- e.g. 'black-pepper-offer'
  title text not null,
  meta_description text,
  hero_headline text,
  hero_subtext text,
  hero_image_url text,
  hero_badge text,                   -- e.g. 'New Arrival', 'Incoming Shipment'
  hero_cta_text text,
  content_blocks jsonb,              -- flexible rich content sections
  seo_title text,
  is_published boolean default false,
  show_chatbot boolean default true,
  show_inquiry_form boolean default true,
  expires_at timestamptz,            -- optional auto-expiry
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Inquiries from chatbot + contact form
create table inquiries (
  id uuid primary key default gen_random_uuid(),
  name text,
  company text,
  country text,
  email text,
  phone text,
  product_interest text,
  quantity text,
  message text,
  source text,                       -- 'chatbot' | 'contact_form' | 'landing_page'
  landing_page_slug text,
  status text default 'new',         -- 'new' | 'responded' | 'closed'
  created_at timestamptz default now()
);

-- Chatbot settings
create table chatbot_settings (
  id uuid primary key default gen_random_uuid(),
  is_enabled boolean default true,
  ai_provider text default 'openai', -- 'openai' | 'gemini'
  system_prompt text,
  escalation_whatsapp text,
  escalation_email text,
  updated_at timestamptz default now()
);
