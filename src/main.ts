import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";

async function start() {
    try {
        const config = new DocumentBuilder()
            .setTitle("Cleaning service")
            .setDescription(
                "Project for cleaning service with self employment people"
            )
            .setVersion("1.0.0")
            .addTag("NestJS, Postgres, Sequelize, JWT, Swagger, OTP")
            .build();

        const app = await NestFactory.create(AppModule);
        const PORT = process.env.PORT || 3030;

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup("/docs", app, document);
        app.use(cookieParser());
        app.setGlobalPrefix("api");
        app.useGlobalPipes(new ValidationPipe());

        await app.listen(3000, () => {
            console.log(`Listening ${PORT}-port`);
        });
    } catch (error) {
        console.log(error);
    }
}
start();
