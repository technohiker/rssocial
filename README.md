# RSS Feed Concatenator(title needs work)

This program is my take on combining RSS Feeds with social media feeds.  Instead of going onto a source's website and being given information in accordance to what the site owner wants, the user will be able to input what data they want to see, and it will be fetched through either the site's RSS feed, or their API.  Written with React and Express in TypeScript, this project will specifically allow connections to any RSS feeds, and the social media websites Reddit and Twitter via API calls.

Project can be found at (insert host here once project is done).

If you wish to use this project for yourself, clone the repository, then use `npm install` on the root, server, and client directories.  A PostgreSQL database is utilized in this project.  Run `npm make-database` to activate SQL scripts to create and seed the database, then populate .env variables to match the database URL that will be used.  Afterwards, run `npm start ` at the root directory to start the project.