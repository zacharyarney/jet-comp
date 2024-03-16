# Jet Comparisons

## Getting Started

### Database Setup

This project uses [Prisma](https://www.prisma.io/) to connect to a database. You can use the following steps to set up a
database:

1. Start up a new PostgreSQL instance and add the connection string to the `.env` file. I'm using the
   official [Postgres Docker image](https://hub.docker.com/_/postgres) for development, but you can also install from
   the [official website](https://www.postgresql.org/download/) or `brew install postgres` if you're on a Mac.
2. Copy the `.env.example` file into a new `.env` file and update `DATABASE_URL` with the connection string for your
   database.
3. run `npm run db:setup` to create the database schema and seed the database with initial data from `jet_facts.csv`.

### OpenAI API Key

This project uses the OpenAI API to generate Jet comparisons. To run the app locally, you'll need an API key from
OpenAI. You'll also need an available balance in you OpenAI account to use the API.

1. Sign up for an account at [OpenAI](https://beta.openai.com/signup/).
2. Create a new API key in the [API keys section](https://beta.openai.com/account/api-keys).
3. Replace `OPENAI_API_KEY` in the `.env` file with your API key.

### Running locally

After the database is set up and you've populated your `.env` file with the DB connection string and OpenAI API key, you
can run the app locally with:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the UI and try compairing some Jets!

