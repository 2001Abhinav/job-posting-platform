// Netlify Function for Express server
const { createServer } = require('../../server/index.js');

let app;

exports.handler = async (event, context) => {
  if (!app) {
    app = await createServer();
  }

  return new Promise((resolve, reject) => {
    const req = {
      method: event.httpMethod,
      url: event.path,
      headers: event.headers,
      body: event.body
    };

    const res = {
      statusCode: 200,
      headers: {},
      body: '',
      end: function(body) {
        this.body = body;
        resolve({
          statusCode: this.statusCode,
          headers: this.headers,
          body: this.body
        });
      },
      json: function(data) {
        this.headers['Content-Type'] = 'application/json';
        this.body = JSON.stringify(data);
        resolve({
          statusCode: this.statusCode,
          headers: this.headers,
          body: this.body
        });
      },
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      set: function(key, value) {
        this.headers[key] = value;
        return this;
      }
    };

    app(req, res);
  });
};