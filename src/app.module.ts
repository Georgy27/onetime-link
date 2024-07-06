import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { LinkModule } from './link/link.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    LinkModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
