# Coveme Admin

A modern, feature-rich admin dashboard built with Next.js 15, React 19, and TypeScript for managing e-commerce operations, analytics, and business intelligence.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, React 19, and TypeScript
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: Comprehensive UI components using Radix UI primitives
- **Authentication**: Secure login system with server-side validation
- **Real-time Updates**: Live data synchronization and notifications
- **Analytics Dashboard**: Sales charts, market intelligence, and predictive analytics
- **E-commerce Management**: Products, orders, clients, and providers management
- **Integration Hub**: Connectors, webhooks, and data synchronization
- **Theme Support**: Dark/light mode with system preference detection
- **Mobile Optimized**: Responsive design that works on all devices

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
- [Components](#components)
- [Styling](#styling)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4.1.9
- **Component Library**: Radix UI primitives
- **State Management**: TanStack React Query
- **Forms**: TanStack React Form
- **Charts**: Recharts
- **Icons**: Lucide React

### Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Build Tool**: Next.js built-in bundler
- **PostCSS**: Tailwind CSS processing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd coveme-admin
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
coveme-admin/
├── app/                          # Next.js App Router
│   ├── (app)/                   # Protected app routes
│   │   ├── analytics/           # Analytics & reporting
│   │   ├── brands/              # Brand management
│   │   ├── clients/             # Client management
│   │   ├── dashboard/           # Main dashboard
│   │   ├── integrations/        # Third-party integrations
│   │   ├── listings/            # Product listings
│   │   ├── matching/            # Matching algorithms
│   │   ├── monitoring/          # System monitoring
│   │   ├── notifications/       # Notification center
│   │   ├── orders/              # Order management
│   │   ├── products/            # Product management
│   │   ├── providers/           # Provider management
│   │   ├── reviews/             # Review management
│   │   ├── settings/            # System settings
│   │   └── support/             # Support system
│   ├── api/                     # API routes
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── login/                   # Authentication
├── components/                   # Reusable components
│   ├── ui/                      # Base UI components
│   ├── charts/                  # Chart components
│   └── app-sidebar.tsx          # Main navigation
├── hooks/                       # Custom React hooks
├── lib/                         # Utility libraries
├── schemas/                     # Zod validation schemas
├── services/                    # Business logic services
├── styles/                      # Additional styles
└── types/                       # TypeScript type definitions
```

## 📜 Available Scripts

- **`pnpm dev`** - Start development server
- **`pnpm build`** - Build for production
- **`pnpm start`** - Start production server
- **`pnpm lint`** - Run ESLint

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# NODE ENVIRONMENT
NODE_ENV=development

# API URL
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

## 🌐 API Routes

- **`/api/ping`** - Health check endpoint
- **`/api/export/orders.csv`** - Export orders to CSV

## 🧩 Components

### UI Components
The project uses a comprehensive set of UI components built on Radix UI primitives:

- **Layout**: Sidebar, Navigation, Breadcrumbs
- **Forms**: Input, Select, Checkbox, Radio, etc.
- **Feedback**: Toast, Alert, Dialog, Modal
- **Data Display**: Table, Cards, Charts
- **Navigation**: Tabs, Accordion, Menu

### Custom Components
- **`AppSidebar`** - Main navigation sidebar
- **`DataTable`** - Reusable data table with sorting/filtering
- **`Charts`** - Sales and analytics charts
- **`ProductCreateForm`** - Product creation form
- **`NotificationsFeed`** - Real-time notifications

## 🎨 Styling

- **Tailwind CSS 4.1.9** - Utility-first CSS framework
- **CSS Variables** - Custom design tokens
- **Responsive Design** - Mobile-first approach
- **Dark Mode** - Theme switching with system preference detection
- **Component Variants** - Class variance authority for component styling

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Netlify** - Static export
- **Railway** - Full-stack deployment
- **Docker** - Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use conventional commit messages
- Ensure all tests pass
- Update documentation as needed
- Follow the existing code style

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs and feature requests via GitHub Issues
---

**Built with ❤️ using Next.js, React, and TypeScript**
