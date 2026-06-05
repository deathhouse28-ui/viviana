const COMPLEX = {
  name: "Комплекс Вивиана",
  tagline: "Вашето идеално място за почивка",
  phone: "+359879427486",
  phoneFormatted: "+359 87 942 7486",
  location: "Цигов Чарк, България",
  mapsUrl: "https://maps.app.goo.gl/mWyyvTvRDH19euba6",

  pricing: {
    withoutBreakfast: 26,
    withBreakfast: 28,
    currency: "€",
    per: "човек / нощ"
  },

  restaurant: { hours: "08:00 – 23:00" },

  amenities: [
    { icon: "fa-person-swimming", name: "Открит басейн" },
    { icon: "fa-hot-tub-person",  name: "Джакузи" },
    { icon: "fa-spa",             name: "Масажорна вана" },
    { icon: "fa-fire",            name: "Сауна" },
    { icon: "fa-child-reaching",  name: "Детска площадка" },
    { icon: "fa-utensils",        name: "Ресторант", detail: "08:00 – 23:00" }
  ],

  /* ── Properties ───────────────────────────────────────────
     images: [] → добавете пътища когато имате снимки:
     ["images/villa-1/photo1.jpg", "images/villa-1/photo2.jpg"]
  ─────────────────────────────────────────────────────────── */
  properties: [
    {
      id: "villa-1", type: "villa", num: 1,
      name: "Вила 1",
      capacity: 4, bedrooms: 2,
      beds: "1 двойно легло + 2 единични легла",
      description: "Уютна вила с модерно обзавеждане и панорамна гледка към природата. Разполага с просторен хол, напълно оборудвана кухня и голяма тераса — идеална за семейна почивка.",
      features: ["Wi-Fi", "Паркинг", "Тераса", "Барбекю"],
      gradient: "linear-gradient(135deg, #0d2137 0%, #1a4a2e 100%)",
      images: []
    },
    {
      id: "villa-2", type: "villa", num: 2,
      name: "Вила 2",
      capacity: 4, bedrooms: 2,
      beds: "1 двойно легло + 2 единични легла",
      description: "Красива вила с уютна атмосфера, перфектна за семейна почивка. Разполага с всички необходими удобства за комфортна ваканция в Цигов Чарк.",
      features: ["Wi-Fi", "Паркинг", "Тераса", "Барбекю"],
      gradient: "linear-gradient(135deg, #112240 0%, #0d3d5a 100%)",
      images: []
    },
    {
      id: "villa-3", type: "villa", num: 3,
      name: "Вила 3",
      capacity: 4, bedrooms: 2,
      beds: "1 двойно легло + 2 единични легла",
      description: "Очарователна вила с топъл интериор и прекрасен изглед. Идеална за незабравима семейна ваканция сред спокойната природа на Родопите.",
      features: ["Wi-Fi", "Паркинг", "Тераса", "Барбекю"],
      gradient: "linear-gradient(135deg, #2d1a0d 0%, #5a3010 100%)",
      images: []
    },
    {
      id: "villa-4", type: "villa", num: 4,
      name: "Вила 4",
      capacity: 4, bedrooms: 2,
      beds: "1 двойно легло + 2 единични легла",
      description: "Стилна вила с елегантен дизайн и всички удобства за комфортна почивка. Просторни стаи и частна тераса с красива гледка.",
      features: ["Wi-Fi", "Паркинг", "Тераса", "Барбекю"],
      gradient: "linear-gradient(135deg, #1a0d3d 0%, #2d1a5a 100%)",
      images: []
    },
    {
      id: "villa-5", type: "villa", num: 5,
      name: "Вила 5",
      capacity: 4, bedrooms: 2,
      beds: "1 двойно легло + 2 единични легла",
      description: "Прекрасна вила, заобиколена от природата на Цигов Чарк. Перфектно място за почивка, презареждане и незабравими семейни спомени.",
      features: ["Wi-Fi", "Паркинг", "Тераса", "Барбекю"],
      gradient: "linear-gradient(135deg, #0d2d0d 0%, #1a5a1a 100%)",
      images: []
    },
    {
      id: "villa-6", type: "villa", num: 6,
      name: "Вила 6",
      capacity: 4, bedrooms: 2,
      beds: "1 двойно легло + 2 единични легла",
      description: "Модерна вила с просторни стаи и красива тераса. Идеална за семейства с деца, търсещи комфорт и уют сред природата.",
      features: ["Wi-Fi", "Паркинг", "Тераса", "Барбекю"],
      gradient: "linear-gradient(135deg, #0d1a3d 0%, #1a2d6a 100%)",
      images: []
    },
    {
      id: "villa-7", type: "villa", num: 7,
      name: "Вила 7",
      capacity: 4, bedrooms: 2,
      beds: "1 двойно легло + 2 единични легла",
      description: "Уединена вила с романтична атмосфера и прекрасен изглед. Вашето лично кътче на рая в Цигов Чарк — за незабравими мигове.",
      features: ["Wi-Fi", "Паркинг", "Тераса", "Барбекю"],
      gradient: "linear-gradient(135deg, #2d1a0d 0%, #5a3a10 100%)",
      images: []
    },
    {
      id: "studio-1", type: "studio", num: 1,
      name: "Студио 1",
      capacity: 2, bedrooms: 1,
      beds: "1 двойно легло",
      description: "Уютно студио за двойки с модерен интериор и всички необходими удобства. Перфектно за романтична почивка на двама.",
      features: ["Wi-Fi", "Паркинг", "Балкон"],
      gradient: "linear-gradient(135deg, #0d2a3d 0%, #1a4a5a 100%)",
      images: []
    },
    {
      id: "studio-2", type: "studio", num: 2,
      name: "Студио 2",
      capacity: 2, bedrooms: 1,
      beds: "1 двойно легло",
      description: "Стилно студио с елегантен дизайн. Идеалното място за двойки, търсещи спокойна и романтична ваканция далеч от ежедневието.",
      features: ["Wi-Fi", "Паркинг", "Балкон"],
      gradient: "linear-gradient(135deg, #2d0d1a 0%, #5a1a2d 100%)",
      images: []
    },
    {
      id: "studio-3", type: "studio", num: 3,
      name: "Студио 3",
      capacity: 2, bedrooms: 1,
      beds: "1 двойно легло",
      description: "Прелестно студио с топла атмосфера. Отдайте се на романтика сред красивата природа на Цигов Чарк и Родопите.",
      features: ["Wi-Fi", "Паркинг", "Балкон"],
      gradient: "linear-gradient(135deg, #0d3d2a 0%, #1a5a3a 100%)",
      images: []
    }
  ]
};
