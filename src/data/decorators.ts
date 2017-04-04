import { IocContext } from 'power-di'
import { getDecorators } from 'power-di/helper'
export const { lazyInject, register, registerSubClass } = getDecorators()
import { connect as oduxConnect, MapStateToProps } from 'odux'

export function registerStore() {
    return register(undefined, { autoNew: false, regInSuperClass: true })
}

export function connect<T>(mapper: (ioc: IocContext) => MapStateToProps<T>) {
    return oduxConnect(mapper(IocContext.DefaultInstance))
}