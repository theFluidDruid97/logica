# README

Welcome to TrainTrack!

> **Prerequisites**
>
> - TrainTrack heavily utilizes RedwoodJS, a full-stack web framework, which requires [Node.js](https://nodejs.org/en/) (>=14.19.x <=16.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - A local Docker image of Postgres is necessary for the database setup. If you already have Docker installed on your machine you can run run this command from your CLI:
```
docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 \
-v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres
```

After you have cloned the project and are inside the directory containing it, start by installing dependencies:

```
yarn install
```

Then add the `git.ignore` file with:

```
git init
```

You will need to generate a session secret token as well for our authenticatioon provider, dbAuth, to function properly.

```
yarn rw g secret
```
Keep it handy for now, we will be using it in the next step:

Set up an environment variables file by adding a new file called `.env` in the top level directory of your project and make certain that the file is added to your `git.ignore` file.

Add these lines to your `.env` file:

```
SESSION_SECRET=[YOUR GENERATED SESSION SECRET TOKEN GOES HERE WITHOUT SQUARE BRACKETS]
DATABASE_URL=postgresql://postgres:docker@localhost:5432/TrainTrackv2
```

Next you will need to create a database migration with:

```
yarn rw prisma migrate dev
```

Finally you can run:

```
yarn rw dev
```

Your browser should automatically open to http://localhost:8910 where you'll see the Log In Page, which links out to a ton of great resources.
