import fujiyoshida from "@img/tours/classic/Fujiyoshida-Yamanashi.jpg";
import asakusa from "@img/tours/classic/Asakusa-SensoJiTemple.jpg"
import kinkakuJi from "@img/tours/classic/Kinkaku-ji.jpg"
import todiaJi from "@img/tours/classic/Todia-jiTemple.jpg"

import hakone from "@img/tours/adventure/Hakone.jpg";
import lakeAshi from "@img/tours/adventure/LakeAshi.jpg";
import shijuku from "@img/tours/adventure/Shijuku.jpg";
import uenoPark from "@img/tours/adventure/UenoPark.jpg";

import osakaCastle from "@img/tours/cultural/OsakaCastle.jpg";
import dotonburi from "@img/tours/cultural/Dotonbori.jpg";
import hiroshima from "@img/tours/cultural/Hiroshima-Peace-Memorial.jpg";
import kiyomizu from "@img/tours/cultural/Kiyomizu-DeraTemple.jpg";

interface Photo {
  name: string
  img: string
}

interface Itinerary {
  day: number
  title: string
  events: string[]
}

export interface TourType {
  id: string
  description: string
  name: string
  imgCover: any
  photos: Photo[]
  price: number
  privateGuide: number
  duration: string
  itinerary: Itinerary[]

}

const tours: TourType[]  = [
  {
    id: "classic",
    description:
      "Experience the best of traditional and modern Japan with this balanced tour.",
    name: "Classic Japan (Tokyo & Kyoto)",
    imgCover: fujiyoshida,
    photos: [
      {name: "Asakusa-Sensoji Temple", img: asakusa},
      {name: "Kinkaku-Ji", img: kinkakuJi},
      {name: "Todia-Ji Temple", img: todiaJi},
    ],
    price: 26300,
    privateGuide: 28000,
    duration: "5 Days",
    itinerary: [
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
    id: "adventure",
    name: "Adventure & Nature (Tokyo, Hakone & Mt. Fuji)",
    description: "A perfect tour for nature lovers and adventure seekers.",
    imgCover: hakone,
    photos: [
      {name: "Lake Ashi", img: lakeAshi},
      {name: "Shijuku", img: shijuku},
      {name: "Ueno Park", img: uenoPark},
    ],
    price: 28000,
    privateGuide: 30000,
    duration: "5 Days",
    itinerary: [
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
    id: "cultural",
    name: "Cultural & Food Tour (Osaka, Kyoto & Hiroshima)",
    description:
      "A tour focused on rich culture and the best Japanese cuisine.",
    imgCover: osakaCastle,
    photos: [
      {name: "Dotonbori", img: dotonburi},
      {name: "Hiroshima-Peace Memorial", img: hiroshima},
      {name: "Kiyomizu-Dera Temple", img: kiyomizu},
    ],
    price: 29300,
    privateGuide: 31500,
    duration: "5 Days",
    itinerary: [
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

export default tours;
