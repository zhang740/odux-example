import * as React from 'react'
import * as ReactDom from 'react-dom'

import TodoApp from './scenes/main'
import { storeInit } from './store'

function render() {
    ReactDom.render(<TodoApp />,
        document.getElementsByClassName('todoapp')[0]
    )
}

storeInit()
render()
