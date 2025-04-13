# TourEase New Directory Structure

```
project_phase_tourease/
├── .next/                  # Next.js build output
├── app/                    # Next.js App Router
│   ├── (auth)/             # Authentication pages
│   │   ├── login/          # Login page
│   │   ├── register/       # Registration page
│   │   └── layout.tsx      # Auth layout
│   ├── (dashboard)/        # Dashboard pages
│   │   ├── trips/          # Trips dashboard
│   │   ├── profile/        # User profile
│   │   ├── settings/       # User settings
│   │   └── layout.tsx      # Dashboard layout
│   ├── (marketing)/        # Public-facing pages
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact page
│   │   ├── tour-guides/    # Tour guides showcase
│   │   └── layout.tsx      # Marketing layout
│   ├── api/                # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── trips/          # Trip management endpoints
│   │   ├── user/           # User management endpoints
│   │   └── weather/        # Weather API endpoints
│   ├── travel-tools/       # Travel tools pages
│   │   ├── currency/       # Currency converter
│   │   ├── weather/        # Weather forecasts
│   │   ├── packing/        # Packing checklist
│   │   └── emergency/      # Emergency contacts
│   ├── error.tsx           # Error boundary
│   ├── layout.tsx          # Root layout
│   ├── not-found.tsx       # 404 page
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/             # Reusable components
│   ├── auth/               # Authentication components
│   │   ├── LoginForm.tsx   # Login form
│   │   ├── RegisterForm.tsx # Registration form
│   │   └── AuthGuard.tsx   # Authentication guard
│   ├── common/             # Common components
│   │   ├── Footer.tsx      # Footer component
│   │   ├── Header.tsx      # Header component
│   │   ├── Logo.tsx        # Logo component
│   │   └── Navigation.tsx  # Navigation component
│   ├── features/           # Feature components
│   │   ├── ai/             # AI-related features
│   │   │   ├── AIDestinationRecommender.tsx
│   │   │   ├── AIChatbot.tsx
│   │   │   └── TravelStyleQuiz.tsx
│   │   ├── trips/          # Trip-related features
│   │   │   ├── TripPlanner.tsx
│   │   │   ├── TripCard.tsx
│   │   │   ├── NewTripModal.tsx
│   │   │   └── TripTimeline.tsx
│   │   ├── budget/         # Budget-related features
│   │   │   ├── BudgetCalculator.tsx
│   │   │   ├── BudgetPlanner.tsx
│   │   │   └── CurrencyConverter.tsx
│   │   ├── destinations/   # Destination-related features
│   │   │   ├── DestinationCard.tsx
│   │   │   ├── DestinationShowcase.tsx
│   │   │   ├── PopularDestinations.tsx
│   │   │   └── ImmersiveExplorer.tsx
│   │   ├── social/         # Social features
│   │   │   ├── TravelFeed.tsx
│   │   │   ├── PostCreator.tsx
│   │   │   ├── CommentSection.tsx
│   │   │   └── UserProfile.tsx
│   │   ├── tour-guides/    # Tour guide features
│   │   │   ├── TourGuideCard.tsx
│   │   │   ├── TourGuideList.tsx
│   │   │   ├── TourGuideMap.tsx
│   │   │   └── TourGuideProfile.tsx
│   │   ├── weather/        # Weather features
│   │   │   └── WeatherWidget.tsx
│   │   ├── packing/        # Packing features
│   │   │   └── PackingChecklist.tsx
│   │   └── emergency/      # Emergency features
│   │       └── EmergencySOSButton.tsx
│   ├── layout/             # Layout components
│   │   ├── Container.tsx   # Container component
│   │   ├── Section.tsx     # Section component
│   │   ├── Grid.tsx        # Grid component
│   │   └── Sidebar.tsx     # Sidebar component
│   ├── marketing/          # Marketing components
│   │   ├── HeroSection.tsx # Hero section
│   │   ├── FeatureSection.tsx # Feature showcase
│   │   ├── TestimonialsSection.tsx # Testimonials
│   │   └── CTASection.tsx  # Call to action section
│   └── ui/                 # UI components (shadcn/ui)
│       ├── button.tsx      # Button component
│       ├── card.tsx        # Card component
│       ├── dialog.tsx      # Dialog component
│       ├── input.tsx       # Input component
│       └── ...             # Other UI components
├── context/                # React context providers
│   ├── auth-context.tsx    # Authentication context
│   ├── theme-context.tsx   # Theme context
│   └── trip-context.tsx    # Trip management context
├── hooks/                  # Custom React hooks
│   ├── use-auth.ts         # Authentication hook
│   ├── use-trips.ts        # Trips data hook
│   ├── use-media-query.ts  # Media query hook
│   └── use-form.ts         # Form handling hook
├── lib/                    # Utility libraries
│   ├── api/                # API utilities
│   │   ├── client.ts       # API client
│   │   └── endpoints.ts    # API endpoints
│   ├── utils/              # Utility functions
│   │   ├── date.ts         # Date utilities
│   │   ├── format.ts       # Formatting utilities
│   │   ├── validation.ts   # Validation utilities
│   │   └── geocoding.ts    # Geocoding utilities
│   ├── constants.ts        # Constants
│   └── types/              # TypeScript types
│       ├── trip.ts         # Trip-related types
│       ├── user.ts         # User-related types
│       └── api.ts          # API-related types
├── public/                 # Static assets
│   ├── fonts/              # Font files
│   ├── images/             # Image files
│   │   ├── destinations/   # Destination images
│   │   ├── icons/          # Icon images
│   │   └── logos/          # Logo images
│   ├── placeholders/       # Placeholder images
│   └── favicon.ico         # Favicon
├── styles/                 # Style-related files
│   ├── animations.css      # Animation styles
│   ├── theme.ts            # Theme definitions
│   └── variables.css       # CSS variables
├── backend/                # Backend code
│   ├── data/               # Data files and models
│   ├── routers/            # API route handlers
│   │   ├── auth.py         # Authentication routes
│   │   ├── trips.py        # Trip management routes
│   │   ├── users.py        # User management routes
│   │   └── weather.py      # Weather API routes
│   ├── services/           # Business logic services
│   │   ├── auth_service.py # Authentication service
│   │   ├── trip_service.py # Trip service
│   │   └── weather_service.py # Weather service
│   ├── utils/              # Utility functions
│   │   ├── security.py     # Security utilities
│   │   └── validation.py   # Validation utilities
│   ├── main.py             # Main application entry
│   └── requirements.txt    # Python dependencies
├── scripts/                # Build and utility scripts
│   ├── setup.js            # Setup script
│   ├── build.js            # Build script
│   └── seed.js             # Database seeding script
├── tests/                  # Test files
│   ├── components/         # Component tests
│   ├── hooks/              # Hook tests
│   ├── pages/              # Page tests
│   └── utils/              # Utility tests
├── .eslintrc.js            # ESLint configuration
├── .gitignore              # Git ignore file
├── components.json         # Shadcn UI configuration
├── next.config.js          # Next.js configuration
├── package.json            # NPM package file
├── README.md               # Project documentation
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Benefits of New Structure

1. **Clear Separation of Concerns**
   - Components are organized by purpose and type
   - Feature-specific components are grouped together
   - UI components are separated from business logic

2. **Improved Maintainability**
   - Easier to find related files
   - Reduces duplication
   - Clearer dependency chains

3. **Better Scalability**
   - New features can be added in their own directories
   - Consistent patterns make adding new code easier
   - Domain-driven organization simplifies collaboration

4. **Enhanced Developer Experience**
   - Logical file organization
   - Consistent naming conventions
   - Clear import paths

5. **Optimized Performance**
   - Better code splitting opportunities
   - Reduced bundle size through organization
   - More efficient tree-shaking

## Implementation Notes

- **Component Naming**: All components use PascalCase
- **Directory Naming**: All directories use kebab-case
- **File Organization**: Related files are kept together
- **Import Strategy**: Consistent use of absolute imports with aliases
- **TypeScript**: Strong typing throughout the codebase
- **Documentation**: READMEs in key directories explain purpose and usage 