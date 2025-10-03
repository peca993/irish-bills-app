# Irish Bills Information App

A modern React application for viewing and managing Irish legislation bills from the Oireachtas API.

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

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook

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

Tests cover:
- Component rendering and interactions
- Utility functions
- API integration
- State management

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

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Follow the existing code style and patterns
2. Write tests for new features
3. Update Storybook stories for new components
4. Ensure TypeScript compliance
5. Test on mobile devices

## License

This project is for assessment purposes.