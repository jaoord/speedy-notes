# 🚀 Speedy Notes

In the realm of web apps so bright,  
A note-taking app takes flight.  
Named after its creator's flair,  
Speedy's touch is everywhere!

Built with SvelteKit's graceful way,  
And TypeScript keeping errors at bay.

## 🎭 The Tale

```
Notebooks and notes, a perfect pair,
PostgreSQL stores them with care.
Drizzle ORM makes queries a breeze,
While TailwindCSS styles with ease.
```

## 🏃‍♂️ Quick Start

First clone this repo, don't hesitate,  
Then follow these steps, they're really great:

```bash
# Install dependencies, watch them flow
pnpm install

# Create a .env file, here we go
DATABASE_URL=postgres://postgres:password@localhost:5432/speedy_notes

# Create the database, make it shine
createdb speedy_notes

# Run migrations, all in line
pnpm drizzle-kit push:pg

# Start the dev server, see it glow
pnpm dev
```

## 🎨 Features

Through notebooks you'll glide with grace,  
Each one having its special place.  
Create and delete with just one click,  
While notes within flow oh so quick.

- 📝 Create notebooks to organize your thoughts
- ✍️ Write notes with titles and content clear
- 🗑️ Delete notebooks (with confirmation, have no fear!)
- 🎯 Server-side rendering, oh so neat
- 🔒 Database operations, securely complete

## 🏗️ Tech Stack

```
SvelteKit stands tall and proud,
TypeScript keeps types in its crowd.
PostgreSQL, our trusty friend,
Drizzle ORM helps data bend.
TailwindCSS makes it pretty,
Forms and actions, oh so witty!
```

## 📚 Project Structure

```
src/
  ├── lib/
  │   └── db/           # Database magic lives here
  │       ├── index.ts  # Connection spells
  │       └── schema.ts # Table scrolls
  │
  └── routes/
      └── notes/        # Where notes dance and play
          ├── +page.svelte    # The stage they display
          └── +page.server.ts # Behind the curtain's sway
```

## 🧙‍♂️ Development Notes

Remember young wizard, as you code:  
- Environment variables must be bestowed
- Server-side actions handle data's load
- Forms submit with grace, as foretold
- TypeScript keeps your types on the road

---

> *✨ Vibe Coding at the speed of thought, because that's how Speedy rolls* 🌊

> Note: This is a development version, not ready for production use.

<sub>// Quote added by Claude (your friendly neighborhood AI who loves movie quotes and clean code):  
"Speed is fine, but accuracy is final." - Wyatt Earp  
(Because even Speedy Notes needs reliable database connections 😉)</sub>