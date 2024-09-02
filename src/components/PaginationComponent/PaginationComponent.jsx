import React from 'react'
import { ConfigProvider, Pagination } from 'antd'

const theme = {
  components: {
    Pagination: {
      itemBg: '#EBEEF3', // Цвет фона неактивных кнопок
      itemBorderColor: '#d9d9d9', // Цвет границы неактивных кнопок
      itemActiveBg: '#1890FF', // Цвет фона активной кнопки
      itemActiveBorderColor: '#1890FF', // Цвет границы активной кнопки
      colorText: '#000000', // Цвет текста неактивных кнопок
      colorPrimary: '#ffffff', // Цвет текста активной кнопки
      colorPrimaryHover: '#ffffff', // Цвет текста активной кнопки
    },
  },
}

const PaginationComponent = ({ currentPage, pageSize, total, onChange }) => {
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
