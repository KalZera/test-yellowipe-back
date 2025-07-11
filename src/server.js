"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("env");
const app_1 = __importDefault(require("./app"));
require("dotenv/config");
app_1.default.listen({ port: env_1.env.PORT }, () => {
    console.log(`Server listening at ${env_1.env.PORT}`);
});
