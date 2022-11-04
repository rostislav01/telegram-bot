import { Context as ContextTelegraf } from 'telegraf'

export interface Context extends ContextTelegraf {
	session: {
		type?: string
	}
}

export interface ButtonI {
	text: string;
	type: string;
}