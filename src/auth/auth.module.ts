import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import * as fs from "fs"


@Module({
  imports: [ConfigModule, JwtModule.register({
    global: true,
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
