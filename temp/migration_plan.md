# TourEase Project Reorganization Plan

This document outlines the step-by-step process to migrate from the current project structure to the optimized structure.

## Phase 1: Preparation

1. **Create Backup**
   ```bash
   # Create a backup of the entire project
   cp -r . ../tourease_backup
   ```

2. **Update Configuration Files**
   - Update `tsconfig.json` path aliases:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./*"],
         "@/components/*": ["./components/*"],
         "@/lib/*": ["./lib/*"],
         "@/hooks/*": ["./hooks/*"],
         "@/context/*": ["./context/*"],
         "@/styles/*": ["./styles/*"],
         "@/public/*": ["./public/*"]
       }
     }
   }
   ```
   
   - Update `components.json` to reflect new structure:
   ```json
   {
     "aliases": {
       "components": "@/components",
       "utils": "@/lib/utils",
       "ui": "@/components/ui"
     }
   }
   ```

3. **Create New Directory Structure**
   ```bash
   # Create new directories
   mkdir -p components/{auth,common,features/{ai,trips,budget,destinations,social,tour-guides,weather,packing,emergency},layout,marketing,ui}
   mkdir -p context
   mkdir -p hooks
   mkdir -p lib/{api,utils,types}
   mkdir -p styles
   mkdir -p tests/{components,hooks,pages,utils}
   mkdir -p public/{fonts,images/{destinations,icons,logos},placeholders}
   ```

## Phase 2: Component Migration

1. **UI Components**
   - Move Shadcn UI components:
   ```bash
   cp app/components/ui/*.tsx components/ui/
   ```
   
   - Normalize file names (convert to kebab-case):
   ```bash
   # Example conversion
   mv components/ui/Button.tsx components/ui/button.tsx
   mv components/ui/Card.tsx components/ui/card.tsx
   ```

2. **Feature Components**
   - Organize by feature domain:
   ```bash
   # AI features
   cp app/components/features/AIChatbot.tsx components/features/ai/
   cp app/components/features/AIDestinationRecommender.tsx components/features/ai/
   cp app/components/features/TravelStyleQuiz.tsx components/features/ai/
   
   # Trip features
   cp app/components/features/TripPlanner.tsx components/features/trips/
   cp app/components/features/TripCard.tsx components/features/trips/
   cp app/components/features/NewTripModal.tsx components/features/trips/
   
   # Budget features
   cp app/components/features/BudgetCalculator.tsx components/features/budget/
   cp app/components/features/BudgetPlanner.tsx components/features/budget/
   cp app/components/features/CurrencyConverter.tsx components/features/budget/
   
   # Destination features
   cp app/components/features/DestinationCard.tsx components/features/destinations/
   cp app/components/features/DestinationShowcase.tsx components/features/destinations/
   cp app/components/features/PopularDestinations.tsx components/features/destinations/
   cp app/components/features/ImmersiveExplorer.tsx components/features/destinations/
   cp app/components/features/3DTravelGallery.tsx components/features/destinations/ThreeDTravelGallery.tsx
   
   # Social features
   cp app/components/features/TravelFeed.tsx components/features/social/
   cp app/components/features/PostCreator.tsx components/features/social/
   cp app/components/features/UserProfile.tsx components/features/social/
   
   # Tour guide features
   cp app/components/features/TourGuideCard.tsx components/features/tour-guides/
   cp app/components/features/TourGuideList.tsx components/features/tour-guides/
   cp app/components/features/TourGuideMap.tsx components/features/tour-guides/
   cp app/components/features/TourGuideHero.tsx components/features/tour-guides/
   
   # Weather features
   cp app/components/features/WeatherWidget.tsx components/features/weather/
   
   # Packing features
   cp app/components/features/PackingChecklist.tsx components/features/packing/
   
   # Emergency features
   cp app/components/features/EmergencySOSButton.tsx components/features/emergency/
   ```

3. **Layout Components**
   - Move layout components:
   ```bash
   cp app/components/layout/*.tsx components/layout/
   ```

4. **Marketing Components**
   - Move marketing components:
   ```bash
   cp app/components/features/HeroSection.tsx components/marketing/
   cp app/components/features/TestimonialsSection.tsx components/marketing/
   cp app/components/features/AnimatedHero.tsx components/marketing/
   ```

## Phase 3: Code Refactoring

1. **Update Import Paths**
   - Search and replace import paths throughout the codebase:
   ```bash
   # Search for old import paths
   grep -r "@/app/components/ui" --include="*.tsx" --include="*.ts" .
   grep -r "@/components/ui" --include="*.tsx" --include="*.ts" .
   
   # Update import paths in all files
   find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/app/components/ui|@/components/ui|g'
   find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/app/components/features|@/components/features|g'
   ```

2. **Fix Component Exports**
   - Standardize exports (prefer named exports):
   ```tsx
   // Before
   export default function Component() {...}
   
   // After
   export function Component() {...}
   ```

3. **Add Type Definitions**
   - Create type files in `lib/types`
   - Update components to use these types

4. **Move Context Providers**
   - Move context files from `app/contexts` to `context`
   - Update imports accordingly

5. **Extract Hooks**
   - Move hooks from components to dedicated files in `hooks` directory
   - Update imports accordingly

## Phase 4: Utility Functions

1. **Consolidate Utilities**
   - Move utility functions from `app/utils.ts` to `lib/utils/`
   - Organize by domain (date, format, validation, etc.)

2. **Move API Utilities**
   - Move API-related code to `lib/api/`
   - Create client and endpoints files

3. **Move and Organize Constants**
   - Extract constants to `lib/constants.ts`
   - Group related constants together

## Phase 5: Backend Reorganization

1. **Organize Backend Files**
   - Organize routers by domain
   - Create service layer for business logic
   - Move utility functions to dedicated files

2. **Add Documentation**
   - Add README.md files to key directories
   - Document API endpoints and usage

## Phase 6: Testing and Verification

1. **Run Type Checks**
   ```bash
   npm run type-check
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Check for Broken Links and Images**
   - Verify all pages load correctly
   - Check for console errors

4. **Run Tests**
   ```bash
   npm run test
   ```

## Phase 7: Cleanup

1. **Remove Unused Files**
   ```bash
   # After verifying everything works, remove old directories
   rm -rf app/components
   rm -rf components/ui/duplicate-files
   ```

2. **Update Documentation**
   - Update main README.md
   - Add component usage examples

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "Reorganize project structure for better maintainability"
   ```

## Rollback Plan

In case of issues, revert to the backup:
```bash
rm -rf *
cp -r ../tourease_backup/* .
``` 