import { Input, Modal, Select } from "antd"
import { ChangeEvent, FC, useState } from "react"
import { ITodoItem, TodoStatusEnum } from "@/types"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { ITodoModal } from "@/components/TodoModal/types"
import { createTodo, updateTodoItem } from "@/store/todoSlice/actions"
import { RootState } from "@/store"

const EditModal: FC<Omit<ITodoModal, 'mode' | 'index'>> = ({
  todoItem,
  onCloseModal,
}) => {
  const dispatch = useAppDispatch()
  const { todos, loading } = useAppSelector((state: RootState) => state.todo)
  const [newTodoItem, setNewTodoItem] = useState<ITodoItem>(
    todoItem === null
      ? { title: '', text: '', id: 100000002, status: TodoStatusEnum.notFinished }
      : { ...todoItem }
  )

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setNewTodoItem({ ...newTodoItem as ITodoItem, [name as "title" | "text"]: value})
  }

  const onCopyItem = (id: number) => {
    const copiedItem = todos.find((todo) => todo.id == id) as ITodoItem;
    setNewTodoItem(copiedItem)
  }

  const onSaveTodoItem = (): void => {
    if (todoItem === null) {
      dispatch(createTodo(newTodoItem as ITodoItem))
    } else {
      dispatch(updateTodoItem({ todoItem: {
        title: newTodoItem?.title,
        text: newTodoItem?.text,
        id: todoItem.id,
        status: todoItem.status
      } as ITodoItem }))
    }
    onCloseModal()
  }

  return (
    <Modal
      title={"Edit todo item"}
      open={true}
      onOk={onSaveTodoItem}
      onCancel={onCloseModal}
    >
      <label>
        <p>Title:</p>
        <Input value={newTodoItem?.title} name="title" onChange={onInputChange} />
      </label>
      <label>
        <p>Text:</p>
        <Input value={newTodoItem?.text} name="text" onChange={onInputChange} />
      </label>
      {todoItem === null && !loading && Boolean(todos.length) && (
         <Select
          defaultValue={todos[0].id}
          style={{ width: "100%", marginTop: "20px" }}
          onChange={onCopyItem}
          options={todos.map((todo) => ({ value: todo.id, label: todo.title }))}
        />
      )}
    </Modal>
  )
}

export default EditModal
