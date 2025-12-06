This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


// NOTE TECH ? MAYBE =))

FE: Next.js + Tailwind + shadcn/ui
BE/API: Next.js API routes (hoặc NestJS khi scale)
DB: PostgreSQL (hoặc Supabase serverless)
Auth: NextAuth.js
Hosting: Vercel
Security: DOMPurify + helmet + rate limit


src/
├── app/
│   ├── (client)/                 # Route group cho client
│   │   ├── layout.tsx            # Layout riêng cho client
│   │   ├── page.tsx              # Trang chủ
│   │   ├── blog/
│   │   │   ├── page.tsx          # Danh sách bài viết
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Chi tiết bài viết
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   │
│   ├── (admin)/                  # Route group cho admin
│   │   ├── layout.tsx            # Layout riêng cho admin
│   │   ├── admin/
│   │   │   ├── page.tsx          # Dashboard
│   │   │   ├── posts/
│   │   │   │   ├── page.tsx      # Quản lý bài viết
│   │   │   │   ├── create/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │
│   ├── layout.tsx                # Root layout chung
│   └── globals.css
│
├── components/
│   ├── client/                   # Components cho client
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── BlogCard.tsx
│   │
│   ├── admin/                    # Components cho admin
│   │   ├── Sidebar.tsx
│   │   ├── AdminNav.tsx
│   │   └── PostEditor.tsx
│   │
│   └── shared/                   # Components dùng chung
│       └── Button.tsx
│
└── lib/                          # Utils, API calls, etc.
    └── api.ts