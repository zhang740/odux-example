import { IocContext } from 'power-di'
import { createOdux, createOduxAIO } from 'odux/simple'
import { createStore, applyMiddleware, compose, Store } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import '../data/stores'

export function storeInit(ioc = IocContext.DefaultInstance): Store<any> {

    // 1. create odux (all in one)
    const odux = createOduxAIO({ isDebug: true })

    // 2. after all stores import
    odux.initStores()

    return odux.getRootStore()
}

export function _mixStoreInit(ioc = IocContext.DefaultInstance): Store<any> {

    const finalCreateStore: any = compose(
        // applyMiddleware(...[]),
        (window as any).devToolsExtension ? (window as any).devToolsExtension() : (f: any) => f
    )(createStore)

    // 1. create odux (for simple)
    const odux = createOdux({ isDebug: true })

    // 2. after all stores import
    odux.initStores()

    // 3. config reducer, also can use combine reducer.
    // can use: adapter.setPrefix('_prefix') , to change node structure
    const rootReducer = odux.mainReducer.bind(odux)

    // persist the store
    const store = autoRehydrate()(finalCreateStore)(rootReducer)
    persistStore(store, {}, (err: any, state: any) => { })

    // 4. set store for odux
    odux.setRootStore(store)
    return store
}

import { Odux, BaseStore, BaseAction } from 'odux'
export function _customStoreInit(ioc = IocContext.DefaultInstance) {

    const finalCreateStore: any = compose(
        // applyMiddleware(...[]),
        (window as any).devToolsExtension ? (window as any).devToolsExtension() : (f: any) => f
    )(createStore)

    // create odux
    const odux = ioc.get<Odux>(Odux) || new Odux(undefined, { isDebug: true })

    // simple for actions
    BaseAction.GlobalAdapters.push(odux)

    // init stores
    const storeTypes = ioc.getSubClasses<typeof BaseStore>(BaseStore)
    storeTypes.forEach(storeType => {
        ioc.replace(storeType, new storeType(odux))
    })

    // config reducer, also can use combine reducer.
    // can use: adapter.setPrefix('_prefix') , to change node structure
    const rootReducer = odux.mainReducer.bind(odux)

    // persist the store
    const store = autoRehydrate()(finalCreateStore)(rootReducer)
    persistStore(store, {
        // whitelist: [
        // ]
    }, (err: any, state: any) => {
    })

    odux.setRootStore(store)
    return store
}