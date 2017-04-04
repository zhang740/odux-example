import { IocContext } from 'power-di'
import { BaseStore, ReduxStoreAdapter } from 'odux'
import { createStore, applyMiddleware, compose, Store } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'

export function storeInit(first = true, ioc = IocContext.DefaultInstance): Store<any> {
    const adapter = ioc.get<ReduxStoreAdapter>(ReduxStoreAdapter)
    if (!adapter) {
        if (!first) {
            throw new Error('storeInit fail.')
        }
        ioc.register(ReduxStoreAdapter)
        return storeInit(false)
    }
    const storeTypes = ioc.getSubClasses<typeof BaseStore>(BaseStore)
    storeTypes.forEach(storeType => {
        ioc.replace(storeType, new storeType(adapter))
    })

    const finalCreateStore: any = compose(applyMiddleware(...[]))(createStore)
    const rootReducer = adapter.mainReducer.bind(adapter)

    // persist the store
    const store = autoRehydrate()(finalCreateStore)(rootReducer)
    persistStore(store, {
        // whitelist: [
        // ]
    }, (err: any, state: any) => {
    })

    adapter.setRootStore(store)
    return store
}
