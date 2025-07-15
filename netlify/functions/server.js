const serverless = require('serverless-http');
const express = require('express');
const { registerRoutes } = require('../../dist/server/routes.js');

let app;

async function createApp() {
  const expressApp = express();
  
  // Trust proxy for Netlify
  expressApp.set('trust proxy', true);
  
  // Parse JSON bodies
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: true }));
  
  // Register routes
  await registerRoutes(expressApp);
  
  return expressApp;
}

exports.handler = async (event, context) => {
  if (!app) {
    app = await createApp();
  }
  
  // Create serverless handler
  const handler = serverless(app);
  
  return await handler(event, context);
};