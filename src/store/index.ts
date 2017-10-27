import { IocContext } from 'power-di'
import { createOdux, createOduxAIO } from 'odux'
import '../data/stores'

export function storeInit(ioc = IocContext.DefaultInstance) {
    return createOduxAIO({ devMode: true })
}
