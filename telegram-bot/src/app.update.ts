import {
	Ctx,
	Hears,
	InjectBot,
	Message,
	On,
	Start,
	Update
} from 'nestjs-telegraf'
import { Telegraf } from 'telegraf'
import { actionButtons, createButton, deleteButton, doneButton, editButton, listButton } from './app.buttons'
import { AppService } from './app.service'
import { showList } from './app.utils'
import { Context } from './app.interface'

@Update()
export class AppUpdate {
	constructor(
		@InjectBot() private readonly bot: Telegraf<Context>,
		private readonly appService: AppService
	) {}

	@Start()
	async startCommand(ctx: Context) {
		await ctx.reply('Привет 👋')
		await ctx.reply('Что ты хочешь сделать?', actionButtons())
	}

	@Hears(createButton.text)
	async createTask(ctx: Context) {
		ctx.session.type = createButton.type;
		await ctx.reply('Опиши задачу: ')
	}

	@Hears(listButton.text)
	async listTask(ctx: Context) {
		const todos = await this.appService.getAll()
		if(todos.length === 0) {
			await ctx.reply("Твой список дел пуст");
			
		} else {
			await ctx.reply(showList(todos))
		}

	}

	@Hears(doneButton.text)
	async doneTask(ctx: Context) {
		ctx.session.type = doneButton.type;
		await ctx.deleteMessage()
		await ctx.reply('Напиши ID задачи: ')
	}

	@Hears(editButton.text)
	async editTask(ctx: Context) {
		ctx.session.type = editButton.type;
		await ctx.deleteMessage()
		await ctx.replyWithHTML(
			'Напиши ID и новое название задачи: \n\n' +
				'В формате - <b>1 | Новое название</b>'
		)
	}

	@Hears(deleteButton.text)
	async deleteTask(ctx: Context) {
		ctx.session.type = deleteButton.type;
		await ctx.deleteMessage()
		await ctx.reply('Напиши ID задачи: ')
	}

	@On('text')
	async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
		if (!ctx.session.type) return

		if (ctx.session.type === createButton.type) {
			const todos = await this.appService.createTask(message)
			await ctx.reply(showList(todos))
		}

		if (ctx.session.type === doneButton.type) {
			const todos = await this.appService.doneTask(Number(message))

			if (!todos) {
				await ctx.deleteMessage()
				await ctx.reply('Задачи с таким ID не найдено!')
				return
			}

			await ctx.reply(showList(todos))
		}

		if (ctx.session.type === editButton.type) {
			const [taskId, taskName] = message.split(' - ')
			const todos = await this.appService.editTask(Number(taskId), taskName)

			if (!todos) {
				await ctx.deleteMessage()
				await ctx.reply('Задачи с таким ID не найдено!')
				return
			}

			await ctx.reply(showList(todos))
		}

		if (ctx.session.type === deleteButton.type) {
			const todos = await this.appService.deleteTask(Number(message))

			if (!todos) {
				await ctx.deleteMessage()
				await ctx.reply('Задачи с таким ID не найдено!')
				return
			}

			await ctx.reply(showList(todos))
		}
	}
}
