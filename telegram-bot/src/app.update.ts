import { AppService } from './app.service';
import { InjectBot, Start, Update, Hears, On, Message, Ctx } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { Context, TodosI } from './app.interface'
import { actionButtons, deleteBtn, doneBtn, editBtn, listBtn } from './app.buttons';
import { showList } from './app.utils';
import { createContext } from 'vm';


const todos: TodosI[] = [
  {
    id: 1,
    name: 'Buy goods',
    isCompleted: false,
  },
  {
    id: 2,
    name: 'go to walk',
    isCompleted: false,
  },
  {
    id: 3,
    name: 'Buy eat',
    isCompleted: true,
  }
]


@Update()
export class AppUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>, private readonly appService: AppService) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Привет!');
    await ctx.reply('Что ты хочешь сделать?', actionButtons());
  }

  @Hears(listBtn)
  async getListTask(ctx: Context) {
    await ctx.reply(showList(todos))
  }

  @Hears(doneBtn)
  async doneTask(ctx: Context) {
    ctx.session.type = 'done';
    await ctx.reply('Напиши ID задачи: ');
   
  }

  @Hears(editBtn)
  async editTask(ctx: Context) {
    ctx.session.type = 'edit';
    await ctx.deleteMessage();
    await ctx.replyWithHTML('Напиши ID и новое название задачи: \n\n' + 'В формате - <b>1 - Новое название</b>');
   
  }


  @Hears(deleteBtn)
  async deleteTask(ctx: Context) {
    ctx.session.type = 'remove';
    await ctx.reply('Напиши ID задачи: ');

  }


  @On('text')
  async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    if(!ctx.session.type) return;
    if(ctx.session.type === 'done') {
      const todo = todos.find(t => t.id === Number(message));
      if(!todo) {
        await ctx.deleteMessage();
        await ctx.reply('Задача с таким ID не найдено');
      }
      todo.isCompleted = !todo.isCompleted;
      await ctx.reply(showList(todos));
    }

    if(ctx.session.type === 'edit') {
      const [taskId, taskName] = message.split(' - ');
      const todo = todos.find(t => t.id === Number(taskId));
      if(!todo) {
        await ctx.deleteMessage();
        await ctx.reply('Задача с таким ID не найдено');
      }
      todo.name = taskName;
      await ctx.reply(showList(todos))
    }

    if(ctx.session.type === 'remove') {
      const todo = todos.find(t => t.id === Number(message));
      if(!todo) {
        await ctx.deleteMessage();
        await ctx.reply('Задача с таким ID не найдено');
      }
      await ctx.reply(showList(todos.filter(t => t.id != Number(message))));
    }



  }
}
