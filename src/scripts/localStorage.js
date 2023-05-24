export const getLocalStorage = () => {
  const token = JSON.parse(localStorage.getItem("@kenzieEmpresas:token")) || ""
  return token
}
