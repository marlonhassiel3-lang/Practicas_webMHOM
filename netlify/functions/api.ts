import serverless from 'serverless-http';
import { app } from '../../src/api';

export const handler = serverless(app, {
  basePath: '/.netlify/functions'
});
