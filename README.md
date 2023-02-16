# Welcome to TrainTrack!

> **Prerequisites**
>
> - TrainTrack heavily utilizes RedwoodJS, a full-stack web framework, which requires [Node.js](https://nodejs.org/en/) (>=14.19.x <=16.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - A local Docker image of Postgres is necessary for the database setup. If you already have Docker installed on your machine you can run run this command from your CLI to generate one:
```
docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 \
-v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres
```

After you have cloned the project and are inside the directory containing it, start by installing dependencies:

```
yarn install
```

Then add the `.gitignore` file with:

```
git init
```

You will need to generate a session secret token for our authentication provider, dbAuth, in order for the web application to function properly.

```
yarn rw g secret
```
Keep it handy for now, we will be using it in the next step:

Set up an environment variables file by adding a new file called `.env` in the top level directory of your project and make certain that the file is added to your `git.ignore` file.

Add these lines to your `.env` file:

```
SESSION_SECRET=[YOUR GENERATED SESSION SECRET TOKEN GOES HERE WITHOUT SQUARE BRACKETS]
DATABASE_URL=postgresql://postgres:docker@localhost:5432/logica
REDWOOD_ENV_FILESTACK_API_KEY=ARxHYtucNQOCAX5BkzNlkz
```

Next you will need to create a database migration with:

```
yarn rw prisma migrate dev
```

Finally you can run:

```
yarn rw dev
```

Your browser should automatically open to http://localhost:8910 where, after logging in, you'll see the Dashboard Page which links out to a ton of great resources.

> **Afterthoughts**
>
> - Running `yarn rw dev` will spin up a server listening at port 8920 by defualt, you can change this setting in the `redwood.toml` file. When you hit the `graphql` endpoint at `localhost:8920` you will see Redwood's GraphQL Playground which allows you to run live queries for information within the database.
> - While incorporating extra levels of security, our authentication provider does add some necessary steps in order to utilize this tool. You will need to provide request headers in order to gain proper authorization for running server-side queries. Luckily, there is a handy CLI setup we can run for this:

```
yarn rw setup graphiql dbAuth -i 1
```

After running this command and restarting the server you will be able to take full advantage of the GraphQL Playground.

It is important to note that the "1" at the end of the previous command specifies which user will have to be logged in for you to gain authorization. Replace it with whichever user ID you are logging in as.
