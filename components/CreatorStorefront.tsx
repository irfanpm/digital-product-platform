'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Check, CheckCircle2, ChevronDown, Monitor, ImageIcon, Megaphone, FileText, Users, SlidersHorizontal, Lightbulb, Sparkles, ShieldCheck, Download, Menu, X, Palette, ListChecks, Bot, Briefcase, GraduationCap, Rocket, Play, FolderOpen } from 'lucide-react';
import { CheckoutSection } from './CheckoutSection';
import { VisitorTracker } from './VisitorTracker';
import { trackMetaViewContent } from '@/lib/metaPixel';

const tools = [
  { name: 'Website Builder', icon: Monitor, text: 'Plan your pages, choose a style and get tailored build instructions.' },
  { name: 'Poster Maker', icon: ImageIcon, text: 'Turn your brief into a poster plan, copy and creation steps.' },
  { name: 'Meta Ad Creator', icon: Megaphone, text: 'Prepare an offer, ad copy and a creative direction.' },
  { name: 'Resume Builder', icon: FileText, text: 'Present your real experience clearly. Export a resume draft.' },
  { name: 'Interview Preparation', icon: Users, text: 'Practice answers and work through mock interview questions.' },
  { name: 'Lightroom Prompts', icon: SlidersHorizontal, text: 'Describe your photo and get a thoughtful editing plan.' },
  { name: 'Product Image Creator', icon: ImageIcon, text: 'Prepare instructions to present your product visually.' },
  { name: 'Business Ideas', icon: Lightbulb, text: 'Explore a business idea and practical ways to test it.' },
];
const steps = [
  { title: 'Choose what you want', text: 'A website, poster, resume or another useful result.', icon: Lightbulb },
  { title: 'Enter simple details', text: 'Tell the kit about your business, project or goal.', icon: FileText },
  { title: 'Choose your direction', text: 'Pick a style, pages and features where relevant.', icon: Palette },
  { title: 'Select an AI workflow', text: 'Choose a suitable external tool for your task.', icon: Bot },
  { title: 'Follow the instructions', text: 'Use your customized brief and guided next steps.', icon: ListChecks },
  { title: 'Create your result', text: 'Build, review and refine in your chosen tool.', icon: CheckCircle2 },
];
const audiences = [
  { name: 'Business owners', text: 'Plan a website and promote your next offer.', icon: Briefcase },
  { name: 'Students', text: 'Present projects and build a clearer resume.', icon: GraduationCap },
  { name: 'Job seekers', text: 'Prepare applications and practice interviews.', icon: FileText },
  { name: 'Freelancers', text: 'Start with a clear brief for your client work.', icon: Monitor },
  { name: 'Creators', text: 'Plan posters, visuals and marketing content.', icon: Palette },
  { name: 'Side hustlers', text: 'Explore an idea and map the next steps.', icon: Rocket },
];
const faqs = [
  ['What exactly do I receive?', 'A ZIP containing AI Creator Kit Local edition 2.0: a browser-based local app, its assets and guided workflows, plus a Start Here guide. Extract the whole ZIP and open START-HERE.html in Chrome or Edge on your computer.'],
  ['Do I need coding or prompt experience?', 'You can start with simple questions and guided instructions. Website creation still happens in your chosen external AI tool. You will need to review, customize and test the output before publishing.'],
  ['Does the kit include paid AI subscriptions?', 'No. The kit prepares instructions, drafts and guides. External AI tools require their own accounts, internet access and any applicable subscriptions or usage fees. Hosting and publishing costs are separate.'],
  ['Can I use it on my phone?', 'The downloadable local app is best used on a computer with Chrome or Edge. The interface adapts to smaller screens, but opening a full extracted HTML folder depends on your mobile device. A computer is recommended for the complete workflow.'],
  ['How do I get access after payment?', 'After Razorpay confirms a matching captured payment, this page shows your download link. A purchase email is also sent when email delivery is available. If verification is pending, retry verification without paying again.'],
  ['Is this a one-time purchase?', 'Yes. The kit has a one-time price with no recurring kit subscription. The purchase covers the delivered local edition; external services may charge separately.'],
  ['Where are my projects saved?', 'Your planning details save in the browser on your device. They are not a cloud backup. Use My Projects to export backups regularly, especially before clearing browser data or switching devices.'],
  ['What if I need help?', 'Read the included Start Here guide and the Learn & Support section. For purchase or download problems, reply to your purchase email or contact the seller through your original purchase channel with your order ID.'],
];
function Badge({ children }: { children: React.ReactNode }) { return <span className="creator-badge"><span />{children}</span>; }
function Brand() { return <a className="creator-brand" href="#home" aria-label="AI Creator Kit home"><span className="creator-mark"><Sparkles size={21} /></span>AI Creator Kit</a>; }

