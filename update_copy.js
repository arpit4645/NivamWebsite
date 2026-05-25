const fs = require('fs');

const file = 'index.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Hero Heading
content = content.replace(
  '<span id="hero-rotating-text">Transform Your Life</span>',
  '<span id="hero-rotating-text">Transform Your</span>'
);
content = content.replace(
  '<span class="accent-line">with Guided Purpose</span>',
  '<span class="accent-line">Inner World</span>'
);

// 2. Hero Subtitle
content = content.replace(
  '<p class="hero__subtitle">Empowering families, parents, and young leaders across India through evidence-based coaching, live workshops, and transformative programs.</p>',
  '<p class="hero__subtitle">Modern life coaching and transformational learning rooted in timeless wisdom.</p>'
);

// 3. Hero CTAs
content = content.replace(
  '<a href="book.html" class="btn btn--primary btn--lg" id="hero-cta-primary">Book Free Consultation <i data-lucide="arrow-right" class="lucide-icon cta-arrow"></i></a>',
  '<a href="book.html" class="btn btn--primary btn--lg" id="hero-cta-primary">Start Your Journey <i data-lucide="arrow-right" class="lucide-icon cta-arrow"></i></a>'
);

// 4. Hero Trust Statement
content = content.replace(
  '<div class="hero__actions">',
  '<div class="hero__actions">'
);
// To insert trust statement below actions
const actionsEndIdx = content.indexOf('</div>\n        <div class="hero__stats">');
if (actionsEndIdx !== -1) {
    const before = content.substring(0, actionsEndIdx + 6); // include </div>
    const after = content.substring(actionsEndIdx + 6);
    content = before + '\n        <p style="margin-top: 1.5rem; font-size: 0.875rem; color: rgba(240, 235, 248, 0.7); font-weight: 500;">Helping individuals build clarity, confidence, emotional balance, and conscious growth.</p>' + after;
}

// 5. About Eyebrow
content = content.replace(
  '<span class="section-eyebrow">Why Nivam Exists</span>',
  '<span class="section-eyebrow">The Vision Behind NIVAM</span>'
);

// 6. About Heading
content = content.replace(
  '<h2 class="section-title">Every Person Deserves to <span>Live in Harmony</span></h2>',
  '<h2 class="section-title">A Transformational Academy for <span>Conscious Living</span></h2>'
);

// 7. About Quote
content = content.replace(
  '<blockquote class="about-split__quote">"Real transformation is not an event. It is a structured journey from awareness to self-mastery."</blockquote>',
  '<blockquote class="about-split__quote">"Inner Peace. Outer Success."</blockquote>'
);

// 8. About Paragraphs
content = content.replace(
  '<p>At Nivam, we believe every person deserves to live in harmony in relationships and be successful in their career. But today, most people struggle with emotional imbalance, relationship conflicts, lack of direction, and pressure without clarity.</p>\n        <p style="margin-top:1rem;">We exist to bridge this gap — by helping people <strong>design their life consciously.</strong></p>',
  '<p>NIVAM is a transformational academy designed to help individuals create meaningful growth in every area of life.</p>\n        <p style="margin-top:1rem;">Through guided learning, conscious self-development, emotional awareness, and timeless wisdom, NIVAM empowers people to build balanced relationships, stronger mindsets, deeper clarity, and purposeful living.</p>'
);

// 9. About CTA
content = content.replace(
  '<a href="book.html" class="btn btn--primary" id="home-consult-btn">Start Transformation <i data-lucide="arrow-right" class="lucide-icon cta-arrow"></i></a>',
  '<a href="book.html" class="btn btn--primary" id="home-consult-btn">Start Your Journey <i data-lucide="arrow-right" class="lucide-icon cta-arrow"></i></a>'
);

// 10. Programs Section Eyebrow & Subtitle
content = content.replace(
  '<span class="section-eyebrow">Our Signature Consulting Programs</span>',
  '<span class="section-eyebrow">Our Transformational Programs</span>'
);
content = content.replace(
  '<p class="section-subtitle">For teenagers, parents, families — structured programs designed for lasting real-life change.</p>',
  '<p class="section-subtitle">Structured learning experiences designed for personal evolution and conscious growth.</p>'
);

// 11. Testimonial Section
content = content.replace(
  '<h2 class="section-title">Stories of <span>Transformation</span></h2>\n      <p class="section-subtitle">Real people. Real results. Read what our clients have to say about their journey with Nivam.</p>',
  '<h2 class="section-title">Stories of <span>Transformation</span></h2>\n      <p class="section-subtitle">Every transformation begins with awareness. Discover how individuals have created meaningful change through NIVAM.</p>'
);

// 12. Bottom CTA Section
content = content.replace(
  '<span class="section-eyebrow">Ready for a change?</span>',
  '<span class="section-eyebrow">Your Journey Towards Growth Begins Here</span>'
);
content = content.replace(
  '<h2 class="section-title" style="color:var(--clr-white);">Take the First Step Towards a <span>Better Life</span></h2>',
  '<h2 class="section-title" style="color:var(--clr-white);">Take the first step towards a more balanced, purposeful, and <span>empowered life.</span></h2>'
);
content = content.replace(
  '<p class="section-subtitle" style="color:rgba(255,255,255,0.8);">Book your free initial consultation call to discuss your challenges and explore how we can help you.</p>',
  ''
);
content = content.replace(
  '<a href="book.html" class="btn btn--primary btn--lg" id="bottom-cta-btn">Book Your Free Call</a>',
  '<a href="book.html" class="btn btn--primary btn--lg" id="bottom-cta-btn">Book a Guidance Call</a>'
);

fs.writeFileSync(file, content);
console.log('Index text updated');
