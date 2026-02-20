export function useTitle() {
  let oldValue = 'Hello'
  let newValue = 'World'
  const title = ref(oldValue)
  function changeTitle() {
    oldValue = title.value
    title.value = newValue
    newValue = oldValue
  }
  return {
    title,
    changeTitle,
  }
}
