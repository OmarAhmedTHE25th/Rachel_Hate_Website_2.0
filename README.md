#  Rachel Hate Website 2.0

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

##  About 

In the shadows of the Tower, where stars are but a distant dream and betrayal is the currency of ascension, one name echoes with a particular bitterness: **Rachel**. 

**Rachel Hate Website 2.0** is more than just a tracker; it is a digital archive of transgressions, a chronicle of the climb, and a companion for those navigating the treacherous floors of the *Tower of God* manhwa and anime. This application serves as a personal watchthrough companion, meticulously documenting the "sins" of the Tower's most controversial figure while helping you keep track of your own journey through SIU's masterpiece.

##  Features

- **The Sin Counter**: A live-updating tally of Rachel's crimes, persisted via Neon PostgreSQL. Every betrayal, every lie, recorded for eternity.
- **Sin Archive**: A comprehensive list of documented offenses with full administrative control (add/delete functionality) to ensure no misdeed goes unpunished.
- **Progress Tracker**: Stay on course through the climb. Track your current episode in the anime and chapter in the manhwa with ease.
- **Dark Aesthetic**: A UI designed to match the lore-heavy, mysterious, and often grim atmosphere of the Tower.

##  Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **ORM**: [Prisma 7](https://www.prisma.io/)
- **Database**: [Neon PostgreSQL](https://neon.tech/)
- **Deployment**: Local development via WebStorm

##  Getting Started

Follow these steps to initialize the archive on your local machine:

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/OmarAhmedTHE25th/RachelHateWebsite2.0.git
    cd RachelHateWebsite2.0/my-app
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the `my-app` directory. Since `.env` is gitignored, you must manually add your database connection string:
    ```env
    DATABASE_URL="postgresql://user:password@your-neon-hostname/dbname?sslmode=require"
    ```
    *Note: Ensure your `DATABASE_URL` points to a valid Neon PostgreSQL instance.*

4.  **Database Migration**
    Generate the Prisma client and push the schema to your database:
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the application.

##  Project Structure

```text
my-app/
├── app/                # Next.js App Router (Pages, API, Layouts)
│   ├── api/            # Backend endpoints for sins and tracking
│   ├── sins/           # Sin archive pages
│   └── tracker/        # Progress tracking interface
├── lib/                # Shared utilities (Prisma client)
├── prisma/             # Database schema and migrations
├── public/             # Static assets
└── components/         # Reusable UI components
```

##  Disclaimer

This is a fan-made project dedicated to the *Tower of God* series. All characters, lore, and world-building elements are the property of **SIU**. This app is created for personal use and entertainment within the fan community.

---
Created with spite by **OmarAhmedTHE25th** 🐢
