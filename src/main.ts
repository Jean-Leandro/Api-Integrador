import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { config } from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )


  const config = new DocumentBuilder()
  .setTitle('API Integrador')
  .setDescription(
    'A presente API tem como objetivo simular cadastro e login do projeto Integrador.',
  )
  .setVersion('1.0')
  .addTag('usuario')
  .addTag('')
  .build();

  const document = SwaggerModule.createDocument( app, config);
  SwaggerModule.setup('api', app, document);


  useContainer(app.select(AppModule),{fallbackOnErrors:true})
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
