const eventBusEmitter = (defaultHandler = null) => {
  const listenersMap = {}

  return {
    on(evName, func) {
      listenersMap[evName] = listenersMap[evName]
        ? [...listenersMap[evName], func]
        : [func]
      console.log('listenersMap', listenersMap)
      return () => {
        listenersMap[evName] = listenersMap[evName].filter((f) => f !== func)
      }
    },
    emit(evName, payload) {
      if (listenersMap[evName])
        listenersMap[evName].forEach((func) => func(payload))
      else if (defaultHandler) defaultHandler(evName)
    },
  }
}

export const eventBus = eventBusEmitter((evName) =>
  console.log(`No handler set for this event name - ${evName}`)
)
