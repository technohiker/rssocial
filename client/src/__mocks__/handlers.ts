import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { mockBookmarks, mockFeeds, mockFolders, mockMessages, mockReactions, mockSources, mockUser } from './mockData';

const baseURL = 'http://localhost:3001'

export const server = setupServer(

  //Register User

  //Authenticate User(login)
  rest.post(`${baseURL}/auth/token`, async (req, res, ctx) => {
    const { username, password } = await req.json()
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
    const mockNews = {
      folders: mockFolders,
      feeds: mockFeeds,
      messages: mockMessages,
      reactions: mockReactions,
      sources: mockSources,
      bookmarks: mockBookmarks
    }
    return res(ctx.status(200), ctx.json({ news: mockNews}))
  }

  //Add Reaction

  //Set Bookmark

  //Add Notes

  
  //Add Bookmark

  //Add Folder

  //Add Feed

  //Delete Bookmark

  //Delete Folder
  
  //Delete Feed
))

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJ0ZXN0dXNlciIsImlhdCI6MTUxNjIzOTAyMn0.NDKFLXEYmoc3yRNPFxvBS1wMmHy_cndjLGUPsAj_pI0'

const mockLoginResponse = {
  accessToken: token,
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