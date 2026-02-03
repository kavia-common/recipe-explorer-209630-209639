/**
 * Local seed data for the frontend-only recipe app.
 * Images use inline SVG data URLs so the app runs fully offline with no backend.
 */

/** Build a lightweight inline SVG “photo card” data URL for a given recipe name. */
function svgDataUrl(title, hue = 210) {
  const safe = String(title).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="hsl(${hue} 90% 62%)" stop-opacity="0.9"/>
        <stop offset="1" stop-color="hsl(${(hue + 35) % 360} 85% 60%)" stop-opacity="0.9"/>
      </linearGradient>
      <filter id="n">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0.2"/>
        <feComponentTransfer>
          <feFuncA type="table" tableValues="0 0.22"/>
        </feComponentTransfer>
      </filter>
    </defs>

    <rect width="1200" height="750" rx="40" fill="url(#g)" />
    <rect width="1200" height="750" rx="40" filter="url(#n)" opacity="0.35" />

    <g opacity="0.22">
      <path d="M80 520 C 260 360, 360 600, 520 470 S 850 400, 1120 520" fill="none" stroke="white" stroke-width="10"/>
      <path d="M100 610 C 320 500, 420 690, 620 580 S 930 510, 1100 620" fill="none" stroke="white" stroke-width="8"/>
    </g>

    <g>
      <rect x="78" y="520" width="1044" height="150" rx="28" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.28)" />
      <text x="110" y="585" fill="white" font-family="Inter, system-ui, sans-serif" font-weight="800" font-size="44" letter-spacing="-0.02em">${safe}</text>
      <text x="112" y="635" fill="rgba(255,255,255,0.86)" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-weight="700" font-size="20">Retro Recipe Explorer • offline seed image</text>
    </g>
  </svg>`.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

/**
 * Schema:
 * - id: slug string used for routing
 * - title, description
 * - cuisine, difficulty
 * - timeMinutes, rating, servings
 * - tags: string[]
 * - ingredients: { item: string, qty?: string }[]
 * - steps: string[]
 * - nutrition: { calories, proteinG, carbsG, fatG }
 */
export const RECIPES = [
  {
    id: "miso-ginger-ramen",
    title: "Miso-Ginger Ramen",
    description: "Cozy bowl with miso broth, ginger kick, and quick toppings.",
    cuisine: "Japanese",
    difficulty: "Easy",
    timeMinutes: 25,
    rating: 4.6,
    servings: 2,
    tags: ["noodles", "comfort", "umami", "weeknight"],
    image: svgDataUrl("Miso-Ginger Ramen", 210),
    ingredients: [
      { qty: "2 packs", item: "fresh ramen noodles" },
      { qty: "3 cups", item: "vegetable broth" },
      { qty: "1 tbsp", item: "white miso" },
      { qty: "1 tsp", item: "grated ginger" },
      { qty: "1", item: "garlic clove, minced" },
      { qty: "1 tbsp", item: "soy sauce" },
      { qty: "1 tsp", item: "sesame oil" },
      { qty: "1 cup", item: "baby spinach" },
      { qty: "2", item: "soft-boiled eggs" },
      { qty: "to serve", item: "scallions & chili crisp" }
    ],
    steps: [
      "Simmer broth with miso, ginger, garlic, soy sauce, and sesame oil for 8 minutes.",
      "Cook ramen noodles according to package directions and divide into bowls.",
      "Add spinach to the broth to wilt for 30 seconds.",
      "Pour broth over noodles and top with egg, scallions, and chili crisp."
    ],
    nutrition: { calories: 520, proteinG: 22, carbsG: 68, fatG: 18 }
  },
  {
    id: "street-corn-tacos",
    title: "Street Corn Tacos",
    description: "Charred corn, lime crema, and crunchy slaw in warm tortillas.",
    cuisine: "Mexican",
    difficulty: "Easy",
    timeMinutes: 20,
    rating: 4.7,
    servings: 3,
    tags: ["tacos", "vegetarian", "quick", "zesty"],
    image: svgDataUrl("Street Corn Tacos", 32),
    ingredients: [
      { qty: "8", item: "corn tortillas" },
      { qty: "2 cups", item: "corn kernels (fresh/frozen)" },
      { qty: "1 tbsp", item: "olive oil" },
      { qty: "1/2 cup", item: "shredded cabbage" },
      { qty: "1", item: "lime (zest + juice)" },
      { qty: "1/3 cup", item: "Greek yogurt" },
      { qty: "2 tbsp", item: "mayo" },
      { qty: "1/2 tsp", item: "chili powder" },
      { qty: "to serve", item: "cilantro & feta/queso fresco" }
    ],
    steps: [
      "Sear corn in a hot skillet with oil until lightly charred.",
      "Mix yogurt, mayo, lime, chili powder, and a pinch of salt for crema.",
      "Warm tortillas, add cabbage, charred corn, drizzle crema, and top with herbs/cheese."
    ],
    nutrition: { calories: 410, proteinG: 14, carbsG: 54, fatG: 15 }
  },
  {
    id: "caprese-pasta-salad",
    title: "Caprese Pasta Salad",
    description: "Cherry tomatoes, basil, mozzarella, and balsamic gloss—picnic ready.",
    cuisine: "Italian",
    difficulty: "Easy",
    timeMinutes: 18,
    rating: 4.4,
    servings: 4,
    tags: ["pasta", "picnic", "fresh", "make-ahead"],
    image: svgDataUrl("Caprese Pasta Salad", 140),
    ingredients: [
      { qty: "12 oz", item: "short pasta (fusilli/penne)" },
      { qty: "1.5 cups", item: "cherry tomatoes, halved" },
      { qty: "1 cup", item: "mozzarella pearls" },
      { qty: "1/2 cup", item: "fresh basil leaves" },
      { qty: "2 tbsp", item: "olive oil" },
      { qty: "1 tbsp", item: "balsamic glaze" },
      { qty: "1", item: "garlic clove, grated" }
    ],
    steps: [
      "Cook pasta, rinse briefly under cool water, and drain well.",
      "Toss pasta with olive oil, garlic, tomatoes, mozzarella, and basil.",
      "Finish with balsamic glaze and season with salt/pepper."
    ],
    nutrition: { calories: 480, proteinG: 18, carbsG: 62, fatG: 17 }
  },
  {
    id: "butter-chicken-lite",
    title: "Butter Chicken (Lite)",
    description: "Creamy, spiced tomato curry with a lighter yogurt finish.",
    cuisine: "Indian",
    difficulty: "Medium",
    timeMinutes: 35,
    rating: 4.8,
    servings: 4,
    tags: ["curry", "protein", "family", "comfort"],
    image: svgDataUrl("Butter Chicken (Lite)", 18),
    ingredients: [
      { qty: "1.5 lb", item: "chicken thighs, bite-size" },
      { qty: "1 tbsp", item: "garam masala" },
      { qty: "1 tsp", item: "turmeric" },
      { qty: "1 tsp", item: "cumin" },
      { qty: "1", item: "onion, diced" },
      { qty: "2 tbsp", item: "butter" },
      { qty: "1 can", item: "crushed tomatoes" },
      { qty: "1/2 cup", item: "plain yogurt" },
      { qty: "to serve", item: "rice + cilantro" }
    ],
    steps: [
      "Season chicken with spices and a pinch of salt. Sear until browned.",
      "Sauté onion in butter until soft. Add tomatoes and simmer 10 minutes.",
      "Return chicken, simmer until cooked through, then stir in yogurt off-heat.",
      "Serve with rice and cilantro."
    ],
    nutrition: { calories: 540, proteinG: 42, carbsG: 22, fatG: 31 }
  },
  {
    id: "mediterranean-bowl",
    title: "Mediterranean Power Bowl",
    description: "Hummus, cucumber, chickpeas, and herby quinoa with lemon.",
    cuisine: "Mediterranean",
    difficulty: "Easy",
    timeMinutes: 22,
    rating: 4.5,
    servings: 2,
    tags: ["bowl", "healthy", "meal-prep", "vegetarian"],
    image: svgDataUrl("Mediterranean Power Bowl", 175),
    ingredients: [
      { qty: "1 cup", item: "cooked quinoa" },
      { qty: "1 cup", item: "chickpeas (rinsed)" },
      { qty: "1/2", item: "cucumber, chopped" },
      { qty: "1/2 cup", item: "cherry tomatoes, halved" },
      { qty: "1/2 cup", item: "hummus" },
      { qty: "1", item: "lemon (juice)" },
      { qty: "2 tbsp", item: "olive oil" },
      { qty: "to serve", item: "feta + parsley" }
    ],
    steps: [
      "Mix quinoa with lemon juice, olive oil, salt, and pepper.",
      "Assemble bowls with quinoa, chickpeas, veggies, and hummus.",
      "Top with feta and parsley."
    ],
    nutrition: { calories: 610, proteinG: 22, carbsG: 74, fatG: 25 }
  },
  {
    id: "korean-bibimbap-shortcut",
    title: "Shortcut Bibimbap",
    description: "Crispy rice, quick sautéed veg, and gochujang drizzle.",
    cuisine: "Korean",
    difficulty: "Medium",
    timeMinutes: 28,
    rating: 4.6,
    servings: 2,
    tags: ["rice", "spicy", "one-pan", "colorful"],
    image: svgDataUrl("Shortcut Bibimbap", 290),
    ingredients: [
      { qty: "2 cups", item: "cooked rice (day-old best)" },
      { qty: "1 cup", item: "carrot matchsticks" },
      { qty: "1 cup", item: "spinach" },
      { qty: "1 cup", item: "mushrooms, sliced" },
      { qty: "2", item: "eggs" },
      { qty: "2 tbsp", item: "gouchujang" },
      { qty: "1 tbsp", item: "soy sauce" },
      { qty: "1 tsp", item: "sesame oil" }
    ],
    steps: [
      "Pan-fry rice until crisp in spots; set aside.",
      "Quick-sauté veggies separately with a pinch of salt.",
      "Fry eggs sunny-side up.",
      "Mix gochujang, soy sauce, and sesame oil; assemble bowls and drizzle."
    ],
    nutrition: { calories: 680, proteinG: 24, carbsG: 98, fatG: 20 }
  },
  {
    id: "greek-lemon-potatoes",
    title: "Greek Lemon Potatoes",
    description: "Roasty edges, lemony center—weekend side that steals the show.",
    cuisine: "Greek",
    difficulty: "Easy",
    timeMinutes: 45,
    rating: 4.3,
    servings: 4,
    tags: ["side", "roasted", "lemon", "herbs"],
    image: svgDataUrl("Greek Lemon Potatoes", 55),
    ingredients: [
      { qty: "2 lb", item: "baby potatoes, halved" },
      { qty: "3 tbsp", item: "olive oil" },
      { qty: "1", item: "lemon (juice + wedges)" },
      { qty: "2 tsp", item: "dried oregano" },
      { qty: "3", item: "garlic cloves, smashed" },
      { qty: "1/2 cup", item: "vegetable broth" }
    ],
    steps: [
      "Heat oven to 425°F (220°C). Toss potatoes with oil, lemon juice, oregano, garlic, salt, and pepper.",
      "Add broth to the pan and roast 35–40 minutes, flipping once.",
      "Finish with lemon wedges and extra oregano."
    ],
    nutrition: { calories: 320, proteinG: 6, carbsG: 44, fatG: 14 }
  },
  {
    id: "salmon-citrus-glaze",
    title: "Citrus-Glazed Salmon",
    description: "Sweet-tang glaze with crisped edges—fast and fancy.",
    cuisine: "American",
    difficulty: "Easy",
    timeMinutes: 17,
    rating: 4.7,
    servings: 2,
    tags: ["seafood", "quick", "glaze", "high-protein"],
    image: svgDataUrl("Citrus-Glazed Salmon", 200),
    ingredients: [
      { qty: "2", item: "salmon fillets" },
      { qty: "1 tbsp", item: "soy sauce" },
      { qty: "1 tbsp", item: "orange juice" },
      { qty: "1 tsp", item: "honey" },
      { qty: "1 tsp", item: "Dijon mustard" },
      { qty: "1 tsp", item: "olive oil" }
    ],
    steps: [
      "Whisk soy sauce, orange juice, honey, and Dijon.",
      "Sear salmon in oil 3–4 minutes per side (or until desired doneness).",
      "Pour in glaze and simmer 30–60 seconds to thicken; spoon over salmon."
    ],
    nutrition: { calories: 460, proteinG: 39, carbsG: 12, fatG: 28 }
  },
  {
    id: "thai-peanut-noodles",
    title: "Thai Peanut Noodles",
    description: "Creamy peanut sauce, crunchy veg, and lime—no takeout needed.",
    cuisine: "Thai",
    difficulty: "Easy",
    timeMinutes: 20,
    rating: 4.5,
    servings: 3,
    tags: ["noodles", "sauce", "vegetarian", "quick"],
    image: svgDataUrl("Thai Peanut Noodles", 12),
    ingredients: [
      { qty: "10 oz", item: "rice noodles" },
      { qty: "3 tbsp", item: "peanut butter" },
      { qty: "1 tbsp", item: "soy sauce" },
      { qty: "1 tbsp", item: "lime juice" },
      { qty: "1 tsp", item: "maple syrup" },
      { qty: "1", item: "garlic clove, grated" },
      { qty: "1 cup", item: "shredded carrots" },
      { qty: "1", item: "cucumber, ribbons" }
    ],
    steps: [
      "Cook noodles; rinse and set aside.",
      "Whisk peanut butter, soy sauce, lime, maple syrup, garlic, and a splash of hot water until silky.",
      "Toss noodles with sauce and veggies; top with crushed peanuts if you like."
    ],
    nutrition: { calories: 590, proteinG: 16, carbsG: 82, fatG: 24 }
  },
  {
    id: "shakshuka-skillet",
    title: "Shakshuka Skillet",
    description: "Eggs poached in spiced tomato sauce—brunch classic.",
    cuisine: "Middle Eastern",
    difficulty: "Medium",
    timeMinutes: 30,
    rating: 4.6,
    servings: 3,
    tags: ["eggs", "one-pan", "brunch", "spiced"],
    image: svgDataUrl("Shakshuka Skillet", 8),
    ingredients: [
      { qty: "1 tbsp", item: "olive oil" },
      { qty: "1", item: "onion, sliced" },
      { qty: "1", item: "bell pepper, sliced" },
      { qty: "2", item: "garlic cloves, minced" },
      { qty: "1 tsp", item: "paprika" },
      { qty: "1/2 tsp", item: "cumin" },
      { qty: "1 can", item: "crushed tomatoes" },
      { qty: "6", item: "eggs" }
    ],
    steps: [
      "Sauté onion and pepper in oil until soft. Add garlic and spices for 30 seconds.",
      "Add tomatoes and simmer 10 minutes. Season well.",
      "Make small wells, crack in eggs, cover and cook until whites set.",
      "Serve with warm bread and herbs."
    ],
    nutrition: { calories: 360, proteinG: 20, carbsG: 22, fatG: 22 }
  },
  {
    id: "chocolate-banana-oats",
    title: "Chocolate Banana Overnight Oats",
    description: "Dessert-y breakfast with cocoa, banana, and a pinch of salt.",
    cuisine: "Breakfast",
    difficulty: "Easy",
    timeMinutes: 10,
    rating: 4.2,
    servings: 1,
    tags: ["breakfast", "make-ahead", "sweet", "no-cook"],
    image: svgDataUrl("Chocolate Banana Oats", 330),
    ingredients: [
      { qty: "1/2 cup", item: "rolled oats" },
      { qty: "2/3 cup", item: "milk (dairy/alt)" },
      { qty: "1 tbsp", item: "cocoa powder" },
      { qty: "1 tsp", item: "maple syrup" },
      { qty: "1/2", item: "banana, sliced" },
      { qty: "1 tbsp", item: "chia seeds (optional)" }
    ],
    steps: [
      "Stir oats, milk, cocoa, syrup, and chia seeds in a jar.",
      "Refrigerate overnight (or at least 4 hours).",
      "Top with banana slices and a pinch of flaky salt."
    ],
    nutrition: { calories: 420, proteinG: 14, carbsG: 62, fatG: 12 }
  },
  {
    id: "veggie-fried-rice",
    title: "Veggie Fried Rice",
    description: "High-heat stir fry with crisp veg and salty-sweet sauce.",
    cuisine: "Chinese",
    difficulty: "Easy",
    timeMinutes: 18,
    rating: 4.4,
    servings: 3,
    tags: ["rice", "stir-fry", "quick", "pantry"],
    image: svgDataUrl("Veggie Fried Rice", 95),
    ingredients: [
      { qty: "3 cups", item: "cooked rice (cold)" },
      { qty: "1 cup", item: "mixed veggies (peas/carrots/corn)" },
      { qty: "2", item: "eggs, beaten" },
      { qty: "2 tbsp", item: "soy sauce" },
      { qty: "1 tsp", item: "sesame oil" },
      { qty: "2", item: "scallions, sliced" }
    ],
    steps: [
      "Scramble eggs in a hot pan; remove.",
      "Stir-fry veggies, then add rice and toss until hot.",
      "Add soy sauce and sesame oil; fold in eggs and scallions."
    ],
    nutrition: { calories: 520, proteinG: 18, carbsG: 82, fatG: 14 }
  }
];

export const RECIPE_INDEX_BY_ID = new Map(RECIPES.map(r => [r.id, r]));
