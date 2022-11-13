export default function (store: any): void {
  store.subscribeAction((action: any, state: any) => {
    console.log(state)
    console.log(action.type)
    console.log(action.payload)
  })
}
