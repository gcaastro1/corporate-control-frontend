const navbar = () => {
  const button = document.querySelector("#menu_button")

  button.addEventListener("click", (e) => {
    const nav = document.querySelector(".nav-list")
    const icon = document.querySelector("#menu_icon")
    const main = document.querySelector("main")

    if (nav.classList.contains("show-nav")) {
      nav.classList.remove("show-nav")
      main.classList.remove("down-main")
      main.classList.add("up-main")
      setTimeout(() => {
        main.classList.toggle("mg-top-50")
        nav.classList.remove("change-index")
      }, 1000)
      icon.classList.toggle("remove-icon")
      setTimeout(() => {
        icon.classList.toggle("fa-xmark")
        icon.classList.toggle("remove-icon")
        icon.classList.toggle("fa-bars")
      }, 500)

      nav.classList.add("close-nav")
      setTimeout(() => {
        nav.classList.remove("close-nav")
      }, 500)
    } else {
      nav.classList.add("show-nav")
      main.classList.remove("up-main")
      main.classList.add("down-main")
      setTimeout(() => {
        main.classList.toggle("mg-top-50")
        nav.classList.add("change-index")
      }, 980)
      icon.classList.toggle("remove-icon")
      setTimeout(() => {
        icon.classList.toggle("fa-bars")
        icon.classList.toggle("remove-icon")
        icon.classList.toggle("fa-xmark")
      }, 500)
    }
  })
}

export { navbar }
