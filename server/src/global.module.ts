import { Global, Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { AppService } from './app.service';
import { environment } from './util/environment';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailService } from './email.service';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),

    MailerModule.forRootAsync({
      useFactory: () => {
        return {
          transport: {
            service: 'gmail',
            auth: {
              user: 'md.mizan3079@gmail.com',
              pass: 'qxcznrullqdmgber',
            },
          },
          defaults: {
            from: `"Socialbook " <${environment.email.defaultSender}>`,
          },
          template: {
            dir: __dirname + '../views',
            adapter: new HandlebarsAdapter(),
          },
        };
      },
    }),
    MongooseModule.forRoot(environment.mongoUrl, {
      dbName: 'realstate',
    }),
  ],
  providers: [AppService, EmailService],
  exports: [AppService, EmailService],
})
export class GlobalModule {}
