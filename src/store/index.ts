import { IocContext } from 'power-di'
import { Odux, BaseStore, BaseAction } from 'odux'
import { createStore, applyMiddleware, compose, Store } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import '../data/stores'

export function storeInit(ioc = IocContext.DefaultInstance): Store<any> {
    const adapter = ioc.get<Odux>(Odux) || new Odux(undefined, { isDebug: true })

    BaseAction.GlobalAdapters.push(adapter)

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
