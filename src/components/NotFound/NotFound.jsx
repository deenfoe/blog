import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <Result
      status="404"
      title="Страница не найдена"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  )
}

export default NotFound
