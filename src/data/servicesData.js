// src/data/servicesData.js
import chilly from "../assets/chilly.jpg";
import pomegranate from "../assets/pomegranate.jpg";
import onions from "../assets/onions.jpg";
import cattle from "../assets/cattle-feed.jpg";
import groundnuts from "../assets/groundnuts.jpg";
import pulses from "../assets/pulses.jpg";

export const services = [
  {
    title: "Nashik Red Onions",
    desc: "Nashik Red Onions are flavor-rich bulbs known for their pungency, vibrant color, and nutritional benefits.",
    details: {
      specs: [
        { label: "Sizes", value: "30-45 mm 45-55 mm 50 mm and above 55-70 mm 60 and above" },
        { label: "Packaging", value: "2.5kg, 3kg, 5kg, 9kg, 10kg, 15kg, 17kg, 18kg, 20kg, 25kg, 30kg Red Mesh Bag or Jute Bag." },
        { label: "Load ability", value: "12.5 MT per 20ft container 28 MT per 40ft Refer container." },
      ],
      description:
        "Grown in the fertile soils of Nashik, these onions are prized for their distinct taste, aroma, and long shelf life. They are a natural source of vitamin C, antioxidants, and sulfur compounds that support immunity and heart health. Their deep red color comes from beneficial flavonoids, which also have protective properties.Widely used in cooking, Nashik Red Onions add flavor, nutrition, and versatility to everyday meals.",
    },
    img: onions,
  },
  {
    title: "Green Chillies & Dry Red Chillies",
    desc: "Green and dry red chillies are spicy condiments packed with vitamins, antioxidants, and natural heat.",
    details: {
      specs: [
        { label: "Color", value: "Green or Red(Dry)" },
        { label: "Packaging Size Available(In Kg/In Ton)", value: "1 Kg, 5 Kg, 10 kg or as required." },
        { label: "Packaging Material ", value: "Red Mesh Bag or Jute Bag or Box Packed." },
        { label: "Container Type", value: "12.5 MT per 20ft container 28 MT per 40ft Refer container." },
      ],
      description:
        "Green chillies provide a fresh, fiery flavor along with vitamin C, vitamin A, and capsaicin for metabolism support. Dry red chillies are rich in carotenoids, iron, and antioxidants that aid digestion and boost immunity. Capsaicin, the compound responsible for their heat, has anti-inflammatory and metabolism-boosting properties.Together, they are essential ingredients that add spice, flavor, and health benefits to cuisines worldwide.",
    },
    img: chilly,
  },
  {
    title: "Pomegranates",
    desc: "Pomegranates are nutrient-dense fruits rich in antioxidants, vitamins, and natural sweetness.",
    details: {
      specs: [
        { label: "Packaging", value: "Net weight of box 2.5kg, 3.00kg, 3.5kg. " },
        { label: "Details", value: "Minimum Weight 180gm, maximum weight 400gm." },
        { label: "Color of arils", value: "Dark Cherry Red." },
        { label: "Taste", value: "Sweet." },
        { label: "Load ability", value: "4400 cartons per container 20 pallets with 220 cartons per pallet OR 5500 cartons per container Loading with No pallets" },
        { label: "Availability", value: "January | February | March | April | July | August | September | October | Nov | Dec." },
      ],
      description:
        "Known as a “superfruit,” pomegranates are loaded with vitamin C, potassium, folate, and dietary fiber. Their jewel-like seeds contain polyphenols and anthocyanins, powerful antioxidants that promote heart health. Regular consumption supports digestion, improves skin health, and helps reduce oxidative stress. With their refreshing taste and health benefits, pomegranates are enjoyed fresh, juiced, or in culinary dishes worldwide.",
    },
    img: pomegranate,
  },
  {
    title: "Pulses and Grains",
    desc: "Pulses and grains are everyday staples that provide protein, energy, fiber, and essential nutrients for a healthy lifestyle.",
    details: {
      specs: [
        { label: "Packaging", value: "Jute Bag, Plastic Bag or as per clients. " },
        { label: "Details", value: "All types of Pulses and Grains." },
        { label: "Moisture", value: "1% to 5%" },
        { label: "Types of Pulses", value: "Green Gram Dal | Split Chickpea Lentils | Black Gram Lentils | Moth Beans | Pigeon Peas | Orange Lentils" },
        { label: "Types of Grains", value: "Wheat | Basmati Rice | Barley | Maize (Corn) | Sorghum (Jowar) | Pearl Millet (Bajra) | Finger Millet (Ragi) | Quinoa | Tapioca." },
      ],
      description:
        "Together, pulses (like lentils, beans, and chickpeas) and grains (such as rice, wheat, and millet) form the foundation of balanced diets worldwide. They supply plant-based protein, complex carbohydrates, dietary fiber, B-vitamins, iron, and magnesium for sustained energy and growth. Bioactive compounds and antioxidants in pulses, along with the fiber in whole grains, support heart health and digestion. Affordable, versatile, and nourishing, pulses and grains remain vital for both nutrition and food security across cultures.",
    },
    img: pulses,
  },
  {
    title: "Groundnuts",
    desc: "Groundnuts are protein-rich legumes valued for their oil, flavor, and nutritional benefits.",
    details: {
      specs: [
        { label: "Form", value: "Loose. " },
        { label: "Type", value: "With Shell or Without Shell" },
        { label: "Packaging Type", value: "Jute or Plastic Sacks." },
        { label: "Packaging Size", value: "50 Kg bags or as per requirements." },
        { label: "Shelf Life", value: "90 Days(Without Refrigeration)" },
        { label: "Oil Contents", value: "48%" },
      ],
      description:
        "Groundnuts, commonly called peanuts, are a rich source of plant-based protein and heart-friendly unsaturated fats. They provide important micronutrients like vitamin E, magnesium, folate, and dietary fiber. Compounds such as resveratrol and antioxidants in groundnuts help protect cells and support overall health. Affordable and versatile, groundnuts are enjoyed in many forms—from roasted snacks to peanut butter and cooking oil.",
    },
    img: groundnuts,
  },
  {
    title: "Cotton Seed Oil Cake",
    desc: "Cotton Seed Oil Cake is a protein-rich byproduct of cottonseed oil extraction, widely used as nutritious cattle feed.",
    details: {
      specs: [
        { label: "Material", value: "Cotton Seeds" },
        { label: "Usage/Application", value: "Cattle Feed" },
        { label: "Shelf Life", value: "8 Months" },
        { label: "Storage Instruction", value: "Store Cool and Dry Place" },
      ],
      description:
        "Cotton Seed Oil Cake provides animals with plant-based protein, fiber, and essential nutrients that support growth and milk production. It contains digestible carbohydrates, minerals like calcium, phosphorus, and iron, and beneficial fatty acids for energy. With its high protein content, it is often mixed with other feed to improve livestock health and productivity. Affordable and widely available, it is a sustainable byproduct that adds value to cotton farming while supporting animal nutrition.",
    },
    img: cattle,
  },
];
