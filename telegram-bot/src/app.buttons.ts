import { Markup } from 'telegraf';


export const listBtn = 'Список дел'
export const doneBtn = '✅ Завершить';
export const editBtn = 'Редактирование';
export const deleteBtn = '❌ Удаление';


export const actionButtons = () => {
    return Markup.keyboard(
        [
            Markup.button.callback(listBtn, 'list'),
            Markup.button.callback(doneBtn, 'done'),
            Markup.button.callback(editBtn, 'edit'),
            Markup.button.callback(deleteBtn, 'delete'),
        ],
        {
            columns: 1
        }
    )
}