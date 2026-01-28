import { NestExpressApplication } from "@nestjs/platform-express";
declare const server: import("express-serve-static-core").Express;
export declare function createApp(): Promise<{
    app: NestExpressApplication<import("node:http").Server<typeof import("node:http").IncomingMessage, typeof import("node:http").ServerResponse>>;
    config: {
        port: number;
        nodeEnv: string;
        frontendUrl: string;
        database: {
            host: string;
            port: number;
            username: string;
            password: string;
            name: string;
        };
        jwt: {
            secret: string;
            accessTokenExpiresIn: string;
            refreshTokenExpiresIn: string;
            resetTokenExpiresIn: string;
        };
        cloudinary: {
            cloudName: string;
            apiKey: string;
            apiSecret: string;
        };
        email: {
            host: string;
            port: number;
            secure: boolean;
            user: string;
            pass: string;
            from: string;
        };
    };
}>;
export default server;
//# sourceMappingURL=main.d.ts.map