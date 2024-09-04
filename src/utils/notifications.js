import { message } from 'antd'

export const notifications = (action) => {
  let messageText = ''

  switch (action) {
    case 'delete':
      messageText = 'Статья была успешно удалена.'
      break
    case 'edit':
      messageText = 'Статья была успешно отредактирована!'
      break
    case 'create':
      messageText = 'Статья была успешно создана.'
      break
    default:
      messageText = 'Статья была успешно создана.'
      break
  }

  message.success(messageText, 1.5)
}

export default notifications
