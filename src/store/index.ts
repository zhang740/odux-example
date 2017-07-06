import { IocContext } from 'power-di'
// import { Odux, BaseStore, BaseAction } from 'odux'
import { createOdux } from 'odux/simple'
import { createStore, applyMiddleware, compose, Store } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import '../data/stores'

export function storeInit(ioc = IocContext.DefaultInstance): Store<any> {

    const finalCreateStore: any = compose(
        // applyMiddleware(...[]),
        (window as any).devToolsExtension ? (window as any).devToolsExtension() : (f: any) => f
    )(createStore)

    // const odux = ioc.get<Odux>(Odux) || new Odux(undefined, { isDebug: true })

    // simple for actions
    // BaseAction.GlobalAdapters.push(odux)

    // init stores
    // const storeTypes = ioc.getSubClasses<typeof BaseStore>(BaseStore)
    // storeTypes.forEach(storeType => {
    //     ioc.replace(storeType, new storeType(odux))
    // })

    // simple for odux
    const odux = createOdux({ isDebug: true })
    // after all stores loaded
    odux.loadStores()

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
