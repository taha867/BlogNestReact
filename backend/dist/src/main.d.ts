import { NestExpressApplication } from "@nestjs/platform-express";
import express from "express";
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
declare const _default: (req: express.Request, res: express.Response) => Promise<any>;
export default _default;
//# sourceMappingURL=main.d.ts.map