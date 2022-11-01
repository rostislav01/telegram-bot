import { AppService } from './app.service';
import { InjectBot, Start, Update, Hears } from 'nestjs-telegraf';
import { Telegraf, Context } from 'telegraf';
import { actionButtons } from './app.buttons';




@Update()
export class AppUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>, private readonly appService: AppService) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Привет!')
    await ctx.reply('Что ты хочешь сделать?', actionButtons())
  }

  @Hears('Информация о боте')
  async getInfoBot() {
    return 'Бот был создан ....'
  }
}
