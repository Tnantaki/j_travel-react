import type { PlanType } from "./type";

export const BACKEND_URL = "http://localhost:3000/api/";
const PASSWORD = "12345678";

export const adminData = {
  email: "admin@email.com",
  password: PASSWORD,
  token: "",
  id: "",
  name: "admin scotland",
  imgPath: "./utils/profiles/admin.png",
};

export const userDatas = [
  {
    email: "mos1@email.com",
    password: PASSWORD,
    token: "",
    id: "",
    name: "mos1 america",
    imgPath: "./utils/profiles/profile1.png",
  },
  {
    email: "mos2@email.com",
    password: PASSWORD,
    token: "",
    id: "",
    name: "mos2 thailand",
    imgPath: "./utils/profiles/profile2.png",
  },
  {
    email: "mos3@email.com",
    password: PASSWORD,
    token: "",
    id: "",
    name: "mos3 british",
    imgPath: "./utils/profiles/profile3.png",
  },
  {
    email: "test1@email.com",
    password: PASSWORD,
    token: "",
    id: "",
    name: "test1 japan",
    imgPath: "./utils/profiles/profile4.png",
  },
  {
    email: "test2@email.com",
    password: PASSWORD,
    token: "",
    id: "",
    name: "test2 india",
    imgPath: "./utils/profiles/profile5.png",
  },
];

