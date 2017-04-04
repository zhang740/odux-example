export class Utils {

  public static uuid(): string {
    let i, random
    let uuid = ''

    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-'
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
        .toString(16)
    }

    return uuid
  }

  public static pluralize(count: number, word: string) {
    return count === 1 ? word : word + 's'
  }

  public static store(namespace: string, data?: any) {
    if (data) {
      return localStorage.setItem(namespace, JSON.stringify(data))
    }

    let store = localStorage.getItem(namespace)
    return (store && JSON.parse(store)) || []
  }

  public static extend(...objs: any[]): any {
    let newObj = {}
    for (let i = 0; i < objs.length; i++) {
      let obj = objs[i]
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = obj[key]
        }
      }
    }
    return newObj
  }
}
