import Express from 'express'
import cors from 'cors'

export const app = Express();

//Set up middleware
app.use(cors());
app.use(Express.json());

/**Handle 404 errors. */

/**Generic error handler. */