export const planDatas: PlanType[] = [
  {
    type: "private",
    title: "Classic Japan (Tokyo & Kyoto)",
    description:
      "Experience the best of traditional and modern Japan with this balanced tour.",
    price: 26300,
    duration: 5,
    images: [
      {
        name: "Fujiyoshida",
        path: "./utils/plans/classic/Fujiyoshida-Yamanashi.jpg",
      },
      {
        name: "Asakusa-Sensoji Temple",
        path: "./utils/plans/classic/Asakusa-SensoJiTemple.jpg",
      },
      { name: "Kinkaku-Ji", path: "./utils/plans/classic/Kinkaku-ji.jpg" },
      {
        name: "Todia-Ji Temple",
        path: "./utils/plans/classic/Todia-jiTemple.jpg",
      },
    ],
    schedules: [
      {
        day: 1,
        title: "Arrival in Tokyo & City Exploration",
        events: [
          "Arrival at Narita/Haneda Airport & Transfer to Hotel",
          "Visit Asakusa & Sensō-ji Temple",
          "Explore Akihabara (Anime, Gaming, and Electronics District)",
          "Dinner at a local Sushi restaurant",
        ],
      },
      {
        day: 2,
        title: "Tokyo Highlights",
        events: [
          "Morning at Shibuya & Hachiko Statue",
          "Shopping & fashion at Harajuku & Takeshita Street",
          "Visit Meiji Shrine",
          "Evening city view at Tokyo Tower or Shibuya Sky",
        ],
      },
      {
        day: 3,
        title: "Travel to Kyoto & Cultural Exploration",
        events: [
          "Take Shinkansen (Bullet Train) to Kyoto",
          "Visit Kinkaku-ji (Golden Pavilion)",
          "Walk through the Arashiyama Bamboo Forest",
          "Experience a Traditional Tea Ceremony",
        ],
      },
      {
        day: 4,
        title: "Kyoto & Nara Day Trip",
        events: [
          "Morning at Fushimi Inari Shrine (Thousands of Torii Gates)",
          "Travel to Nara & meet the friendly deer at Nara Park",
          "Explore Tōdai-ji Temple (Giant Buddha Statue)",
          "Return to Kyoto and explore Gion (Geisha District)",
        ],
      },
      {
        day: 5,
        title: "Departure from Kyoto to Tokyo",
        events: [
          "Free time in Kyoto Nishiki Market for last-minute shopping",
          "Transfer to Tokyo/Narita/Haneda Airport for departure",
        ],
      },
    ],
  },
  {
    type: "private",
    title: "Adventure & Nature (Tokyo, Hakone & Mt. Fuji)",
    description: "A perfect tour for nature lovers and adventure seekers.",
    price: 28000,
    duration: 5,
    images: [
      { name: "Hokone", path: "./utils/plans/adventure/Hakone.jpg" },
      { name: "Lake Ashi", path: "./utils/plans/adventure/LakeAshi.jpg" },
      { name: "Shijuku", path: "./utils/plans/adventure/Shijuku.jpg" },
      { name: "Ueno Park", path: "./utils/plans/adventure/UenoPark.jpg" },
    ],
    schedules: [
      {
        day: 1,
        title: "Arrival & Tokyo Exploration",
        events: [
          "Arrival at Narita/Haneda Airport & Transfer to Hotel",
          "Visit Shinjuku & Kabukicho District",
          "Enjoy a panoramic view from Metropolitan Government Building",
          "Experience Robot Restaurant Show",
        ],
      },
      {
        day: 2,
        title: "Tokyo & TeamLab Planets",
        events: [
          "Morning at Tsukiji Outer Market (Fresh seafood experience)",
          "Explore TeamLab Planets (Digital Art Museum)",
          "Discover Odaiba (Gundam Statue & Palette Town)",
          "Evening cruise at Tokyo Bay",
        ],
      },
      {
        day: 3,
        title: "Hakone & Onsen Experience",
        events: [
          "Travel to Hakone (Hot Springs & Nature)",
          "Ride the Hakone Ropeway & see Owakudani (Volcanic Valley)",
          "Enjoy a Lake Ashi Cruise with Mt. Fuji View",
          "Relax in a traditional Ryokan & Onsen experience",
        ],
      },
      {
        day: 4,
        title: "Mt. Fuji Exploration",
        events: [
          "Travel to Mt. Fuji 5th Station for scenic views",
          "Visit the Chureito Pagoda (Iconic Fuji View)",
          "Explore Fujiyoshida Sengen Shrine",
          "Return to Tokyo and enjoy nightlife at Roppongi",
        ],
      },
      {
        day: 5,
        title: "Shopping & Departure",
        events: [
          "Morning shopping at Ginza or Shibuya",
          "Final visit to Ueno Park & Ameya-Yokocho Market",
          "Transfer to the airport for departure",
        ],
      },
    ],
  },
  {
    type: "private",
    title: "Cultural & Food Tour (Osaka, Kyoto & Hiroshima)",
    description:
      "A tour focused on rich culture and the best Japanese cuisine.",
    price: 29300,
    duration: 5,
    images: [
      { name: "Osaka Castle", path: "./utils/plans/cultural/OsakaCastle.jpg" },
      { name: "Dotonbori", path: "./utils/plans/cultural/Dotonbori.jpg" },
      {
        name: "Hiroshima-Peace Memorial",
        path: "./utils/plans/cultural/Hiroshima-Peace-Memorial.jpg",
      },
      {
        name: "Kiyomizu-Dera Temple",
        path: "./utils/plans/cultural/Kiyomizu-DeraTemple.jpg",
      },
    ],
    schedules: [
      {
        day: 1,
        title: "Arrival in Osaka & Food Adventure",
        events: [
          "Arrival at Kansai International Airport & Transfer to Osaka",
          "Explore Dotonbori (Takoyaki & Okonomiyaki street food)",
          "Visit Shinsekai & Tsutenkaku Tower",
          "Experience Japanese Izakaya Nightlife",
        ],
      },
      {
        day: 2,
        title: "Osaka Castle & Universal Studios Japan",
        events: [
          "Visit the historic Osaka Castle",
          "Enjoy a day at Universal Studios Japan (Harry Potter World, Mario Kart, etc.)",
          "Evening shopping at Shinsaibashi",
        ],
      },
      {
        day: 3,
        title: "Kyoto’s Best Cultural Spots",
        events: [
          "Travel to Kyoto",
          "Explore Kiyomizu-Dera Temple & Higashiyama District",
          "Visit Gion & Yasaka Shrine",
          "Experience Kaiseki Dinner (Traditional Japanese Course Meal)",
        ],
      },
      {
        day: 4,
        title: "Hiroshima & Miyajima Island",
        events: [
          "Take Shinkansen to Hiroshima",
          "Visit Hiroshima Peace Memorial Park & Museum",
          "Ferry to Miyajima Island & See the Floating Torii Gate",
          "Enjoy Oysters & Momiji Manju (Local Sweets)",
          "Return to Osaka",
        ],
      },
      {
        day: 5,
        title: "Final Day & Departure",
        events: [
          "Morning visit to Kuromon Market (Fresh Seafood & Wagyu Beef)",
          "Final shopping in Umeda & Namba District",
          "Transfer to the airport for departure",
        ],
      },
    ],
  },
];
