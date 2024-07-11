import {useAppSelector, useAppDispatch} from "@/hooks/redux"
import {FC, useEffect, useState} from "react"
import {ModalStateType, TodoItemViewMode} from "@/components/TodoList/types"
import {TodoStatusEnum} from "@/types"
import {TodoModal} from "@/components"
import TodoItem from "./components/TodoItem"
import {Button, Radio, RadioChangeEvent} from "antd"
import { RootState } from "../../store"
import { ITodoItem } from "@/types"
import './style.scss'
import { getTodos } from "@/store/todoSlice/actions"

const TodoList: FC = () => {
  const [openModal, setOpenModal] = useState<ModalStateType>(null)
  const [filterValue, setFilterValue] = useState<TodoStatusEnum | 'all'>('all')
  const { todos, loading } = useAppSelector((state: RootState) => state.todo)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTodos({}));
  }, [])

  const onCloseModal = (): void => {
    setOpenModal(null)
  }

  const onAddNewItem = (): void => {
    setOpenModal({ mode: TodoItemViewMode.edit, todoItemId: -1})
  }

  const onChangeFilter = (e: RadioChangeEvent): void => {
    setFilterValue(e.target.value)
  }

  return (
    loading ? <>Loading ...</> : <>
      {Boolean(todos.length) &&
        <Radio.Group onChange={(e) => onChangeFilter(e)} defaultValue={'all'}>
          <Radio.Button value={'all'}>All</Radio.Button>
          <Radio.Button value={TodoStatusEnum.todo}>To do</Radio.Button>
          <Radio.Button value={TodoStatusEnum.notFinished}>Process</Radio.Button>
          <Radio.Button value={TodoStatusEnum.finished}>Finished</Radio.Button>
        </Radio.Group>
      }
      <ul className="todo-list">
        {Boolean(todos.length) && (
          filterValue === 'all'
          ? [ ...todos ].map((todo: ITodoItem, index: number) =>
              <TodoItem key={todo.id} index={index} {...todo} setOpenModal={setOpenModal} />
            )
          : [ ...todos ].filter((todoItem: ITodoItem) => todoItem.status === filterValue).map((todo: ITodoItem, index: number) =>
              <TodoItem key={todo.id} index={index} {...todo} setOpenModal={setOpenModal} />
            )
        )}

        {!todos.length &&
          <h2>
            No todo Items yet
          </h2>
        }
      </ul>
      <Button color="primary" onClick={() => onAddNewItem()}>add new todoItem</Button>
      {openModal !== null &&
        <TodoModal
          mode={openModal.mode}
          todoItem={openModal.todoItemId < 0 ? null : todos.find(todo => todo.id == openModal.todoItemId) as ITodoItem}
          onCloseModal={onCloseModal}
        />
      }
    </>
  )
}

export default TodoList