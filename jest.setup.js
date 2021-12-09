import {server} from './src/mocks/testServer.ts';

beforeAll(() => {
  server.listen();
});

afterAll(() => { 
  server.close() 
});

afterEach(() => { 
  server.resetHandlers() 
});