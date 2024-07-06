import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useGlobalFilters } from './common/filters/global.filters';
import { useGlobalPipes } from './common/pipes/global.pipe';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useGlobalPipes(app);
  useGlobalFilters(app);
  const configService = app.get(ConfigService);

  const port = configService.get('BASE_PORT') || 3000;
  await app.listen(port);
}
bootstrap();
