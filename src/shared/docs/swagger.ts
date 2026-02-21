import swaggerJsdoc from 'swagger-jsdoc';
import { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FinTrack API',
      version: '1.0.0',
      description: `
## 🔐 Authentication Flow

This API uses JWT (Bearer Token) authentication.

### 1️⃣ Register
Create a new account using \`POST /api/auth/register\`.

### 2️⃣ Login
Authenticate using \`POST /api/auth/login\`.
You will receive:
- accessToken
- refreshToken

### 3️⃣ Authorize
Click the **Authorize** button at the top of this page and paste your accessToken.

You do NOT need to add "Bearer". Swagger adds it automatically.

### 4️⃣ Access Protected Routes
All routes marked with 🔒 require authentication.

If the token is invalid or missing, the API will return:

\`\`\`json
{
  "status": "error",
  "message": "Unauthorized"
}
\`\`\`
`, 
      contact: {
        name: 'Pablo',
        email: 'pablobddev@gmail.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      }
    },
    tags: [{
      name: 'Authentication',
      description: `
        Flow:
        1. Register
        2. Login
        3. Authorize
        4. Access protected routes
        `
    }],
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: { 
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'f2f354f2-a939-4c1e-8b9e-462a4e0e2fc0' },
            name: { type: 'string', example: 'Pablo' },
            email: { type: 'string', example: 'pablo@email.com' }
          }
        },
        AuthTokens: {
          type: 'object',
          properties: {
            accessToken: { type: 'string' },
            refreshToken: { type: 'string' }
          }
        },
        SuccessResponse: {
          type: 'object',
          required: ['status'],
          properties: {
            status: { 
              type: 'string', 
              enum: ['created', 'success'],
              example: 'success'
            },
            
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'error' },
            message: { type: 'string', example: 'Message of the error' }
          }
        },
        AuthenticatedUser: {
          type: 'object',
          properties: {
            userId: { 
              type: 'string',
              example: 'f2f354f2-a939-4c1e-8b9e-462a4e0e2fc0',
              format: 'uuid'
            },
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      responses: {
        UnauthorizedError: {
          description: 'Unauthorized - Missing or invalid token',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              },
              example: {
                status: 'error',
                message: 'Unauthorized - Missing or invalid token'
              }
            }
          }
        },
        TokenExpiredError: {
          description: 'JWT Token has expired',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              },
              example: {
                status: 'error',
                message: 'Unauthorized - Token expired'
              }
            }
          }
        }
      },
    },
  },
  apis: ['src/shared/docs/**/*.yaml'], 
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;