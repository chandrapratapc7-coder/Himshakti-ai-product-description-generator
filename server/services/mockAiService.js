// mockAiService.js
// 10 pre-written template sets covering different HimShakti products and tones.
// Each template has 2-3 phrasing variants per field so repeated calls for the
// same product don't return identical output (randomised, not just static).
// Used when AI_MODE=mock, when OPENAI_API_KEY is unset, or as an automatic
// fallback if the live AI call fails.

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const TEMPLATES = {
  mandua: {
    match: (n) => n.includes('mandua'),
    category: 'Snacks',
    titles: [
      'Mandua (Finger Millet) Cookies — Himalayan Superfood Snack',
      'Himalayan Mandua Cookies — Stone-Ground Finger Millet Crunch',
    ],
    shortDescriptions: [
      'Crunchy, wholesome cookies made from stone-ground mandua flour, sourced directly from Himalayan farms. A guilt-free snack packed with fiber and natural sweetness.',
      'Naturally sweet, fiber-rich cookies crafted from traditional Himalayan finger millet. A wholesome bite for any time of day.',
    ],
    bulletExtras: ['Rich in dietary fiber and calcium', 'Traditional Himalayan grain, stone-ground'],
  },
  ragi: {
    match: (n) => n.includes('ragi'),
    category: 'Snacks',
    titles: ['Ragi Chips — Crispy Himalayan Finger Millet Chips', 'Himalayan Ragi Chips — Baked, Not Fried'],
    shortDescriptions: [
      'Light, crispy ragi chips baked to perfection using traditional Himalayan finger millet. A healthier alternative to regular fried snacks.',
      'Crunchy, oven-baked ragi chips packed with nutrition and free from artificial flavoring.',
    ],
    bulletExtras: ['Baked, not deep-fried', 'High in iron and fiber'],
  },
  buransh: {
    match: (n) => n.includes('buransh'),
    category: 'Juices',
    titles: ['Buransh Juice — Himalayan Rhododendron Flower Juice', 'Pure Buransh (Rhododendron) Juice from the Hills'],
    shortDescriptions: [
      'A vibrant, antioxidant-rich juice made from hand-picked Himalayan rhododendron flowers. Refreshing and naturally tart.',
      'Cold-processed rhododendron flower juice, a traditional Himalayan remedy known for its refreshing tang and antioxidants.',
    ],
    bulletExtras: ['Made from hand-picked rhododendron flowers', 'Naturally rich in antioxidants'],
  },
  amla: {
    match: (n) => n.includes('amla'),
    category: 'Juices',
    titles: ['Amla Juice — Pure Himalayan Indian Gooseberry Juice', 'Himalayan Amla Juice — Vitamin C Rich'],
    shortDescriptions: [
      'Tangy, nutrient-dense amla juice made from Himalayan Indian gooseberries, a traditional source of natural Vitamin C.',
      'Pure amla juice, cold-pressed from farm-fresh Himalayan gooseberries for an immunity-boosting daily tonic.',
    ],
    bulletExtras: ['Excellent natural source of Vitamin C', 'No added sugar or preservatives'],
  },
  mango_pickle: {
    match: (n) => n.includes('mango') && n.includes('pickle'),
    category: 'Pickles',
    titles: ['Himalayan Mango Pickle — Traditional Spiced Achaar', 'Pahadi Mango Pickle — Sun-Cured, Hand-Made'],
    shortDescriptions: [
      'Sun-cured raw mango pickle made with traditional Himalayan spices, following a recipe passed down through generations.',
      'Tangy, spicy mango achaar hand-prepared in small batches using mustard oil and Himalayan spices.',
    ],
    bulletExtras: ['Sun-cured using traditional methods', 'Made with cold-pressed mustard oil'],
  },
  pahadi_chutney: {
    match: (n) => n.includes('chutney') || n.includes('pahadi'),
    category: 'Chutneys',
    titles: ['Pahadi Chutney — Traditional Himalayan Chutney Blend', 'Himalayan Pahadi Chutney — Hand-Ground Spice Blend'],
    shortDescriptions: [
      'A bold, hand-ground chutney blend rooted in Himalayan Pahadi cooking traditions, perfect alongside any meal.',
      'Traditional pahadi-style chutney made with locally sourced ingredients and stone-ground spices.',
    ],
    bulletExtras: ['Stone-ground using traditional methods', 'No artificial colors or flavors'],
  },
  seabuckthorn: {
    match: (n) => n.includes('seabuckthorn') || n.includes('sea buckthorn'),
    category: 'Juices',
    titles: ['Seabuckthorn Juice — High-Altitude Himalayan Superfruit', 'Himalayan Seabuckthorn Juice — Omega-Rich Tonic'],
    shortDescriptions: [
      'Rare, high-altitude seabuckthorn berries pressed into a tangy, nutrient-dense juice prized in Himalayan wellness traditions.',
      'A vibrant orange juice from wild-harvested seabuckthorn berries, rich in omega fatty acids and vitamins.',
    ],
    bulletExtras: ['Wild-harvested at high altitude', 'Naturally rich in Omega-7 fatty acids'],
  },
  apricot_jam: {
    match: (n) => n.includes('apricot'),
    category: 'Jams',
    titles: ['Himalayan Apricot Jam — Small-Batch Fruit Preserve', 'Wild Apricot Jam from the Himalayas'],
    shortDescriptions: [
      'Sweet-tart apricot jam made from sun-ripened Himalayan apricots, slow-cooked in small batches for authentic flavor.',
      'A small-batch preserve capturing the natural sweetness of wild Himalayan apricots.',
    ],
    bulletExtras: ['Made from sun-ripened wild apricots', 'Slow-cooked in small batches'],
  },
  millet_snack: {
    match: (n) => n.includes('millet') || n.includes('jhangora') || n.includes('foxtail'),
    category: 'Snacks',
    titles: ['Himalayan Millet Snack Mix — Wholesome Everyday Bite', 'Pahadi Millet Crunch — Traditional Grain Snack'],
    shortDescriptions: [
      'A wholesome snack mix built on traditional Himalayan millet varieties, offering natural crunch without deep-frying.',
      'Nutrient-dense millet snack rooted in Pahadi grain traditions, roasted for a satisfying crunch.',
    ],
    bulletExtras: ['Made from traditional Himalayan millet', 'Naturally gluten-free'],
  },
  rhododendron_squash: {
    match: (n) => n.includes('squash') || n.includes('sharbat'),
    category: 'Juices',
    titles: ['Himalayan Fruit Squash — Concentrated Hill Fruit Syrup', 'Pahadi Sharbat — Traditional Fruit Concentrate'],
    shortDescriptions: [
      'A concentrated fruit squash made from Himalayan hill fruits, ready to dilute for a refreshing traditional drink.',
      'Traditional Pahadi sharbat concentrate, made in small batches for an authentic hill-fruit flavor.',
    ],
    bulletExtras: ['Dilutes to make 4-5 servings', 'No artificial colors'],
  },
};

const GENERIC_BULLETS = [
  'No artificial preservatives or additives',
  'Sourced from Himalayan farms',
  'Small-batch crafted for freshness',
  'Perfect for daily use',
  'Supports local Himalayan farming communities',
];

function matchTemplate(productName) {
  const key = productName.toLowerCase();
  return Object.values(TEMPLATES).find((t) => t.match(key)) || null;
}

function generateMockDescription(input) {
  const { productName, ingredients, category, tone } = input;
  const matched = matchTemplate(productName);

  const title = matched
    ? pick(matched.titles)
    : `${productName} — Premium ${category} from the Himalayas`;

  const shortDescription = matched
    ? pick(matched.shortDescriptions)
    : `Discover ${productName}, crafted with ${ingredients} using traditional Himalayan methods. A ${tone} choice for everyday wellness.`;

  const longDescription = `${productName} brings the purity of the Himalayas to your table. Made with ${ingredients}, this ${(matched?.category || category).toLowerCase()} product is crafted in small batches to preserve authentic flavor and nutrition. Perfect for households seeking natural, additive-free options rooted in tradition.`;

  const bullets = [
    `Made with ${ingredients}`,
    ...(matched ? matched.bulletExtras : []),
    ...GENERIC_BULLETS,
  ];
  const uniqueBullets = [...new Set(bullets)];
  const bulletCount = 5 + Math.floor(Math.random() * 3); // 5, 6, or 7
  const bulletPoints = uniqueBullets.slice(0, bulletCount);

  const seoKeywords = [
    productName.toLowerCase(),
    (matched?.category || category).toLowerCase(),
    'himalayan',
    'natural',
    'traditional',
    'healthy snack',
    'uttarakhand',
    'pahadi',
  ];

  return {
    title,
    shortDescription,
    longDescription,
    bulletPoints,
    seoKeywords,
    usageStorage:
      'Store in a cool, dry place away from direct sunlight. Consume within 3 months of opening for best taste.',
  };
}

module.exports = { generateMockDescription };
