"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const httpException_filter_1 = require("./common/filters/httpException.filter");
const platform_express_1 = require("@nestjs/platform-express");
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const constants_1 = require("./lib/constants");
const config_1 = __importDefault(require("./config/config"));
const server = (0, express_1.default)();
async function createApp() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
    const config = (0, config_1.default)();
    const isProduction = config.nodeEnv === "production";
    // Security: Relaxed Helmet for CORS compatibility
    app.use((0, helmet_1.default)({
        crossOriginResourcePolicy: { policy: "cross-origin" },
        contentSecurityPolicy: isProduction ? undefined : false,
    }));
    app.use((0, cookie_parser_1.default)());
    // Explicit CORS Origin matching fallback
    const origin = [config.frontendUrl, "https://blog-nest-react.vercel.app"];
    // CORS
    app.enableCors({
        origin: origin,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With"],
    });
    // Global validation
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        validateCustomDecorators: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    // Global exception filter
    app.useGlobalFilters(new httpException_filter_1.AppExceptionFilter());
    await app.init();
    return { app, config };
}
// For Vercel, we need a way to ensure the app is initialized before handling requests
let cachedServer;
async function bootstrap() {
    if (!cachedServer) {
        await createApp();
        cachedServer = server;
    }
    return cachedServer;
}
// Logic to run locally vs Vercel
if (process.env.NODE_ENV !== "production") {
    createApp().then(async ({ app, config }) => {
        const port = config.port || 3000;
        await app.listen(port);
        console.log(`${constants_1.LOG_MESSAGES.APP_RUNNING} on port ${port}`);
    });
}
// Export a handler for Vercel
exports.default = async (req, res) => {
    const serverInstance = await bootstrap();
    return serverInstance(req, res);
};
//# sourceMappingURL=main.js.map