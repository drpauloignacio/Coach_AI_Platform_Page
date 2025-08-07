# Overview

This is a full-stack React application called "World Cup of Healing" built with Express.js backend and React frontend. The application appears to be a health and wellness platform with an AI coaching feature. It uses a modern tech stack with TypeScript, Tailwind CSS for styling, and includes a comprehensive UI component library based on shadcn/ui components.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side is built with React and uses a component-based architecture:
- **React Router**: Uses Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and data fetching
- **UI Framework**: Custom component library built on top of Radix UI primitives with Tailwind CSS styling
- **Form Handling**: React Hook Form with Zod validation via @hookform/resolvers
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
The server follows a typical Express.js REST API pattern:
- **Framework**: Express.js with TypeScript
- **Storage Layer**: Abstracted storage interface with in-memory implementation (MemStorage)
- **Route Structure**: Centralized route registration system with API prefix pattern
- **Middleware**: Request logging, JSON parsing, and error handling middleware

## Database Design
The application uses Drizzle ORM for database operations:
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in shared/schema.ts with user authentication tables
- **Migrations**: Managed through Drizzle Kit with migrations stored in ./migrations directory
- **Connection**: Configured for PostgreSQL via DATABASE_URL environment variable

## Development Architecture
- **Monorepo Structure**: Client and server code in separate directories with shared schema
- **TypeScript Configuration**: Unified tsconfig.json with path aliases for clean imports
- **Hot Reload**: Vite dev server with HMR for frontend, tsx for backend development
- **Error Handling**: Runtime error overlay for development debugging

## Styling and UI System
- **Design System**: Custom theme with CSS variables for consistent styling
- **Components**: Comprehensive UI component library with variants and responsive design
- **Typography**: Custom font stack with Inter, Georgia, and Menlo
- **Color Scheme**: Navy and gold brand colors with semantic color tokens
- **Icons**: Lucide React for consistent iconography

# External Dependencies

## Database and ORM
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM for database operations
- **drizzle-zod**: Schema validation integration

## UI and Styling
- **@radix-ui/***: Complete set of accessible UI primitives for components
- **tailwindcss**: Utility-first CSS framework for styling
- **class-variance-authority**: Type-safe variant API for component styling
- **cmdk**: Command palette component

## State Management and Data Fetching
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form**: Form state management and validation
- **zod**: Schema validation for forms and API data

## Development Tools
- **vite**: Fast build tool and dev server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production builds

## Date and Utility Libraries
- **date-fns**: Modern date utility library
- **nanoid**: URL-safe unique ID generator
- **clsx**: Utility for constructing className strings conditionally