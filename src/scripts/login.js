import { navbar } from "./navbar.js"
import { loginRequest } from "./requests.js"

const login = () => {
  const form = document.querySelector("form")
  const elements = [...form.elements]

  form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const body = {}

    elements.forEach((input) => {
      if (input.tagName == "INPUT" || input.value !== "") {
        body[input.name] = input.value
      }
    })
    console.log(body)
    await loginRequest(body)
  })
}

const registerPage = document.querySelector("#register_button")
const homePage = document.querySelector("#home_button")
const registerButton = document.querySelector("#new_user")

registerPage.addEventListener("click", () => {
  window.location.href = "/src/pages/register/index.html"
})
registerButton.addEventListener("click", () => {
  window.location.href = "/src/pages/register/index.html"
})
homePage.addEventListener("click", () => {
  window.location.href = "/"
})

navbar()
login()
