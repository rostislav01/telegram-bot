import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import { AppUpdate } from './app.update';
import { AppService } from './app.service';

const sessions = new LocalSession({database: 'session_db.json'});

@Module({
  imports: [
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: '5608720075:AAFSxSXmtRBcqdro7RqcZThgafYi2Eh9FhM', 
    })
  ],
  controllers: [],
  providers: [AppService, AppUpdate],
})
export class AppModule {}
