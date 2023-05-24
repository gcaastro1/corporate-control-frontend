const openModal = (children) => {
  const body = document.querySelector("body")

  const modalBg = document.createElement("section")
  modalBg.classList.add("modal-bg")

  const modalContainer = document.createElement("div")
  modalContainer.classList.add("modal-container")

  const closeModal = document.createElement("button")
  closeModal.classList = "btn modal-close"

  const closeIcon = document.createElement("i")
  closeIcon.classList = "fa-solid fa-xmark font4 txt-grey-1"

  modalBg.addEventListener("click", (e) => {
    const { className } = e.target
    if (
      className === "modal-bg" ||
      className === "fa-solid fa-xmark font4 txt-grey-1"
    ) {
      modalBg.remove()
    }
  })

  closeModal.appendChild(closeIcon)
  modalContainer.append(closeModal, children)
  modalBg.appendChild(modalContainer)
  body.appendChild(modalBg)
}

export { openModal }
