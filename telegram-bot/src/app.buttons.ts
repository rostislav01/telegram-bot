import { Markup } from 'telegraf'


export const createButton = {
	text: '⚡️ Создать задачу',
	type: 'create'
}
export const listButton = {
	text: '📋 Список задач',
	type: 'list'
}
export const doneButton = {
	text: '✅ Завершить',
	type: 'done'
}
export const editButton = {
	text: '✏️ Редактирование',
	type: 'edit'
}
export const deleteButton = {
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
