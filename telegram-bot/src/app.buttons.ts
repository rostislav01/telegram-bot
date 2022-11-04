import { stringify } from 'querystring'
import { Markup } from 'telegraf'
import { ButtonI } from './app.interface'


export const createButton: ButtonI = {
	text: '⚡️ Создать задачу',
	type: 'create'
}
export const listButton: ButtonI = {
	text: '📋 Список задач',
	type: 'list'
}
export const doneButton: ButtonI = {
	text: '✅ Завершить',
	type: 'done'
}
export const editButton: ButtonI = {
	text: '✏️ Редактирование',
	type: 'edit'
}
export const deleteButton: ButtonI = {
	text: '❌ Удаление',
	type: 'delete'
}

export function actionButtons() {
	return Markup.keyboard(
		[
			Markup.button.callback(createButton.text, createButton.type),
			Markup.button.callback(listButton.text, listButton.type),
			Markup.button.callback(doneButton.text, doneButton.type),
			Markup.button.callback(editButton.text, editButton.type),
			Markup.button.callback(deleteButton.text, deleteButton.type),
		],
		{
			columns: 2
		}
	)
}
