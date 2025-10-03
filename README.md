# Irish Bills Information App

A modern React application for viewing and managing Irish legislation bills from the Oireachtas API.

## 🚀 Live Demo

**[View Live Application →](https://your-app-url.vercel.app)**

> After deploying, replace the URL above with your actual deployment link.

## Features

- 📊 **Bills Table**: Paginated table with bill information (number, type, status, sponsor)
- 🔍 **Filtering**: Filter bills by type (Public Bill, Private Bill, Private Members Bill)
- ❤️ **Favorites**: Add/remove bills from favorites with optimistic UI updates
- 📱 **Responsive Design**: Mobile-first design that works on all devices
- 🌐 **Bilingual Support**: View bill titles in English and Irish (Gaeilge)
- 🎨 **Material UI**: Modern, accessible design system
- ⚡ **Performance**: React Query for efficient data fetching and caching

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **UI Library**: Material UI (MUI)
- **State Management**: Zustand with persistence
- **Data Fetching**: TanStack React Query
- **Testing**: Vitest + Testing Library
- **Storybook**: Component documentation and testing
- **Build Tool**: Vite
- **Code Quality**: ESLint + TypeScript

## Technical Highlights

This solution demonstrates best React development practices:

### 🚀 Performance Optimizations

**1. Next Page Prefetching**
- Automatically prefetches the next page of data in the background
- Results in instant page navigation with zero loading time
- Implemented using React Query's `prefetchQuery`

**2. Optimistic UI Updates**
- Favorites toggle instantly without waiting for server response
- UI updates immediately, then rolls back on error with toast notification
- Provides smooth, app-like user experience

**3. Smart Caching**
- React Query caches API responses for 5 minutes
- Reduces unnecessary API calls
- Configured globally via `queryClient` for consistency

### 💾 State Management

**Zustand with Persistence**
- Lightweight state management for favorites
- Automatic localStorage persistence using `zustand/middleware`
- Includes migration strategy for backward compatibility
- Pure optimistic updates with error recovery

### 🎨 Component Architecture

**Atomic Design Pattern**
- **Atoms**: `FavoriteButton`, `LoadingSkeleton`, `ErrorBoundary`
- **Molecules**: `BillTypeFilter`, `BillModal`
- **Organisms**: `BillsTable`, `FavoritesTable`
- **Pages**: `BillsPage`
- Clear separation of concerns and reusability

**Storybook Integration**
- Interactive component documentation
- Visual testing environment
- Isolated component development

### 🔧 Technical Decisions & Workarounds

**1. Client-Side Filtering**
- API doesn't support `bill_type` parameter in its Swagger spec
- Implemented client-side filtering on current page data
- Added tooltip to explain this architectural decision
- Server-side pagination maintained for performance

**2. UUID Generation for Bills**
- **Problem**: API returns duplicate `billNo` and `uri` values
- **Solution**: Generate client-side UUID v4 at API boundary
- Ensures unique keys for React rendering and state management
- Uses `uuid` library for RFC4122 compliance

**3. Type Generation**
- **Current**: Oireachtas API uses Swagger 2.0 with incomplete schemas
- **Implementation**: Custom TypeScript interfaces in `src/types/bill.ts`
- **Future**: Automated type generation ready when API spec improves

### 📱 Responsive Design

**Mobile-First Approach**
- Breakpoint at 900px (md): Cards below, table above
- Full-width layout with responsive padding
- Touch-friendly interactions
- Optimized for all screen sizes

### ✅ Code Quality

- **TypeScript**: Full type safety throughout
- **ESLint + Prettier**: Consistent code formatting
- **Unit Tests**: Vitest + Testing Library for components and utils
- **Error Handling**: ErrorBoundary with user-friendly fallback UI
- **Accessibility**: WCAG compliant Material UI components

## Architecture

The project follows **Atomic Design** principles:

```
src/
├── components/
│   ├── atoms/          # Basic building blocks (FavoriteButton, LoadingSkeleton)
│   ├── molecules/      # Simple combinations (BillTypeFilter, BillModal)
│   ├── organisms/      # Complex components (BillsTable, FavoritesTable)
│   └── pages/          # Application pages (BillsPage)
├── hooks/              # Custom React hooks
├── services/           # API layer
├── stores/             # Zustand state management
├── types/              # TypeScript definitions
├── utils/              # Helper functions
└── lib/                # Third-party library configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd zd
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`


## Usage

### Viewing Bills

1. The main page displays a paginated table of Irish bills
2. Use the "Bill Type" filter to narrow down results
3. Click on any row to view detailed information in a modal
4. Switch between English and Irish tabs in the modal

### Managing Favorites

1. Click the heart icon (♡) to add a bill to favorites
2. Click the filled heart (♥) to remove from favorites
3. View all favorites in the "Favorites" tab
4. Favorites are persisted in localStorage

### Mobile Experience

- On mobile devices, the table switches to a card-based layout
- All functionality remains available with touch-friendly interactions
- Responsive design ensures optimal viewing on all screen sizes

## API Integration

The app connects to the official Oireachtas API:
- **Base URL**: `https://api.oireachtas.ie/v1`
- **Endpoint**: `/legislation`
- **Features**: Pagination, filtering by bill type

### Favorites Implementation

Favorites functionality includes:
- **Optimistic UI**: Immediate visual feedback
- **Error Handling**: Rollback on API failure
- **Persistence**: Stored in localStorage via Zustand persist
- **Mock API**: Console logging for demonstration

## Testing

### Unit Tests
```bash
npm run test
```

### Storybook
```bash
npm run storybook
```

Interactive component documentation and testing environment.

## Development Principles

- **SOLID Principles**: Clean, maintainable code architecture
- **Atomic Design**: Scalable component organization  
- **Mobile-First**: Responsive design approach
- **Accessibility**: WCAG compliant components
- **Performance**: Optimized rendering and data fetching
- **Type Safety**: Full TypeScript coverage

## Future Improvements

While this solution is production-ready, here are potential enhancements:

### 🎨 UI/UX Enhancements
- **Loading State Consistency**: Match skeleton cell sizes to actual data cells to prevent layout shift
- **Enhanced Visual Design**: Add more sophisticated styling and animations
- **Advanced Filtering**: Multi-select filters, date ranges, search functionality
- **Sorting**: Column-based sorting with server-side support

### 🔧 Technical Enhancements
- **Automated Type Generation**: When API Swagger spec improves, fully automated type generation
- **Virtual Scrolling**: For handling extremely large datasets efficiently
- **PWA Support**: Offline capability and app-like experience
- **Internationalization**: i18n support for multiple languages beyond EN/GA
- **E2E Testing**: Playwright or Cypress for full user flow testing

### 📊 Features
- **Bill Search**: Full-text search across bill titles and content
- **Export Functionality**: Export filtered results to CSV/PDF
- **Advanced Analytics**: Charts and statistics about bills
- **Bill Comparison**: Side-by-side comparison of multiple bills
