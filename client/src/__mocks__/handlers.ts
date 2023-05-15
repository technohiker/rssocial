import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { mockBookmarks, mockFeeds, mockFolders, mockMessages, mockReactions, mockSources, mockUser, mockToken } from './mockData';

const baseURL = 'http://localhost:3001'

export const server = setupServer(

  //Register User
  rest.post(`${baseURL}/auth/register`, async (req, res, ctx) => {
    const { username, password, email } = await req.json()
    console.log({ mockUser })
    console.log({ username, password, email })
    //If username/email are already taken, return error
    if (username === mockUser.username || email === mockUser.email) {
      return res(ctx.status(403), ctx.json({ error: { message: "Username/Email already taken", status: 403 } }))
    }
    else {
      return res(ctx.status(200), ctx.json({ token: mockToken }))
    }
  }),

  //Authenticate User(login)
  rest.post(`${baseURL}/auth/token`, async (req, res, ctx) => {
    const { username, password } = await req.json()
    console.log({ username, password })
    //Simulate successful login
    if (username === mockUser.username && password === mockUser.password) {
      console.log
      return res(ctx.status(200), ctx.json(mockLoginResponse.accessToken))
    }
    else {
      return (res(ctx.status(401), ctx.json({ error: { message: "Invalid username/password", status: 401 } })))
    }
  }),

  //Get User
  rest.get(`${baseURL}/users/:username`, (req, res, ctx) => {
    const { username } = req.params
    if (username === mockUser['username']) {
      return res(ctx.status(200), ctx.json({ user: mockUser }))
    }
    return (res(ctx.status(403), ctx.json({ error: "This username is not on the server." })))
  }),

  //Get News Object
  rest.get(`${baseURL}/calls/fetch`, async (req, res, ctx) => {

  }),

  //Add Reaction
  rest.post(`${baseURL}/messages/:id/react`, async (req, res, ctx) => {
    const userID = mockUser.id
    const message_id = req.params.id
    const reactID = await req.json()
    const thisReaction = mockMessages.find(message => message.id === +message_id)
    if (!thisReaction) return res(ctx.status(404), ctx.json({ error: { message: "Message not found", status: 404 } }))
    if (thisReaction.react_id === reactID) {
      thisReaction.react_id = null
    }
    return res(ctx.status(200), ctx.json({ reaction: thisReaction }))
  }),

  rest.get(`${baseURL}/calls/fetch`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ messages: mockMessages }))
  }),

  rest.get(`${baseURL}/users/:username/news`, async (req, res, ctx) => {
    const mockNews = {
      folders: mockFolders,
      feeds: mockFeeds,
      messages: mockMessages,
      reactions: mockReactions,
      sources: mockSources,
      bookmarks: mockBookmarks
    }
    return res(ctx.status(200), ctx.json({ news: mockNews }))
  })


  //Set Bookmark


  //Add Notes


  //Add Bookmark

  //Add Folder

  //Add Feed

  //Delete Bookmark

  //Delete Folder

  //Delete Feed
)

const mockLoginResponse = {
  accessToken: mockToken,
  expiresIn: 3600,
  tokenType: 'Bearer',
};

const mockJobs = [{
  id: "testjob1",
  title: "Test Job 1",
  salary: 120000,
  equity: 0.7
},
{
  id: "testjob2",
  title: "Test Job 2",
  salary: 240000,
  equity: 0.4
}

]
