/* ========================================
   GOPAL GOVIND ORNAMENTS — Shared Data
   Centralized product data & configuration
   ======================================== */

// ── WhatsApp Configuration ──
const WHATSAPP_NUMBER = '9904036646';
const STORE_NAME = 'Gopal Govind Ornaments';

// ── Category Definitions ──
const CATEGORIES = [
  { key: 'necklace', label: 'Necklace', description: 'Timeless 22K gold masterpieces crafted with heritage artistry' },
  { key: 'bangals', label: 'Bangals', description: 'Vintage-inspired pieces with oxidized finish and temple motifs' },
  { key: 'earrings', label: 'Earrings', description: 'Opulent Jadau Kundan creations with polki diamonds and meenakari' },
  { key: 'rings', label: 'Rings', description: 'Exquisite pieces adorned with certified natural gemstones' }
];

// ── Product Data ──
const products = [
  {
    id: 1,
    name: 'Haar',
    category: 'necklace',
    categoryLabel: 'Necklace',
    image: 'images/gold_haar_necklace.png',
    description: 'Light 25-40 Grams<br>Medium 30-60 Grams<br>Premium 80-100 Grams',
    price: 'Price on Request',
    material: '22K Hallmarked Gold',
    craft: 'Hand-finished Filigree',
    featured: true
  },
  {
    id: 2,
    name: 'Earrings',
    category: 'earrings',
    categoryLabel: 'Earrings',
    image: 'images/gold_earrings.png',
    description: 'Light 3-5 Grams<br>Medium 7-10 Grams<br>Premium 10-20 Grams',
    price: 'Price on Request',
    material: '22K Hallmarked Gold',
    craft: 'Traditional Filigree Work',
    featured: false
  },
  {
    id: 3,
    name: 'Bangals pair',
    category: 'bangals',
    categoryLabel: 'Bangals',
    image: 'images/gold_bangals_pair.png',
    description: 'Light 10-20 Grams<br>Medium 15-30 Grams<br>Premium 40-100 Grams',
    price: 'Price on Request',
    material: '22K Hallmarked Gold',
    craft: 'Hand-carved Temple Design',
    featured: false
  },
  {
    id: 4,
    name: 'Rings',
    category: 'rings',
    categoryLabel: 'Rings',
    image: 'images/gold_rings.png',
    description: 'Light 2-5 Grams<br>Medium 5-10 Grams<br>Premium 10-20 Grams',
    price: 'Price on Request',
    material: '22K Hallmarked Gold',
    craft: 'Hand-finished Filigree',
    featured: true
  },
  {
    id: 5,
    name: 'Mangalsutra',
    category: 'necklace',
    categoryLabel: 'Necklace',
    image: 'images/gold_mangalsutra.png',
    description: 'Light 10-15 grams<br>Medium 15-25 grams',
    price: 'Price on Request',
    material: '22K Hallmarked Gold',
    craft: 'Handcrafted with Meenakari',
    featured: false
  },
  {
    id: 6,
    name: 'Designer jewellery Haar',
    category: 'necklace',
    categoryLabel: 'Necklace',
    image: 'images/gold_designer_haar.png',
    description: 'Light 25-30 Grams<br>Medium 30-50 Grams<br>Premium 50-100 Grams or above',
    price: 'Price on Request',
    material: '22K Hallmarked Gold',
    craft: 'Hand-finished Filigree',
    featured: false
  },
  {
    id: 7,
    name: 'Bikaner haar',
    category: 'haar',
    categoryLabel: 'Haar',
    image: 'images/bikaner_haar.png',
    description: 'Light 15-25 Grams<br>Medium 25-35 Grams<br>Premium 40-100 Grams or above',
    price: 'Price on Request',
    material: '22K Gold with Semi-precious stones',
    craft: 'Traditional Jadau Setting',
    featured: true
  }
];

