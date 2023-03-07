import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const server = setupServer(
  //Get company

  //Get companies

  //Get job

  //Get jobs
  rest.get('http://localhost:3001/jobs/', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ jobs: mockJobs }))
  }),

  //Register User

  //Authenticate User(login)
  rest.post('http://localhost:3001/auth/token', async (req, res, ctx) => {
    const { username, password } = await req.json()
    //Simulate successful login
    if (username === mockUser.username && password === mockUser.password) {
      console.log
      return res(ctx.status(200), ctx.json(mockLoginResponse.accessToken))
    }
    else {
      return (res(ctx.status(401), ctx.json({ error: { message: "Invalid username/password", status: 401 } })))
    }
    //Simulate failed login
  }),

  //Get User
  rest.get('http://localhost:3001/users/:username', (req, res, ctx) => {
    const { username } = req.params
    if (username === mockUser['username']) {
      return res(ctx.status(200), ctx.json({ user: mockUser }))
    }
    return (res(ctx.status(403), ctx.json({ error: "This username is not on the server." })))
  }),

  //Patch User

  //Post Application
  rest.post('http://localhost:3001/users/:username/jobs/:job_id', (req, res, ctx) => {
    const { username, job_id } = req.params
    if (mockUser.applications.find(app => app === job_id)) {
      return (res(ctx.status(400), ctx.json({ error: "You already applied to this job." })))
    }
    mockUser.applications.push(job_id.toString())
    return res(ctx.status(200), ctx.json({ applied: job_id }))
  })
)

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJ0ZXN0dXNlciIsImlhdCI6MTUxNjIzOTAyMn0.NDKFLXEYmoc3yRNPFxvBS1wMmHy_cndjLGUPsAj_pI0'

const mockLoginResponse = {
  accessToken: token,
  expiresIn: 3600,
  tokenType: 'Bearer',
};

const mockUser = {
  username: "testuser",
  password: "testpassword",
  firstName: "test",
  lastName: "user",
  email: "test@test.com",
  applications: ["2"],
}

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