export default function CreatorStorefront() {
  const [menu, setMenu] = useState(false);
  const [price, setPrice] = useState<number | null>(null);
  const [preview, setPreview] = useState(0);
  useEffect(() => {
    fetch('/api/settings', { cache: 'no-store' }).then(r => r.json()).then(d => { if (d.success && Number.isFinite(d.setting?.basePrice) && d.setting.basePrice > 0) setPrice(d.setting.basePrice); }).catch(() => {});
    let attempts = 0;
    const timer = window.setInterval(() => { if (trackMetaViewContent() || ++attempts >= 80) window.clearInterval(timer); }, 250);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => { const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false); }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, []);
  const shownPrice = price ?? 199;
  const cta = (label = 'Get AI Creator Kit') => <a className="creator-cta" href="#checkout-section">{label}<ArrowRight size={18} /></a>;
  const priceTag = <div className="creator-price"><strong>₹{shownPrice}</strong><span>One-time purchase</span></div>;
  const previews = [
    { label: 'Dashboard', image: 'dashboard', caption: 'Your starting point: choose a goal, find a tool and open the quick guide.' },
    { label: 'Included tools', image: 'tools', caption: 'The actual tool library: websites, posters, ads, resumes, interviews, editing and business ideas.' },
    { label: 'Build instructions', image: 'instructions', caption: 'A real website project: customized instructions, a visual guide, testing and launch steps.' },
  ];
  return <main className="creator-site">
    <VisitorTracker />
    <section id="home" className="creator-hero creator-dark">
      <img className="creator-hero-bg" src="/images/creator/hero.webp" alt="" fetchPriority="high" />
      <div className="creator-hero-shade" />
      <header className="creator-nav creator-container">
        <Brand />
        <nav className={menu ? 'is-open' : ''} aria-label="Main navigation">
          {[['Home', '#home'], ['Features', '#features'], ['How it works', '#how-it-works'], ["What's included", '#included'], ['FAQ', '#faq']].map(([label, href]) => <a key={href} href={href} onClick={() => setMenu(false)}>{label}</a>)}
          <a className="creator-nav-mobile-cta" href="#checkout-section" onClick={() => setMenu(false)}>Get AI Creator Kit <ArrowRight size={16} /></a>
        </nav>
        <a className="creator-nav-cta" href="#checkout-section">Get AI Creator Kit <ArrowRight size={15} /></a>
        <button className="creator-menu" aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
      </header>
      <div className="creator-container creator-hero-content">
        <div className="creator-hero-copy">
          <Badge>ALL-IN-ONE AI CREATION GUIDE</Badge>
          <h1>Turn Your Ideas<br />Into Real Results<br />With <em>AI</em></h1>
          <p>Build websites, create posters, plan Meta ads, prepare resumes and interviews — with beginner-friendly, step-by-step guidance.</p>
          <div className="creator-perks"><span><CheckCircle2 />Beginner friendly</span><span><ListChecks />Clear next steps</span><span><Monitor />Browser-based kit</span></div>
          <div className="creator-buy-row">{cta()}{priceTag}</div>
          <div className="creator-micro"><span><CheckCircle2 />Digital download</span><span><ShieldCheck />Verified payment</span><span><CheckCircle2 />No recurring kit fee</span></div>
        </div>
        <div className="creator-floating-tools" aria-label="Creation workflows">{tools.slice(0, 6).map(t => <span key={t.name}><t.icon size={16} />{t.name}</span>)}</div>
        <span className="creator-handnote hero-note">An idea is a<br />great place to start.<span>↘</span></span>
      </div>
    </section>

    <section className="creator-problems creator-light">
      <div className="creator-container creator-problem-layout">
        <div><Badge>SOUND FAMILIAR?</Badge><h2>You Have Ideas.<br />But You’re Stuck.</h2><p>A business website. A better resume. A poster for your next offer. You know what you want — you just need a place to begin.</p></div>
        <div className="creator-problem-cards">{[
          [Monitor, '“I need a website for my business, but I don’t know coding.”'],
          [Lightbulb, '“I know AI is powerful. I don’t know what to ask.”'],
          [Play, '“I keep watching tutorials and still feel confused.”'],
          [Bot, '“Which AI tool do I use? And what comes next?”'],
        ].map(([Icon, text], i) => { const I = Icon as typeof Monitor; return <article key={i}><I size={30} /><p>{text as string}</p><span>0{i + 1}</span></article>; })}</div>
      </div>
    </section>

    <section id="features" className="creator-reveal creator-dark">
      <div className="creator-container creator-split">
        <div><Badge>INTRODUCING</Badge><h2 className="creator-reveal-title">AI Creator Kit</h2><h3>Create With AI.<br />Step by Step.</h3><p>Choose a goal. Answer simple questions. Get useful instructions for your project — and guidance on what to do next.</p><p className="creator-subtle">The kit prepares your brief. Your selected AI tool helps you create and refine the final result.</p><div className="creator-buy-row">{cta()}{priceTag}</div></div>
        <figure className="creator-laptop"><div className="creator-screen"><div className="creator-window-bar"><i /><i /><i /><span>AI Creator Kit · Local edition 2.0</span></div><img src="/images/creator/dashboard.webp" alt="Real AI Creator Kit dashboard with website, marketing and career goals" loading="lazy" /></div><div className="creator-laptop-base" /><figcaption><CheckCircle2 size={14} /> Actual product interface</figcaption></figure>
      </div>
    </section>

    <section id="how-it-works" className="creator-how creator-light">
      <div className="creator-container"><div className="creator-section-heading"><div><Badge>HOW IT WORKS</Badge><h2>From Idea to Result in Simple Steps.</h2></div><span className="creator-handnote">No prompt experience?<br />Start with the questions.</span></div>
        <div className="creator-steps">{steps.map((s, i) => <article key={s.title}><span className="creator-step-number">{i + 1}</span><s.icon size={29} /><h3>{s.title}</h3><p>{s.text}</p>{i < 5 && <ArrowRight className="creator-step-arrow" size={18} />}</article>)}</div>
      </div>
    </section>

    <section className="creator-website creator-dark">
      <div className="creator-container creator-split"><div><Badge>A CLEAR PATH TO YOUR WEBSITE</Badge><h2>Get Your Business<br />Online With AI.</h2><p>Go from “I need a website” to a brief you can actually use. The website workflow walks you through ten stages, from your business details to testing and launch.</p><ul className="creator-checklist">{['Choose your website type', 'Add your pages, features and business details', 'Pick a design direction and AI workflow', 'Get build instructions and visual guidance', 'Customize, test and prepare to publish'].map(x => <li key={x}><CheckCircle2 />{x}</li>)}</ul><a className="creator-text-link" href="#product-preview">See the real workflow <ArrowRight size={17} /></a></div>
        <figure className="creator-example"><div className="creator-example-label"><span>IDEA → PLAN → CREATE</span><Monitor size={18} /></div><img src="/images/creator/website-example.webp" alt="Concept illustration of an interior business website on desktop and mobile" loading="lazy" /><figcaption>Concept website artwork included in the kit. Your final website is created and published in your selected external tool.</figcaption></figure>
      </div>
    </section>

    <section id="included" className="creator-tools creator-light"><div className="creator-container"><div className="creator-section-heading"><div><Badge>MORE THAN JUST WEBSITES</Badge><h2>All the AI Guidance You Need.<br />In One Place.</h2></div><p>Create, design, prepare and explore.<br />Start with a goal. Follow a clear path.</p></div><div className="creator-tool-grid">{tools.map(t => <article key={t.name}><span className="creator-tool-icon"><t.icon size={25} /></span><div><h3>{t.name}</h3><p>{t.text}</p></div></article>)}</div><div className="creator-included-note"><FolderOpen size={19} /><p>Also included: project saving, backup export, saved items, quick guides and practical learning resources. Projects save in your browser; keep your own backups.</p></div></div></section>

    <section className="creator-audience creator-dark"><div className="creator-container"><Badge>DESIGNED FOR EVERYDAY PEOPLE</Badge><h2>Your Ideas Deserve a Starting Point.</h2><div className="creator-audience-grid">{audiences.map(a => <article key={a.name}><a.icon size={30} /><h3>{a.name}</h3><p>{a.text}</p></article>)}</div><p className="creator-audience-footer">Less wondering what to ask. More learning by doing.</p></div></section>

    <section id="product-preview" className="creator-proof creator-light"><div className="creator-container"><div className="creator-section-heading"><div><Badge>TAKE A LOOK INSIDE</Badge><h2>Real Product. Clear Next Steps.</h2></div><p>These are screenshots from the actual kit.<br />Explore what your purchase includes.</p></div><div className="creator-preview-tabs" role="tablist" aria-label="Product screenshots">{previews.map((p, i) => <button type="button" key={p.label} role="tab" id={`preview-tab-${i}`} aria-selected={preview === i} aria-controls="preview-panel" onClick={() => setPreview(i)} onKeyDown={e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const n = (i + (e.key === 'ArrowRight' ? 1 : 2)) % 3; setPreview(n); document.getElementById(`preview-tab-${n}`)?.focus(); } }} tabIndex={preview === i ? 0 : -1}>{p.label}</button>)}</div><figure id="preview-panel" role="tabpanel" aria-labelledby={`preview-tab-${preview}`}><img src={`/images/creator/${previews[preview].image}.webp`} alt={`Actual AI Creator Kit ${previews[preview].label.toLowerCase()} screenshot`} loading="lazy" /><figcaption>{previews[preview].caption}</figcaption></figure>
      <div className="creator-trust-grid"><article><ShieldCheck /><h3>Understand what you buy</h3><p>A local app with drafts, instructions and guides. External AI subscriptions and hosting are separate.</p></article><article><Download /><h3>A complete local package</h3><p>Extract the ZIP and open Start Here in Chrome or Edge on your computer. No app server to install.</p></article><article><CheckCircle2 /><h3>Access after verified payment</h3><p>Your download appears after payment verification. No new payment is needed to retry verification.</p></article></div></div></section>

    <section className="creator-demo creator-dark"><div className="creator-container creator-demo-layout"><div><Badge>SEE IT IN ACTION</Badge><h2>See AI Creator Kit<br />In Action.</h2><p>Watch the AI Creator Kit demonstration: choose a website goal, enter details and prepare your build instructions.</p><p className="creator-subtle">The video combines real kit footage with illustrative visuals. It shows the planning workflow; results depend on your work and chosen tools.</p><a className="creator-text-link" href="#product-preview">Explore the screenshots <ArrowRight size={17} /></a></div><div className="creator-video-card"><video controls preload="none" playsInline poster="/images/creator/video-poster.webp" aria-label="AI Creator Kit demonstration video"><source src="/video/creator-demo.mp4" type="video/mp4" /><p>Your browser does not support video. Explore the screenshots above.</p></video><span>31-second demo · Press play for audio</span></div></div></section>

    <section className="creator-pricing creator-light"><div className="creator-container creator-split"><div><Badge>ONE KIT. YOUR NEXT IDEA.</Badge><h2>Start Creating.<br />Keep Learning.</h2><p>A practical place to begin, whether you want to build a business website, prepare for an interview or bring your next offer to life.</p><div className="creator-pricing-note"><Sparkles /><p>No recurring kit fee.<br />A one-time purchase of Local edition 2.0.</p></div></div><div className="creator-price-card"><span className="creator-price-card-kicker">AI CREATOR KIT</span><h3>Create With AI. Step by Step.</h3><div className="creator-big-price">₹{shownPrice}<span>One-time purchase</span></div><ul className="creator-checklist">{['The complete local app and included assets', 'All included creation workflows', 'Customized instructions and drafts', 'Visual guides and learning resources', 'Project saving and backup export', 'Digital download after verified payment'].map(x => <li key={x}><Check />{x}</li>)}</ul>{cta()}<p className="creator-price-footnote">External AI accounts, subscriptions and hosting are separate. Best used on a computer with Chrome or Edge.</p></div></div></section>

    <section id="faq" className="creator-faq creator-light"><div className="creator-container creator-faq-layout"><div><Badge>A LITTLE CLARITY</Badge><h2>Good Questions.<br />Straight Answers.</h2><p>Know what’s included,<br />and how to get started.</p></div><div>{faqs.map(([q, a]) => <details key={q}><summary>{q}<ChevronDown size={19} /></summary><p>{a}</p></details>)}</div></div></section>

    <section className="creator-closing creator-dark"><div className="creator-container"><Badge>YOUR NEXT IDEA IS WAITING</Badge><h2>Start With An Idea.<br />Leave With A Plan.</h2><p>You don’t have to know every tool.<br />You just need a place to begin.</p><div className="creator-buy-row">{cta()}{priceTag}</div><span className="creator-micro"><ShieldCheck size={15} />Verified payment · Digital delivery · One-time purchase</span></div></section>
    <CheckoutSection />
    <footer className="creator-footer creator-dark"><div className="creator-container"><Brand /><p>Practical guidance for your next idea.</p><nav aria-label="Footer navigation"><a href="/contact">Support</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/refund">Refund policy</a></nav><span>© {new Date().getFullYear()} AI Creator Kit</span></div></footer>
  </main>;
}
