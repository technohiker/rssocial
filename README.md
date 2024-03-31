# RSSocial

This program is my take on combining RSS Feeds with social media feeds. Instead of going onto a source's website and being given information in accordance to what the site owner wants, the user will be able to input what data they want to see, and it will be fetched through either the site's RSS feed, or their API. Written with React and Express in TypeScript, this project will specifically allow connections to any RSS feeds, and the social media website Reddit via API calls.

The project can be found [here](https://abandoned-whip.surge.sh/). A personal account can be made by clicking on Register and using your email. If you do not wish to do so, you may login with the username `jane_doe`, and a password of `password`.

## Demo:

https://github.com/fez-github/rssocial/assets/75589254/47bb6b41-05ef-47b4-ad46-b1de90b90fe6

## Cloning:

If you wish to use this project for yourself, clone the repository, then use `npm install` on the root, server, and client directories.

A PostgreSQL database is utilized in this project. Run `cd server` to move to the back-end, then run the following command to create and populate the databse.
`psql < src/sql/create.sql`

Next, create .env files in both the `client` and `server` directories and populate the .env variables.

Note that this project uses SendinBlue for email verification, and uses .env variables to determine what email address will send it, in addition to a SendinBlue key and port number. You will need to set up a SendinBlue account yourself in order to use this.

Once set up, run `npm start` in the root directory to start both the frontend and backend. Both will open up at localhost with ports 3000 and 3001.
