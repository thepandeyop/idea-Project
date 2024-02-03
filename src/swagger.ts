export const swaggerOptions = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Sell Anything API with Swagger",
        version: "0.1.0",
        description:
          "This is a Sell Anything api with swagger docs",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Arun Pandey, Abhishek Pandey",
          url: "https://logrocket.com",
          email: "arun03178@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./routes/*.ts"],
  };