const toastfy = (message, type) => {
  const body = document.querySelector("body")

  const container = document.createElement("div")
  container.classList = "toast-container txt-grey-8"
  container.id = "toastfy"

  if (type == "error") {
    container.classList.add("bg-alert")
  } else if (type == "success") {
    container.classList.add("bg-success")
  }

  const toastMessage = document.createElement("p")
  toastMessage.classList = "font4 bold"
  toastMessage.innerText = message

  container.appendChild(toastMessage)
  body.appendChild(container)
}

export { toastfy }
