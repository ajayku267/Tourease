# TourEase - AI-Powered Travel Assistant Platform

## 🌍 Project Vision
TourEase is a web-based platform where users can:
- Automatically plan personalized itineraries using AI
- Explore places using smart recommendations
- Track budgets and packing lists
- Interact socially with a feed, posts, and comments
- Use real-time weather, currency conversion, maps, and emergency tools
- Access a chatbot travel assistant
- Enjoy modern UI, animations, and offline support

## 🧱 Technology Stack (Free/Open-Source Only)
| Layer | Tool/Service |
|-------|-------------|
| Frontend | Next.js 14, Tailwind CSS, Framer Motion, Shadcn UI, Zustand |
| Backend | Firebase Functions / Node.js + Express (on Railway/Firebase) |
| Auth | Firebase Authentication (Google OAuth) |
| DB | Firestore (or MongoDB Atlas) |
| AI | Gemini API (via Firebase Extensions or REST API) |
| Maps | OpenStreetMap + Leaflet.js |
| Weather | OpenWeatherMap API |
| Storage | Firebase Storage / Imgur API |
| Media | Cloudinary (Free Tier) |
| Analytics | Google Analytics / PostHog (Free) |
| Offline | Next PWA Plugin + Workbox |
| AR | AR.js (JavaScript AR library) |
| Translation | i18next |
| Currency API | ExchangeRate.host (Free API) |

## 📅 Phase-Based Roadmap

### ✅ Phase 1 – MVP (Week 1–3)
Core travel planning features
- 🧭 User login/signup with Firebase Auth
- 📍 Trip dashboard: create/view trips
- 🤖 AI itinerary generator using Gemini Pro
- 🗺️ Interactive Map with OpenStreetMap + Leaflet.js
- ⛅ Weather forecast using OpenWeatherMap
- 💸 Budget estimator with pie chart (Recharts)
- 💬 Responsive frontend with Tailwind & Framer Motion

### ✨ Phase 2 – Personalization & AI Magic (Week 4–6)
Tailored user experience + more AI
- 🧠 AI chatbot assistant (Gemini with voice input)
- 📋 Smart packing checklist
- 📅 Travel style quiz → personalized plans
- 🧾 Saved trip history with filtering
- 🎯 Personalized recommendations based on travel type
- 🔍 State management using Zustand

### 🌐 Phase 3 – Social Travel & Sharing (Week 7–9)
Sharing journeys, interacting socially
- 🧍‍♂️ User profile: trips, followers, liked posts
- 🧵 Travel feed: scrollable posts with images
- 📝 Post creator: write trip logs, add images & captions
- ❤️ Like, 💬 Comment, 🔔 Notifications (Firebase)
- 🗂️ Trip gallery with tags, filters
- 🔄 Social sharing + SEO-friendly URLs

### 🧠 Phase 4 – Utility, Offline & Innovation (Week 10–12)
Enhance user safety, offline access, and fun
- 🛑 Emergency SOS with geolocation
- 🌐 Language translation (i18next)
- 🧭 AR tour mode (AR.js)
- 🧾 Currency converter using free API
- 💻 Installable PWA with offline mode (Workbox)
- 📈 Admin dashboard for user/posts monitoring
- 📊 Analytics: Google Analytics or PostHog

## 💻 Frontend UI Components

### 🔹 Phase 1 Components
- LandingPage: Hero section, testimonials, CTAs
- Navbar + MobileNavDrawer
- TripCard (destination + summary)
- ItineraryBuilder (drag & drop days)
- MapView (OpenStreetMap + filters)
- WeatherWidget
- BudgetCalculator (pie chart)
- LoginModal (toggle login/register)
- Loader (loading UI)

### 🔹 Phase 2 Components
- AIChatbotWidget (voice + text)
- PackingChecklist
- TripTimeline (vertical visual plan)
- SavedTripsGallery
- TravelStyleQuiz
- PlaceDetailsPopup

### 🔹 Phase 3 Components
- UserProfile
- TravelFeed
- PostCreator
- LikeButton, CommentSection
- NotificationBell

### 🔹 Phase 4 Components
- EmergencySOSButton
- LanguageSwitcher
- CurrencyConverter
- ARModeToggle
- PWAInstallPrompt
- AdminDashboard

## 🎨 Design & Interaction Guidelines
- Use Glassmorphism cards with soft shadows
- Smooth page transitions with Framer Motion
- Responsive, mobile-first design
- Bottom navigation for mobile
- Toasts for notifications (Shadcn UI)
- AR mode accessible from a floating toggle
- All components reusable and scalable

## 🎯 UI Design Inspiration
Our design is inspired by the provided reference images including:
- Rental booking interface with vehicle/product selection
- Travel destination showcases featuring locations like Bali, Vietnam, Indonesia
- Dashboard-style travel planner with journey tracking
- Category-based travel exploration with interactive elements

## 📚 Development Guidelines
1. Follow component-based architecture
2. Implement responsive design for all screen sizes
3. Use TypeScript for type safety
4. Maintain a consistent color palette and design system
5. Focus on accessibility and performance
6. Implement proper error handling and loading states
7. Follow best practices for SEO optimization
8. Write unit and integration tests 