declare namespace Models {
  interface Todo {
    id: string
    completed?: boolean
    title?: string
  }

  type TodoStatus = 'all' | 'active' | 'completed'

  interface TodoList {
    list: {
      id: string
    }[]
  }
}