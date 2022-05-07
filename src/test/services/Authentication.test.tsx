import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer();

// define mock server lifecycle
beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const url = `${process.env.REACT_APP_API_BASE_URL}`;
const userService = `${process.env.REACT_APP_API_USER_URL}`;
const baseURL = `${url}${userService}`;

const AuthenticationMockApi = () => {
  const login = ({ message, status }) => {
    return server.use(
      rest.post(`${baseURL}/auth/login`, (request, response, context) => {
        return response(
          context.status(status),
          context.json({
            success: status === 200,
            message,
          }),
        );
      }),
    );
  };

  return { login };
};

export default AuthenticationMockApi;
