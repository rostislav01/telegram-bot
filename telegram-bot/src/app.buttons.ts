import { Markup } from 'telegraf';

export const actionButtons = () => {
    return Markup.keyboard(
        [
            Markup.button.callback('Авторизация VK', 'auth'),
            Markup.button.callback('Информация о боте', 'info'),
            Markup.button.callback('Мимо проходил', 'exit'),
        ],
        {
            columns: 1
        }
    )
}