import { navbar } from "./navbar.js"
import { registerRequest } from "./requests.js"

const newUser = () => {
  const form = document.querySelector("form")
  const elements = [...form.elements]

  const button = document.querySelector("#new_user")

  form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const body = {}

    elements.forEach((input) => {
      if (input.tagName == "INPUT" || input.tagName == "SELECT") {
        body[input.name] = input.value
      }
    })

    await registerRequest(body)
  })
}

const loginPage = document.querySelector("#login_button")
const homePage = document.querySelector("#home_button")
const returnPage = document.querySelector("#return_button")

loginPage.addEventListener("click", () => {
  window.location.href = "/src/pages/login/index.html"
})
returnPage.addEventListener("click", () => {
  window.history.back()
})
homePage.addEventListener("click", () => {
  window.location.href = "/"
})

navbar()
newUser()
