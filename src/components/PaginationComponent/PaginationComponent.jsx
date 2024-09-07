import { ConfigProvider, Pagination } from 'antd'

import theme from './PaginationComponent.constants'

function PaginationComponent({ currentPage, pageSize, total, onChange }) {
  return (
    <ConfigProvider theme={theme}>
      <Pagination
        showQuickJumper
        align="center"
        current={currentPage}
        pageSize={pageSize}
        total={total}
        showSizeChanger={false}
        onChange={onChange}
        hideOnSinglePage
        style={{ marginBottom: '10px' }}
      />
    </ConfigProvider>
  )
}

export default PaginationComponent
