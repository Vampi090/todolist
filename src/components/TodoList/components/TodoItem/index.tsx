import { FC } from "react"
import { Button, Select } from "antd"
import { DeleteOutlined } from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons'
import { ITodoItemComponent } from "./types"
import { TodoStatusEnum } from "@/types"
import { useAppDispatch } from "@/hooks/redux"
import { TodoItemViewMode } from "@/components/TodoList/types"
import { deleteTodoItem, updateTodoItem } from "@/store/todoSlice/actions"
import './style.scss'

const TodoItem: FC<ITodoItemComponent> = ({ title, text, status, setOpenModal, id}) => {
  const dispatch = useAppDispatch()

  const changeStatus = (value: TodoStatusEnum): void => {
    dispatch(updateTodoItem({
      todoItem: {
        title,
        text,
        id,
        status: value
      }
    }))
  }

  const deleteItem = (id: number): void => {
    dispatch(deleteTodoItem({id}))
  }

  const onReadItemModal = (): void => {
    setOpenModal({
      todoItemId: id,
      mode: TodoItemViewMode.read
    })
  }

  const onEditItemModal = (): void => {
    setOpenModal({
      todoItemId: id,
      mode: TodoItemViewMode.edit
    })
  }

  return (
    <li className="todo-list-item">
      <p onClick={() => onReadItemModal()}>{title}</p>
      <div className="todo-list-item__buttons-container">
        <Button type="primary" shape="circle" icon={<DeleteOutlined />} onClick={() => deleteItem(id)} />
        <Button
          onClick={() => onEditItemModal()}
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          size="small"
        />
        <Select
          defaultValue={status}
          style={{ width: 120 }}
          onChange={changeStatus}
          options={[
            { value: TodoStatusEnum['todo'], label: 'to do' },
            { value: TodoStatusEnum['finished'], label: 'finished' },
            { value: TodoStatusEnum['notFinished'], label: 'not finished' },
          ]}
        />
      </div>
    </li>
  )
}

export default TodoItem
