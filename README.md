# TourEase - AI-Powered Travel Assistant Platform

<div align="center">
  <img src="public/images/logos/tourease-logo.png" alt="TourEase Logo" width="200px" />
  <p>Your intelligent travel companion for seamless journey planning and exploration</p>
</div>

## 🌍 Overview

TourEase is a comprehensive travel platform that combines AI-powered trip planning, personalized recommendations, budget tracking, and social features to create a holistic travel experience. Our mission is to make travel planning effortless, enjoyable, and tailored to each traveler's unique preferences.

## ✨ Features

### Core Features
- **AI Trip Planner**: Generate personalized itineraries based on your preferences, travel style, and destination
- **Destination Explorer**: Discover new places with immersive 3D galleries and interactive maps
- **Budget Management**: Track expenses, convert currencies, and plan your travel budget
- **Packing Checklist**: Smart packing lists customized to your destination and trip type
- **Weather Forecasts**: 5-day weather predictions for any destination
- **Travel Social Feed**: Share your experiences and discover others' journeys
- **Tour Guide Directory**: Find and connect with local guides at your destination
- **Emergency Assistance**: Quick access to emergency services and contacts while traveling
- **Offline Access**: Essential features available without an internet connection

### Premium Features 🌟
- **Travel Style Quiz**: AI-powered personality assessment for hyper-personalized travel recommendations
- **AR Destination Preview**: Experience destinations in augmented reality before you visit
- **Collaborative Trip Planning**: Real-time multi-user trip planning with chat and voting features
- **Smart Budget Optimizer**: ML-powered budget suggestions based on your travel style and past trips
- **Travel Achievements**: Gamified travel experience with badges, rewards, and exclusive perks

## 🧱 Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion, Shadcn UI |
| **State Management** | Zustand, React Context |
| **Backend** | FastAPI (Python), Firebase Functions |
| **Database** | Firebase Firestore |
| **Authentication** | Firebase Auth |
| **AI** | Google Gemini API |
| **Maps** | OpenStreetMap + Leaflet.js |
| **Weather** | OpenWeatherMap API |
| **Deployment** | Vercel (Frontend), Firebase/Railway (Backend) |

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Python 3.9+ (for backend development)
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/tourease.git
cd tourease
```

2. **Install dependencies**

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
pip install -r requirements.txt
cd ..
```

3. **Environment setup**

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

4. **Start development server**

```bash
# Start frontend
npm run dev

# Start backend (in a separate terminal)
cd backend
python -m uvicorn main:app --reload
```

5. **Access the application**

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

TourEase follows a clean, feature-based architecture for maintainability and scalability:

```
tourease/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Authentication pages
│   ├── (dashboard)/        # Dashboard pages
│   ├── (marketing)/        # Public-facing pages
│   └── api/                # API routes
├── components/             # Reusable components
│   ├── features/           # Feature components (organized by domain)
│   ├── ui/                 # UI components (shadcn/ui)
│   └── layout/             # Layout components
├── context/                # React context providers
├── hooks/                  # Custom React hooks
├── lib/                    # Utility libraries
│   ├── api/                # API utilities
│   ├── utils/              # Utility functions
│   └── types/              # TypeScript types
├── public/                 # Static assets
└── backend/                # Backend code
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📦 Building for Production

```bash
# Build frontend
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please follow our [contribution guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - UI components
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [FastAPI](https://fastapi.tiangolo.com/) - Modern, fast web framework for Python
- [Firebase](https://firebase.google.com/) - Backend services
- [Google Gemini API](https://ai.google.dev/) - AI capabilities