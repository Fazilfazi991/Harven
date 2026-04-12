import React from 'react'
import Link from 'next/link'
import { ArrowRight, Leaf, Shield, Award, Zap, Beaker, Package, MapPin, CheckCircle2 } from 'lucide-react'

export const metadata = {
  title: 'Our Signature Brands | HARVEN Exclusive',
  description: 'Explore HARVEN’s exclusive portfolio of premium food brands: KeraZone and Fióri. Sourced from the lush landscapes of India.',
}

interface ProductSpec {
  origin: string;
  packaging?: string;
  certification?: string;
  moq?: string;
  grade?: string;
}

interface BrandProduct {
  name: string;
  tagline: string;
  description: string;
  specs: ProductSpec;
  image: string;
  accent: 'amber' | 'emerald' | 'forest' | 'terracotta';
  badge?: string;
  ctaText: string;
}

export default function BrandsPage() {
  const kerazoneProducts: BrandProduct[] = [
    {
      name: "Black Stingless Bee Honey",
      tagline: "Nature's Rare Sweetness",
      description: "Sourced from the untouched forests of Kerala, this rare honey is produced by stingless bees (Tetragonula iridipennis). Rich in antioxidants and enzymes, with a unique tangy-sweet profile.",
      specs: {
        origin: "Kerala, India",
        packaging: "250g Glass Jar | 5kg Bulk Pail",
        certification: "Organic, FSSAI, Lab-Tested",
        moq: "50 units (retail) | 500kg (bulk)"
      },
      image: "/brands/kerazone/honey.jpg",
      accent: "amber",
      badge: "Rare",
      ctaText: "Request Spec Sheet"
    },
    {
      name: "Kerala Green Cardamom",
      tagline: "The Queen of Spices",
      description: "Premium Alleppey Green Cardamom, hand-picked at peak maturity. Bold aroma, vibrant green pods, and high volatile oil content—perfect for gourmet food, beverages, and pharma applications.",
      specs: {
        origin: "Idukki, Kerala, India",
        grade: "8mm+ Bold Pods",
        packaging: "1kg Vacuum Pack | 25kg Carton",
        certification: "ISO 22000, HACCP, Spice Board Approved",
        moq: "100kg"
      },
      image: "/brands/kerazone/cardamom.jpg",
      accent: "emerald",
      badge: "Export Grade",
      ctaText: "Inquire for Bulk Pricing"
    },
    {
      name: "Virgin Coconut Oil (1L)",
      tagline: "Pure Goodness in Every Drop.",
      description: "Our extra virgin coconut oil is cold-pressed from the finest Kerala coconuts. Unrefined, unbleached, and non-deodorized to maintain maximum nutritional value.",
      specs: {
        origin: "Kerala, India",
        packaging: "1L Glass Bottle | 20L Bulk Drum",
        certification: "HACCP, GMP Certified",
        moq: "200 Litres"
      },
      image: "/brands/kerazone/coconut-oil.jpg",
      accent: "forest",
      ctaText: "Get Quote"
    }
  ];

  return (
    <div className="bg-cream min-h-screen selection:bg-forest/10">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(139,175,124,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="section-tag animate-in fade-in slide-in-from-bottom-4 duration-700">HARVEN Exclusive</span>
          <h1 className="font-display text-[clamp(2.8rem,6vw,5rem)] font-normal text-text-dark leading-[1.05] mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Nature’s Finest, <br />
            <strong className="font-semibold italic text-forest">Curated by HARVEN.</strong>
          </h1>
          <p className="section-sub mx-auto mb-10 text-lg opacity-90 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Introducing our exclusive portfolio of premium food brands. Sourced from the lush landscapes of India and processed with uncompromising quality.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <Link href="#kerazone" className="bg-forest text-white px-8 py-4 rounded-full font-medium text-[0.9rem] flex items-center gap-2 transition-all hover:bg-forest-deep hover:-translate-y-1 shadow-lg shadow-forest/10">
              View KeraZone <ArrowRight size={18} />
            </Link>
            <Link href="#fiori" className="bg-white border border-cream-dark text-text-dark px-8 py-4 rounded-full font-medium text-[0.9rem] transition-all hover:bg-cream-warm hover:-translate-y-1">
              Explore Fióri
            </Link>
          </div>
        </div>
      </section>

      {/* BRAND BLOCK A: KERAZONE */}
      <section id="kerazone" className="py-20 lg:py-32 px-6 lg:px-16 bg-white border-y border-cream-dark scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center mb-20">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-sage/10 flex items-center justify-center text-forest">
                  <Leaf size={24} />
                </div>
                <span className="font-mono text-sm tracking-widest uppercase text-forest font-bold">Kerala Heritage</span>
              </div>
              <h2 className="font-display text-4xl lg:text-6xl font-semibold text-text-dark mb-6">
                KeraZone – <br />
                <span className="text-forest">Pure Goodness</span> from Kerala
              </h2>
              <p className="text-text-muted text-lg leading-relaxed mb-8 font-light">
                Rooted in the biodiversity of Kerala, KeraZone brings you nature’s most potent ingredients. From our signature Virgin Coconut Oil to rare Stingless Bee Honey, every product tells a story of conservation and purity.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Shield className="text-forest" size={20} />
                  <h4 className="font-medium text-text-dark">Ethically Sourced</h4>
                  <p className="text-xs text-text-muted">Direct from local Kerala farmers.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Award className="text-forest" size={20} />
                  <h4 className="font-medium text-text-dark">Export Quality</h4>
                  <p className="text-xs text-text-muted">Meets international food standards.</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 h-auto lg:h-[600px]">
              <div className="bg-cream rounded-[32px] overflow-hidden relative group shadow-sm border border-cream-dark h-[300px] lg:h-full">
                <img src="https://images.unsplash.com/photo-1620215175664-cb6e9e30ba97?w=800&q=80" alt="Kerala Landscape" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent flex flex-col justify-end p-8">
                  <span className="text-white/80 font-mono text-[0.6rem] uppercase tracking-[0.2em] mb-2">Sustainable Farming</span>
                  <h3 className="text-white font-display text-2xl lg:text-3xl leading-tight">Preserving Natural <br />Biodiversity</h3>
                </div>
              </div>
              <div className="grid grid-rows-2 gap-4 lg:gap-6">
                <div className="bg-cream rounded-[32px] overflow-hidden relative group shadow-sm border border-cream-dark h-[200px] lg:h-full">
                  <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80" alt="Spices" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-terracotta/50 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white font-display text-xl">The King of Spices</h3>
                  </div>
                </div>
                <div className="bg-forest rounded-[32px] p-8 flex flex-col justify-center text-white relative overflow-hidden group h-[200px] lg:h-full">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150" />
                  <h3 className="font-display text-2xl mb-4 relative z-10">Premium Supply</h3>
                  <p className="text-sm text-white/70 leading-relaxed relative z-10">Bulk allocations secured directly from farm cooperatives.</p>
                  <Link href="/contact" className="mt-6 text-white text-sm font-medium flex items-center gap-2 relative z-10 group/link">
                    Download Brand Profile <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            {kerazoneProducts.map((product, idx) => (
              <div key={idx} className="bg-white border border-cream-dark rounded-[32px] overflow-hidden transition-all duration-500 hover:shadow-[0_24px_80px_rgba(45,90,61,0.08)] hover:-translate-y-2 group flex flex-col">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover saturate-[0.8] group-hover:saturate-100 transition-all duration-700 group-hover:scale-105" />
                  {product.badge && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-widest text-text-dark shadow-sm">
                      {product.badge}
                    </div>
                  )}
                  <div className={`absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>
                
                <div className="p-8 flex-grow flex flex-col">
                  <div className="mb-6">
                    <h3 className="font-display text-2xl font-semibold text-text-dark mb-2">{product.name}</h3>
                    <p className={`text-sm font-medium italic mb-4 ${
                      product.accent === 'amber' ? 'text-amber-700' : 
                      product.accent === 'emerald' ? 'text-emerald-700' : 
                      'text-forest'
                    }`}>{product.tagline}</p>
                    <p className="text-text-muted text-[0.85rem] leading-relaxed line-clamp-2">{product.description}</p>
                  </div>

                  {/* Specs Table */}
                  <div className="space-y-3 mb-8 pt-6 border-t border-cream-dark/50">
                    <div className="flex justify-between items-center text-[0.7rem] uppercase tracking-wider font-mono">
                      <span className="text-text-muted flex items-center gap-1.5"><MapPin size={12} /> Origin</span>
                      <span className="text-text-dark font-semibold">{product.specs.origin}</span>
                    </div>
                    {product.specs.grade && (
                      <div className="flex justify-between items-center text-[0.7rem] uppercase tracking-wider font-mono">
                        <span className="text-text-muted flex items-center gap-1.5"><Shield size={12} /> Grade</span>
                        <span className="text-text-dark font-semibold">{product.specs.grade}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-[0.7rem] uppercase tracking-wider font-mono">
                      <span className="text-text-muted flex items-center gap-1.5"><Package size={12} /> Packaging</span>
                      <span className="text-text-dark font-semibold text-right max-w-[150px]">{product.specs.packaging}</span>
                    </div>
                    <div className="flex justify-between items-center text-[0.7rem] uppercase tracking-wider font-mono">
                      <span className="text-text-muted flex items-center gap-1.5"><CheckCircle2 size={12} /> Certificate</span>
                      <span className="text-text-dark font-semibold text-right max-w-[150px]">{product.specs.certification}</span>
                    </div>
                    <div className="flex justify-between items-center text-[0.7rem] uppercase tracking-wider font-mono pt-2 border-t border-dashed border-cream-dark">
                      <span className="text-forest flex items-center gap-1.5 font-bold">MOQ</span>
                      <span className="text-forest font-bold">{product.specs.moq}</span>
                    </div>
                  </div>

                  <Link 
                    href="/contact" 
                    className={`mt-auto w-full py-4 rounded-full text-center text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                      product.accent === 'amber' ? 'bg-amber-600/10 text-amber-900 hover:bg-amber-600 hover:text-white' : 
                      product.accent === 'emerald' ? 'bg-emerald-600/10 text-emerald-900 hover:bg-emerald-600 hover:text-white' : 
                      'bg-forest/10 text-forest hover:bg-forest hover:text-white'
                    }`}
                  >
                    {product.ctaText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND BLOCK B: FIORI */}
      <section id="fiori" className="py-20 lg:py-40 px-6 lg:px-16 bg-cream-warm scroll-mt-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16 mb-20">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-terracotta/10 flex items-center justify-center text-terracotta">
                  <Zap size={24} />
                </div>
                <span className="font-mono text-sm tracking-widest uppercase text-terracotta font-bold">Industrial Excellence</span>
              </div>
              <h2 className="font-display text-4xl lg:text-6xl font-semibold text-text-dark mb-6">
                Fióri – <br />
                <span className="text-terracotta">Pure Fruit</span> Solutions
              </h2>
              <p className="text-text-muted text-lg leading-relaxed mb-8 font-light">
                High-grade fruit processing for industrial and culinary use. Our Fióri line ensures consistency, flavor, and purity for manufacturers who demand the best.
              </p>
              <ul className="space-y-4 mb-8">
               {[
                 'B2B & Industrial Scaling', 
                 '100% Preservative Free Options', 
                 'Sterile Aseptic Packaging',
                 'Global Logistics Handling'
               ].map(item => (
                 <li key={item} className="flex items-center gap-3 text-text-mid font-medium">
                   <div className="w-5 h-5 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta">
                     <CheckCircle2 size={12} />
                   </div>
                   {item}
                 </li>
               ))}
              </ul>
              <Link href="/contact" className="inline-flex items-center gap-3 border-2 border-terracotta text-terracotta px-8 py-3.5 rounded-full font-semibold transition-all hover:bg-terracotta hover:text-white group">
                Partner with Fióri <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative rounded-[40px] overflow-hidden aspect-[4/5] shadow-2xl border border-cream-dark">
                 <img src="/brands/fiori/mangozy.jpg" alt="Mangozy Alphonso Mango Pulp" className="w-full h-full object-cover saturate-[1.1]" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                 <div className="absolute bottom-10 left-10 text-white p-2">
                   <div className="bg-wheat text-text-dark px-4 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-widest mb-4 inline-block">Bestseller</div>
                   <h3 className="font-display text-4xl font-semibold mb-2">Mangozy</h3>
                   <p className="text-white/80 max-w-sm text-sm">100% Premium Alphonso Mango Pulp. Unsweetened. Ideal for manufacturing & catering.</p>
                 </div>
              </div>
              
              {/* Floating element */}
              <div className="absolute -right-8 bottom-20 bg-white p-6 rounded-3xl shadow-xl border border-cream-dark hidden md:block animate-bounce-slow">
                <div className="text-terracotta font-display text-4xl font-bold mb-1">3.1 KG</div>
                <div className="text-text-muted text-[0.6rem] uppercase tracking-widest font-bold">Bulk Format Can</div>
              </div>
            </div>
          </div>
          
          {/* Fiori Detail Table */}
          <div className="bg-white/50 backdrop-blur-md rounded-[32px] p-8 lg:p-12 border border-cream-dark">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { title: 'Brix', value: '16° - 18° Min' },
                  { title: 'Acidity', value: '0.5% - 0.7%' },
                  { title: 'Shelf Life', value: '24 Months' },
                  { title: 'Storage', value: 'Ambient Temp' }
                ].map(spec => (
                  <div key={spec.title} className="text-center md:text-left">
                    <div className="font-mono text-[0.6rem] uppercase text-text-muted mb-2 tracking-widest">{spec.title}</div>
                    <div className="font-display text-2xl font-semibold text-text-dark">{spec.value}</div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-forest-deep py-24 lg:py-32 px-6 lg:px-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#8BAF7C_1px,transparent_1px)] bg-[length:40px_40px]" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="font-display text-4xl lg:text-6xl text-white font-medium mb-8">
            Experience the <span className="italic text-sage">quality</span> of Kerala heritage.
          </h2>
          <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Whether you are a retailer looking for premium shelf products or a manufacturer requiring stable fruit ingredients, HARVEN is your trusted partner.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact" className="bg-terracotta text-white px-10 py-5 rounded-full font-semibold text-lg transition-all hover:bg-terracotta-light hover:-translate-y-1 shadow-xl shadow-black/20">
              Request Full Catalog
            </Link>
            <a href="https://wa.me/971561625698" target="_blank" rel="noopener noreferrer" className="text-white border-b-2 border-sage pb-1 font-medium hover:text-sage transition-colors text-lg">
              Chat with Bulk Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
