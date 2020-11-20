const express = require("express");
const app = module.exports = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const swagger_path =  path.resolve(__dirname,'./swagger.yaml');
const swaggerDocument = YAML.load(swagger_path);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
