# Cloudflare Workers Demo

[cloudflarebutton]

A production-ready full-stack template featuring React, TypeScript, and Cloudflare Workers with Durable Objects for scalable data persistence. This starter includes a minimal real-world chat example demonstrating entity management, API routes, and a modern UI.

## Features

- **Durable Objects Entities**: Type-safe entity system with automatic indexing for Users and ChatBoards
- **Real-time Chat**: Send and retrieve messages with CAS-based optimistic updates
- **Modern React Frontend**: Built with Vite, Tailwind CSS, shadcn/ui components, and React Query
- **Hono API Server**: Lightweight, performant API routes on Cloudflare Workers
- **Cloudflare-Native**: Uses Durable Objects, KV-style storage, and edge deployment
- **Developer Experience**: Strict TypeScript, hot reload, and one-command deployment

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, TanStack Query, React Router
- **Backend**: Cloudflare Workers, Hono, Durable Objects
- **Shared Types**: TypeScript definitions in `shared/` for seamless frontend/backend sync
- **Tooling**: Bun, ESLint, PostCSS, Wrangler

## Getting Started

### Prerequisites

- Bun (recommended) or Node.js 20+
- A Cloudflare account (for deployment)

### Installation

Clone the repository and install dependencies using Bun:

```bash
bun install
```

### Development

Start the local development server:

```bash
bun run dev
```

The application will be available at `http://localhost:3000`. The Vite dev server proxies API requests to the Cloudflare Workers runtime.

### Available Scripts

- `bun run dev` — Start development server
- `bun run build` — Build for production
- `bun run deploy` — Build and deploy to Cloudflare
- `bun run lint` — Run ESLint

## Project Structure

```
├── src/                  # React frontend
│   ├── components/       # UI components and layout
│   ├── pages/            # Route pages
│   └── lib/              # Utilities and API client
├── worker/               # Cloudflare Workers backend
│   ├── entities.ts       # UserEntity and ChatBoardEntity
│   ├── user-routes.ts    # API route definitions
│   └── core-utils.ts     # Entity framework and helpers
├── shared/               # Shared TypeScript types and mock data
└── wrangler.jsonc        # Cloudflare configuration
```

## Usage Examples

### Creating a User

```ts
const user = await fetch('/api/users', {
  method: 'POST',
  body: JSON.stringify({ name: 'Alice' })
});
```

### Sending a Chat Message

```ts
const message = await fetch('/api/chats/:chatId/messages', {
  method: 'POST',
  body: JSON.stringify({ userId: 'u1', text: 'Hello!' })
});
```

See `worker/user-routes.ts` and `worker/entities.ts` for full entity usage patterns.

## Deployment

This project is optimized for Cloudflare Workers. Deploy with a single command:

```bash
bun run deploy
```

[cloudflarebutton]

Alternatively, connect your repository to the Cloudflare dashboard for automatic deployments on every push.

## License

MIT