// ── Testimonials Data ──
const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Ahmedabad',
    text: 'The bridal Kundan set I purchased was absolutely breathtaking. Every guest at my wedding complimented the craftsmanship. Gopal Govind Ornaments truly made my special day even more memorable.',
    rating: 5
  },
  {
    name: 'Rajesh Patel',
    location: 'Surat',
    text: 'I have been buying gold jewellery from Gopal Govind for over 15 years. Their hallmarked gold quality is impeccable and the designs are always contemporary yet rooted in tradition.',
    rating: 5
  },
  {
    name: 'Meera Desai',
    location: 'Ahmedabad',
    text: 'The custom emerald pendant they designed for my anniversary was beyond my expectations. The attention to detail and personal service from the team was outstanding.',
    rating: 5
  },
  {
    name: 'Anita Joshi',
    location: 'Baroda',
    text: 'Their antique collection is one-of-a-kind. I purchased a temple choker and the intricate carving work is museum-quality. Fair pricing and genuine craftsmanship.',
    rating: 5
  },
  {
    name: 'Vikram Mehta',
    location: 'Rajkot',
    text: 'Got my wife a sapphire bracelet for our anniversary. The gemstone sourcing team helped me find the perfect Ceylon blue sapphire. Truly a premium experience.',
    rating: 5
  }
];

// ── FAQ Data ──
const faqs = [
  {
    question: 'Is all your gold jewellery BIS hallmarked?',
    answer: 'Yes, absolutely. Every piece of gold jewellery we sell is BIS hallmarked, ensuring purity and quality certification as per government standards. We use only 22K and 24K gold in our collections.'
  },
  {
    question: 'Do you offer custom jewellery design services?',
    answer: 'Yes, we specialize in custom jewellery design. You can share your design ideas, sketches, or reference images with our master designers, and we will bring your vision to life. Custom orders typically take 2–4 weeks depending on complexity.'
  },
  {
    question: 'What is your exchange and return policy?',
    answer: 'We offer a hassle-free exchange policy on all gold jewellery at current market rates. Gemstone jewellery can be exchanged within 7 days of purchase. Please bring the original invoice and the jewellery in its original condition.'
  },
  {
    question: 'Do you provide gemstone certification?',
    answer: 'All our gemstones come with certification from reputed gemological laboratories. We source natural, ethically mined gemstones including rubies, emeralds, sapphires, and polki diamonds from trusted global suppliers.'
  },
  {
    question: 'Can I visit your showroom without an appointment?',
    answer: 'Yes, walk-ins are welcome during our working hours (Mon–Sat, 10:00 AM – 8:00 PM). For Sunday visits or private consultations, we recommend scheduling an appointment via WhatsApp or phone.'
  }
];

// ── Helper: Generate WhatsApp Link ──
function generateWhatsAppLink(product) {
  const message = `Hello ${STORE_NAME}! 👋\n\nI'm interested in ordering:\n\n📿 *${product.name}*\n📦 Category: ${product.categoryLabel}\n💰 Price: ${product.price}\n\nPlease share more details about this product including pricing, availability, and customization options.\n\nThank you! 🙏`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ── Helper: Generate Product Card HTML ──
function createProductCardHTML(product, index) {
  return `
    <div class="product-card" data-category="${product.category}" style="animation-delay: ${(index || 0) * 0.1}s">
      <a href="product.html?id=${product.id}" class="product-image-wrapper">
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
        <span class="product-category-badge">${product.categoryLabel}</span>
        <div class="product-quick-view-overlay">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          View Details
        </div>
      </a>
      <div class="product-info">
        <h3 class="product-name"><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <p class="product-description">${product.description.substring(0, 100)}...</p>
        <div class="product-footer">
          <div class="product-price">
            <span class="price-label">Starting</span>
            ${product.price}
          </div>
          <a href="${generateWhatsAppLink(product)}" class="btn-whatsapp" target="_blank" rel="noopener" id="whatsapp-btn-${product.id}">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Order
          </a>
        </div>
      </div>
    </div>`;
}

// ── Helper: Get Unique Materials ──
function getUniqueMaterials() {
  return [...new Set(products.map(p => p.material))];
}

// ── Helper: Get Unique Crafts ──
function getUniqueCrafts() {
  return [...new Set(products.map(p => p.craft))];
}
