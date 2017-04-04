import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Provider } from 'odux'

import { TodoApp } from './scenes/main'
import { storeInit } from './store'

function render() {
  const appStore = storeInit()
  ReactDom.render(
    <Provider store={appStore}>
      <TodoApp />
    </Provider>,
    document.getElementsByClassName('todoapp')[0]
  )
}
render()