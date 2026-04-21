-- Initial Database Seed from HARVEN-Profil26b_compressed.pdf

-- Clear existing data if re-running
DELETE FROM slides;
DELETE FROM products;

-- Insert Hero Slides
INSERT INTO slides (title, subtitle, badge_text, cta_text, cta_link, image_url, sort_order)
VALUES 
(
  '<strong>Sourcing</strong> the<br/><em>World''s Best.</em>',
  'It is trust. It is consistency. It is a promise that travels across borders.',
  'UAE-Based · Global Trading · Est. 2024',
  'Explore Our Range',
  '/products',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80',
  1
),
(
  '<strong>Premium</strong> Spices<br/><em>& Commodities.</em>',
  'Direct from the source to your wholesale operations.',
  'Discover Quality',
  'View Products',
  '/products',
  'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1920&q=80',
  2
);

-- Insert PDF Products Matrix

-- SPICES
INSERT INTO products (name, category, image_url, description, tags, sort_order)
VALUES
('Cardamom', 'Spices', 'https://images.unsplash.com/photo-1615486511484-92e17244f77c?w=400&q=80', 'Premium Jumbo green cardamom pods sourced from high altitude farms.', ARRAY['Guatemala', 'India', 'Jumbo Size'], 1),
('Black Pepper', 'Spices', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80', 'High-quality Black Pepper, heavily sorted and cleaned with high ASTA values.', ARRAY['Vietnam', 'High ASTA'], 2),
('Coffee Beans', 'Spices', 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=400&q=80', 'Premium globally sourced coffee beans ready for industrial roasting.', ARRAY['Raw Beans', 'Vietnam', 'Origins'], 3),
('Cloves', 'Spices', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80', 'Long Cloves selected precisely to meet international consistency standards.', ARRAY['Long', 'Cambodia'], 4),
('Cinnamon', 'Spices', 'https://images.unsplash.com/photo-1532054245999-6e3e57fbd6c6?w=400&q=80', 'Authentic Cinnamon bark sourced from trusted South Asian partners.', ARRAY['Bark', 'Premium'], 5);

-- STAPLES & GRAINS
INSERT INTO products (name, category, image_url, description, tags, sort_order)
VALUES
('White Rice', 'Grains', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80', 'Multiple varieties of rice including Basmati and White broken rice.', ARRAY['5% Broken', 'Long Grain'], 6),
('Wheat', 'Grains', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80', 'High protein milling wheat suitable for continuous industrial processing.', ARRAY['Hard Red', 'High Protein'], 7);

-- FRESH PRODUCE
INSERT INTO products (name, category, image_url, description, tags, sort_order)
VALUES
('Coconuts', 'Fresh Produce', 'https://images.unsplash.com/photo-1526346282855-f5b244d2dccd?w=400&q=80', 'Raw and tender coconuts shipped globally with stringent freshness controls.', ARRAY['Raw', 'Tender'], 8),
('Mangoes & Avocados', 'Fresh Produce', 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&q=80', 'Fresh fruit assortments including avocados, apples, and passion fruit.', ARRAY['Seasonal', 'Global Origin'], 9);

-- DRY FRUITS & NUTS
INSERT INTO products (name, category, image_url, description, tags, sort_order)
VALUES
('Almonds', 'Dry Fruits', 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400&q=80', 'Nonpareil Californian almonds, packed for extended shelf life logistics.', ARRAY['California', 'Nonpareil'], 10),
('Cashews', 'Dry Fruits', 'https://images.unsplash.com/photo-1599905295058-29e3760492cb?w=400&q=80', 'W320 and W240 grade cashews ensuring consistent size and maximum crunch.', ARRAY['W320', 'Vietnam'], 11),
('Pistachios & Pecans', 'Dry Fruits', 'https://images.unsplash.com/photo-1562206898-1e42b2ab6213?w=400&q=80', 'Assortment including Brazil Nuts, Pine Nuts, Hazelnuts and Macadamia.', ARRAY['Bulk Deals', 'Premium Quality'], 12);

-- FROZEN PRODUCTS
INSERT INTO products (name, category, image_url, description, tags, sort_order)
VALUES
('Frozen Meats', 'Frozen', 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=400&q=80', 'Carefully handled frozen meats and food items meeting strict controls.', ARRAY['Regulated', 'Cold Chain'], 13);

-- SIGNATURE BRANDS
INSERT INTO signature_brands (name, tagline, description, origin, packaging, certification, moq, grade, image_url, accent, badge, cta_text, brand_type, sort_order)
VALUES
(
  'Black Stingless Bee Honey', 
  'Nature''s Rare Sweetness', 
  'Sourced from the untouched forests of Kerala, this rare honey is produced by stingless bees (Tetragonula iridipennis). Rich in antioxidants and enzymes, with a unique tangy-sweet profile.', 
  'Kerala, India', 
  '250g Glass Jar | 5kg Bulk Pail', 
  'Organic, FSSAI, Lab-Tested', 
  '50 units (retail) | 500kg (bulk)', 
  NULL, 
  '/brands/kerazone/honey.jpg', 
  'amber', 
  'Rare', 
  'Request Spec Sheet', 
  'KeraZone', 
  1
),
(
  'Kerala Green Cardamom', 
  'The Queen of Spices', 
  'Premium Alleppey Green Cardamom, hand-picked at peak maturity. Bold aroma, vibrant green pods, and high volatile oil content—perfect for gourmet food, beverages, and pharma applications.', 
  'Idukki, Kerala, India', 
  '1kg Vacuum Pack | 25kg Carton', 
  'ISO 22000, HACCP, Spice Board Approved', 
  '100kg', 
  '8mm+ Bold Pods', 
  '/brands/kerazone/cardamom.jpg', 
  'emerald', 
  'Export Grade', 
  'Inquire for Bulk Pricing', 
  'KeraZone', 
  2
),
(
  'Virgin Coconut Oil (1L)', 
  'Pure Goodness in Every Drop.', 
  'Our extra virgin coconut oil is cold-pressed from the finest Kerala coconuts. Unrefined, unbleached, and non-deodorized to maintain maximum nutritional value.', 
  'Kerala, India', 
  '1L Glass Bottle | 20L Bulk Drum', 
  'HACCP, GMP Certified', 
  '200 Litres', 
  NULL, 
  '/brands/kerazone/oil.jpg', 
  'forest', 
  NULL, 
  'Get Quote', 
  'KeraZone', 
  3
),
(
  'Mangozy', 
  'Pure Fruit Solutions', 
  '100% Premium Alphonso Mango Pulp. Unsweetened. Ideal for manufacturing & catering.', 
  'India', 
  '3.1 KG Bulk Format Can', 
  'Export Quality', 
  '1 Pallet', 
  '16° - 18° Brix Min', 
  '/brands/fiori/mangozy.jpg', 
  'terracotta', 
  'Bestseller', 
  'Partner with Fióri', 
  'Fiori', 
  4
);
