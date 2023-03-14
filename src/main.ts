import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from './modules/config/config.service';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('/api/v1');

  const config = new DocumentBuilder()
    .setTitle('Food Card APIs')
    .setDescription('Food Card APIs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const configService = new ConfigService();
  await app.listen(await configService.getPortConfig());

  logger.log(`Application is running on : ${await app.getUrl()}`);
}
bootstrap();
