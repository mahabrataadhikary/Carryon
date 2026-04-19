import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Star, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Menu, 
  X,
  ArrowRight,
  Plus,
  Minus,
  CheckCircle2,
  Lock,
  Layers,
  Wind
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-brand-charcoal">
        <a href="#" className="text-2xl font-display font-bold tracking-tighter">CARRYON</a>
        
        <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest">
          {['Heritage', 'Collections', 'Craftsmanship', 'Reviews'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-brand-tan transition-colors">{item}</a>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-brand-charcoal/5 rounded-full transition-colors relative">
            <ShoppingBag size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-brand-tan rounded-full"></span>
          </button>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
          <button className="hidden md:block bg-brand-charcoal text-white px-6 py-2.5 text-sm font-medium rounded-sm hover:bg-brand-charcoal/90 transition-all uppercase tracking-tighter">
            Shop Collection
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-white z-[60] flex flex-col p-8"
          >
            <div className="flex justify-end">
              <button onClick={() => setMobileMenuOpen(false)}><X size={32} /></button>
            </div>
            <div className="flex flex-col space-y-8 mt-12 text-3xl font-display font-bold">
              {['Heritage', 'Collections', 'Craftsmanship', 'Reviews'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-tan">{item}</a>
              ))}
            </div>
            <div className="mt-auto">
              <button className="w-full bg-brand-charcoal text-white py-4 rounded-sm font-bold uppercase tracking-widest">
                Shop Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: { icon: any, title: string, description: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="bg-white p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow group border border-brand-beige"
  >
    <div className="w-12 h-12 bg-brand-beige flex items-center justify-center mb-6 group-hover:bg-brand-tan group-hover:text-white transition-colors duration-500">
      <Icon size={24} className="stroke-[1.5px]" />
    </div>
    <h3 className="text-xl font-display font-semibold mb-3">{title}</h3>
    <p className="text-brand-charcoal/70 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-brand-char/10 py-6">
      <button 
        className="w-full flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-display font-medium text-lg">{question}</span>
        {isOpen ? <Minus size={20} className="text-brand-tan" /> : <Plus size={20} className="text-brand-tan" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-brand-charcoal/70 text-sm leading-relaxed max-w-2xl">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [activeShowcase, setActiveShowcase] = useState(0);
  const images = [
    "https://images.unsplash.com/photo-1544816153-16ad4614ff28?q=80&w=2187&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2187&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2187&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=2070&auto=format&fit=crop"
  ];
  const titles = [ "Interior Organization", "Hardware Details", "Texture & Grain", "Lifestyle View" ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveShowcase((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-brand-offwhite selection:bg-brand-tan selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden bg-brand-beige">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 bg-brand-tan text-brand-offwhite text-[10px] font-bold uppercase tracking-[0.2em] mb-6 animate-pulse">
              Fall 2026 Collection
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold leading-[1.1] md:leading-[0.95] mb-6 md:mb-8 text-balance">
              Crafted for Professionals. <br className="hidden sm:block" />
              <span className="text-brand-tan italic font-medium">Built to Last.</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-charcoal/70 mb-8 md:text-xl md:mb-10 max-w-lg leading-relaxed">
              Premium full-grain leather bag designed for work, travel, and everyday carry. Elegance that matures with every mile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-brand-charcoal text-white px-10 py-5 rounded-sm font-bold uppercase tracking-widest hover:bg-brand-charcoal/90 transition-all flex items-center justify-center group shadow-xl">
                Shop Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border border-brand-charcoal/20 px-10 py-5 rounded-sm font-bold uppercase tracking-widest hover:bg-brand-beige transition-all">
                View Gallery
              </button>
            </div>
            <div className="mt-12 flex items-center space-x-6 text-brand-charcoal/50 text-xs">
              <div className="flex items-center">
                <CheckCircle2 size={16} className="mr-2 text-brand-tan" />
                Ethically Sourced
              </div>
              <div className="flex items-center">
                <CheckCircle2 size={16} className="mr-2 text-brand-tan" />
                Lifetime Warranty
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[400px] sm:h-[500px] md:h-full"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-tan/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
            <img 
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop" 
              alt="Premium Leather Bag"
              className="w-full h-full object-cover rounded-sm shadow-2xl"
              referrerPolicy="no-referrer"
            />
            {/* Floating details overlay */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 shadow-xl hidden lg:block border-l-4 border-brand-tan max-w-[240px]">
              <p className="text-xs uppercase tracking-widest text-brand-tan font-bold mb-1">Material</p>
              <p className="text-sm font-semibold">100% Full-Grain Italian Calf Skin Leather</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="craftsmanship" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display mb-6">Designed with Intention</h2>
            <p className="text-brand-charcoal/60 leading-relaxed italic">
              "Every fold, stitch, and selection of hide is executed with a relentless pursuit of perfection."
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={ShieldCheck}
              title="Full-Grain Leather"
              description="The strongest part of the hide. Water-resistant and develops a unique character over time."
              delay={0.1}
            />
            <FeatureCard 
              icon={Layers}
              title="Laptop Haven"
              description="Dedicated quilted sleeve fits up to 16' devices with secondary tech organizers."
              delay={0.2}
            />
            <FeatureCard 
              icon={Wind}
              title="Handcrafted Stitching"
              description="Double-reinforced seams using industrial-grade thread for unmatched durability."
              delay={0.3}
            />
            <FeatureCard 
              icon={RotateCcw}
              title="Timeless Utility"
              description="Thoughtfully modular compartments for professionals who value organized efficiency."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section id="collections" className="py-24 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6 md:gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-display mb-4 md:mb-6">The Artisan Series</h2>
              <p className="text-brand-charcoal/60 text-sm md:text-base">A deeper look at the details that define the Carryon standard.</p>
            </div>
            <div className="flex space-x-2 md:space-x-4">
              {[0, 1, 2, 3].map(i => (
                <button 
                  key={i}
                  onClick={() => setActiveShowcase(i)}
                  className={`w-12 h-1 ${activeShowcase === i ? 'bg-brand-charcoal' : 'bg-brand-charcoal/10'} transition-all`}
                />
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/5] sm:aspect-video md:aspect-[21/9] overflow-hidden rounded-sm shadow-xl group/showcase">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeShowcase}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <img 
                  src={images[activeShowcase]}
                  alt="Product Showcase"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 flex justify-between items-end text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-xl md:text-2xl font-display font-bold">
                      {titles[activeShowcase]}
                    </h3>
                    <p className="text-white/70 max-w-md mt-1 md:mt-2 text-xs md:text-base leading-relaxed">
                       Exquisite attention to detail in every component, from the brass zippers to the silk lining.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button 
              onClick={() => setActiveShowcase((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white md:opacity-0 group-hover/showcase:opacity-100 transition-opacity hover:bg-white/20 z-20"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => setActiveShowcase((prev) => (prev + 1) % images.length)}
              className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white md:opacity-0 group-hover/showcase:opacity-100 transition-opacity hover:bg-white/20 z-20"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="heritage" className="py-16 md:py-32 bg-brand-charcoal text-brand-offwhite">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-display mb-8 md:mb-10 leading-[1.1] md:leading-tight text-balance">A Story Written in <span className="text-brand-tan italic">Leather</span>.</h2>
            <div className="space-y-6 md:space-y-8 text-brand-offwhite/70 leading-relaxed text-base md:text-lg font-light">
              <p>
                We believe that modern technology shouldn't replace traditional craftsmanship; it should highlight it. Our journey began in a small workshop with a single goal: to create a bag that doesn't just survive your career, but evolves with it.
              </p>
              <p>
                Full-grain leather is a living material. Unlike synthetic alternatives that degrade over time, our leather develops a patina—a rich sheen that tracks your travels, your meetings, and your milestones.
              </p>
              <div className="pt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-[1px] bg-brand-tan"></div>
                  <span className="text-brand-tan font-bold uppercase tracking-widest text-xs">Our Pledge</span>
                </div>
                <p className="text-2xl font-display italic text-brand-offwhite font-medium">
                  "If it doesn't last a lifetime, we haven't done our job."
                </p>
              </div>
            </div>
          </motion.div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1554188248-986adbb73be4?q=80&w=2070&auto=format&fit=crop" 
              alt="Craftsmanship"
              className="w-full aspect-[4/5] object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -top-10 -right-10 w-40 h-40 border border-brand-tan/30 hidden lg:block"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-brand-tan/30 hidden lg:block"></div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section id="reviews" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-4xl font-display mb-4">Refined by People</h2>
              <div className="flex items-center space-x-2">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#D4B996" color="#D4B996" />)}
                <span className="text-sm font-bold ml-2">4.9/5 from 2,300+ professionals</span>
              </div>
            </div>
            <button className="text-sm font-bold uppercase tracking-widest border-b-2 border-brand-tan pb-1 hover:text-brand-tan transition-colors">
              View All Reviews
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "The patina after six months is breathtaking. This bag has become my most trusted companion for international business travel.",
                author: "Julian Thorne",
                role: "Consultant, NYC"
              },
              {
                text: "Finally a bag that fits my 16' MacBook Pro without looking like a hiker's backpack. Sleek, professional, and undeniably premium.",
                author: "Sarah Jenkins",
                role: "Creative Director"
              },
              {
                text: "The weight distribution is perfect. Even when fully loaded with tech and documents, it feels balanced. Worth every penny.",
                author: "Marcus Chen",
                role: "Architect"
              }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-brand-offwhite p-10 rounded-sm relative"
              >
                <div className="text-brand-tan mb-6"><Star fill="#D4B996" size={20} /></div>
                <p className="text-brand-charcoal font-medium leading-relaxed mb-8 italic">"{review.text}"</p>
                <div>
                  <p className="font-bold text-sm uppercase tracking-tighter">{review.author}</p>
                  <p className="text-xs text-brand-charcoal/50">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="py-20 bg-brand-tan text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/3">
           <ShoppingBag size={500} />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Investment Worth Making.</h2>
              <p className="text-white/80 text-lg max-w-xl">
                Order now and receive a <span className="font-bold text-white uppercase tracking-wider">Free Leather Care Kit</span> with your purchase. 
                <span className="block mt-2 font-semibold text-brand-charcoal">Limited stock available.</span>
              </p>
            </div>
            <div className="flex flex-col items-center">
              <button className="bg-brand-charcoal text-white px-12 py-6 rounded-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl mb-4 group">
                Claim Offer
                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">Free worldwide shipping included</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ & Trust */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5">
            <h2 className="text-4xl font-display mb-10">Common Inquiries</h2>
            <div className="divide-y divide-brand-beige">
              <AccordionItem 
                question="Is it genuine leather?" 
                answer="We use exclusively Full-Grain leather, which is superior to 'genuine leather'. It includes the outermost layer of the hide, providing the highest durability and the most beautiful aging process." 
              />
              <AccordionItem 
                question="How long will it last?" 
                answer="With minimal care, a Carryon bag is built to last 20+ years. We provide a lifetime warranty on all structural components including stitching and hardware." 
              />
              <AccordionItem 
                question="What is the return policy?" 
                answer="We offer a 7-day 'No Questions Asked' return window. If you aren't completely in love with the craftsman quality, we will handle the return shipping." 
              />
              <AccordionItem 
                question="Shipping durations?" 
                answer="Domestic orders typically arrive within 3-5 business days. International shipping ranges from 7-12 days depending on location." 
              />
            </div>
          </div>

          <div className="lg:col-span-7 bg-brand-offwhite p-12 rounded-sm border border-brand-beige">
            <h3 className="text-2xl font-display mb-8">Trust & Security</h3>
            <div className="grid sm:grid-cols-2 gap-10">
              <div className="flex items-start">
                <div className="bg-white p-3 rounded-sm mr-4 shadow-sm"><Lock className="text-brand-tan" size={24} /></div>
                <div>
                  <p className="font-bold text-sm uppercase tracking-wider mb-2">Secure Payment</p>
                  <p className="text-xs text-brand-charcoal/60 leading-relaxed">256-bit encrypted transactions. All major credit cards and digital wallets accepted.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-white p-3 rounded-sm mr-4 shadow-sm"><RotateCcw className="text-brand-tan" size={24} /></div>
                <div>
                  <p className="font-bold text-sm uppercase tracking-wider mb-2">7-Day Return</p>
                  <p className="text-xs text-brand-charcoal/60 leading-relaxed">Not exactly what you expected? Send it back for a full refund within 7 days.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-white p-3 rounded-sm mr-4 shadow-sm"><Truck className="text-brand-tan" size={24} /></div>
                <div>
                  <p className="font-bold text-sm uppercase tracking-wider mb-2">Fast Logistics</p>
                  <p className="text-xs text-brand-charcoal/60 leading-relaxed">Real-time tracking from our workshop to your doorstep.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-white p-3 rounded-sm mr-4 shadow-sm"><ShieldCheck className="text-brand-tan" size={24} /></div>
                <div>
                  <p className="font-bold text-sm uppercase tracking-wider mb-2">Global Warranty</p>
                  <p className="text-xs text-brand-charcoal/60 leading-relaxed">Protected against defects for life. We stand behind our artisans.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-top border-brand-charcoal/5 flex flex-wrap gap-8 items-center justify-center opacity-40 grayscale">
              <div className="font-display font-black text-xl italic tracking-tighter">VISA</div>
              <div className="font-display font-black text-xl italic tracking-tighter">Mastercard</div>
              <div className="font-display font-black text-xl italic tracking-tighter">AMEX</div>
              <div className="font-display font-black text-xl italic tracking-tighter">PayPal</div>
              <div className="font-display font-black text-xl italic tracking-tighter">ApplePay</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <footer className="bg-brand-charcoal text-brand-offwhite py-20 md:py-32 overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-7xl font-display mb-6 md:mb-8 leading-tight">Upgrade Your Style Today</h2>
            <p className="text-brand-offwhite/60 text-base md:text-xl mb-10 md:mb-12 max-w-2xl mx-auto">
              Join the community of thousands of professionals who have chosen longevity over convenience.
            </p>
            <button className="bg-brand-tan text-white px-10 md:px-16 py-5 md:py-7 rounded-sm font-bold uppercase tracking-widest text-base md:text-lg hover:scale-105 transition-all shadow-2xl flex items-center justify-center mx-auto group">
              Buy Now
              <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-32 pt-12 border-t border-brand-offwhite/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-3xl font-display font-bold tracking-tighter">CARRYON</div>
          <div className="flex space-x-8 text-xs font-bold uppercase tracking-widest opacity-50">
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Shipping</a>
          </div>
          <p className="text-xs opacity-30 text-center uppercase tracking-widest">
            © 2026 Carryon Leather Goods. All rights reserved.
          </p>
        </div>

        {/* Decorative background text */}
        <div className="absolute -bottom-12 left-0 right-0 pointer-events-none opacity-[0.03] select-none text-center">
          <span className="text-[20vw] font-display font-black tracking-tighter whitespace-nowrap">CARRYON</span>
        </div>
      </footer>
    </div>
  );
}
