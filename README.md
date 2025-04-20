# Oru - Digital Wellbeing Tracker

Oru helps users track and manage digital distractions by logging when they get distracted by specific apps like Instagram, TikTok, Twitter, etc.

## Overview

Oru is a Next.js application that:

1. Creates iOS shortcuts that log when a user is distracted by specific apps
2. Logs distraction events to a Supabase database
3. Provides analytics through a dashboard to visualize distraction patterns

## Features

- **Customizable Tracking**: Select which apps you want to monitor
- **iOS Shortcut Integration**: Easy to use shortcut for logging distractions
- **Analytics Dashboard**: Visualize distraction patterns with charts and heatmaps
- **Insights**: See which apps distract you most and at what times of day

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: Supabase
- **Authentication**: Custom UUID-based authentication
- **Charts**: Recharts
- **API Fetching**: SWR for data fetching with caching

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- A Supabase account and project

### Database Setup

1. Create a new Supabase project
2. Set up the following tables:

```sql
-- Table for tracking distraction events
CREATE TABLE oru_events (
  id SERIAL PRIMARY KEY,
  user_uuid UUID NOT NULL,
  app_name TEXT NOT NULL,
  triggered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_oru_events_user_uuid ON oru_events(user_uuid);
CREATE INDEX idx_oru_events_app_name ON oru_events(app_name);
CREATE INDEX idx_oru_events_triggered_at ON oru_events(triggered_at);
```

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/oru-app.git
   cd oru-app
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   ```

4. Update the `.env.local` file with your Supabase credentials

5. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser

### Building for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Deployment

The easiest way to deploy is using Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/yourusername/oru-app)

Remember to add your environment variables in the Vercel dashboard.

## Testing

Run tests with:

```bash
npm test
# or
yarn test
```

## Project Structure

```
oru-app/
├── app/                    # Next.js App Router
│   ├── api/                # API Routes
│   ├── dashboard/          # Dashboard Page
│   ├── login/              # Login Page
│   ├── onboard/            # Onboarding Page
│   └── page.tsx            # Home Page
├── components/             # React Components
│   ├── analytics/          # Dashboard Charts
│   └── layout/             # Layout Components
├── lib/                    # Utility Functions
│   ├── auth.js             # Authentication
│   └── supabase.js         # Supabase Client
├── pages/                  # Next.js Pages Router (older API routes)
├── public/                 # Static Assets
└── __tests__/              # Test Files
```

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.