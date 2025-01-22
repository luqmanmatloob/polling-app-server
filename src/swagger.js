const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'API for Polling System',
  },
  servers: [{ url: 'http://localhost:5000' }],
  components: {
    securitySchemes: {
      bearerAuth: { // 👈 Add this
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    },
    schemas: {
      Poll: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          options: { type: 'array', items: { type: 'string' } },
          isPublished: { type: 'boolean' }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./routes/**/*.js'], // Ensure this path matches your project structure
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };