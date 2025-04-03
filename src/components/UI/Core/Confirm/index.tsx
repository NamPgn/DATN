import { Popconfirm } from 'antd'
import { memo } from 'react'
import { toast } from 'react-toastify';

const MVConfirm = memo(({ title, cancelText, okText, onConfirm, children, ...rest }: any) => {
  const cancel = () => {
    toast.error('Hủy');
  }
  return (
    <Popconfirm
      title={title}
      onCancel={cancel}
      onConfirm={onConfirm}
      okText={okText}
      cancelText={cancelText}
      {...rest}
    >{children}</Popconfirm>
  )
})

export default MVConfirm