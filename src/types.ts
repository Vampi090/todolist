export enum TodoStatusEnum {
  "notFinished" = 0,
  "finished" = 1,
  "todo" = 2
}

export interface ITodoItem {
  id: number
  title: string
  text: string
  status: TodoStatusEnum
}
