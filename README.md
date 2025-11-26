# PowerSync + Node.js + Drizzle

This is a minimal demo repository that shows how to use the [PowerSync](https://www.powersync.com/) Node.js SDK along with [Drizzle](https://orm.drizzle.team/).

For more information about the PowerSync Node.js SDK see [this page](https://docs.powersync.com/client-sdk-references/node) from the official PowerSync docs.

If you want to learn more about the PowerSync Drizzle ORM, see [this page](https://docs.powersync.com/client-sdk-references/javascript-web/javascript-orm/drizzle) for more details.

## Prerequisites 

- Node.js 22.15.0 + npm
- PowerSync Service instance
    - You can [sign-up](https://accounts.journeyapps.com/portal/powersync-signup?s=docs) for a Free plan on PowerSync Cloud or,
    - [Self-host](https://docs.powersync.com/self-hosting/getting-started) a PowerSync Service instance

## Setup

1. Clone the repository
2. Install dependencies `npm install`
3. Create a `.env` file `cp .env.template .env` and set the two required environment variables
4. Run the app `npm run start`