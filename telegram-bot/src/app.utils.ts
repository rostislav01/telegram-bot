import { TodosI } from "./app.interface"


export const showList = (todos: TodosI[]): string => {
    return `Ваш список задач:\n\n${todos.map(todo => (todo.isCompleted ? '✅' : '🔘') + ' ' + todo.name + '\n\n')
        .join('')}`
}