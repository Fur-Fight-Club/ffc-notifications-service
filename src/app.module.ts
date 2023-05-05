import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PrismaService } from './services/prisma.service';
import { EmailsModule } from './emails/emails.module';
import { MatchMessageModule } from './match-message/match-message.module';

@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true,
  }), AuthModule, EmailsModule, MatchMessageModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
