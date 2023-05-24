import { navbar } from "./navbar.js"
import { getLocalStorage } from "./localStorage.js"
import { openModal } from "./modal.js"
import {
  getUserInfo,
  validateUser,
  getCoworkersInfo,
  getUserDepartments,
  editCurrentUser,
} from "./requests.js"

// Verificar permissão no localStorage

const verifyPermission = async () => {
  const getLocal = getLocalStorage()
  if (getLocal == "") {
    window.location.href = "/"
  }
  console.log()
  const validate = await validateUser(getLocal.token)
  if (validate.is_admin == true) {
    window.location.href = "/src/pages/admDash/index.html"
  }
}
verifyPermission()

// Logout

const logout = document.querySelector("#logout_button")
logout.addEventListener("click", (e) => {
  localStorage.removeItem("@kenzieEmpresas:token")
  window.location.href = "/"
})

const userHeader = async () => {
  const user = await getUserInfo()

  const section = document.querySelector("#user_info")
  section.innerHTML = ""

  let kindOfWork = user.kind_of_work
  let professionalLevel =
    user.professional_level[0].toUpperCase() +
    user.professional_level.substring(1)

  if (kindOfWork != null) {
    kindOfWork =
      user.kind_of_work[0].toUpperCase() + user.kind_of_work.substring(1)
  } else {
    kindOfWork = ""
  }

  section.insertAdjacentHTML(
    "beforeend",
    `
    <div class="flex col gap-12">
      <h2>${user.username}</h2>
      <div class="flex row gap-50">
        <p>E-mail: ${user.email}</p>
        <p>${professionalLevel}</p>
        <p>${kindOfWork}</p>
      </div>
    </div>
    <button class="btn" id="edit_button">
      <i class="fa-solid fa-pen-to-square txt-primary font3"></i>
    </button>
  `
  )

  const editButton = document.querySelector("#edit_button")
  editButton.addEventListener("click", async (e) => {
    const form = await editModal()
    openModal(form)
  })
}

const userCoworkers = async (e) => {
  const user = await getUserInfo()
  const list = document.querySelector("#list_coworkers")
  const section = document.querySelector("#user_company")

  if (user.department_uuid != null) {
    const userDepartments = await getUserDepartments()
    const coworkers = await getCoworkersInfo()
    section.insertAdjacentHTML(
      "afterbegin",
      `<div class="width-block flex row just-cntr bg-primary py-20 px-20 txt-grey-8">
        <h1>Company Name - Department Name</h1>
      </div>
      `
    )
    coworkers[0].users.forEach((coworker) => {
      list.insertAdjacentHTML(
        "beforeend",
        `
        <li class="border-full-primary flex col gap-12 py-12 px-20 bg-grey-8 width-user">
          <p class="font4 bold">${coworker.username}</p>
          <p class="font4">${userDepartments.name}</p>
        </li>
        `
      )
    })
  } else {
    list.insertAdjacentHTML(
      "beforeend",
      `
      <li class="flex row just-cntr width-block py-90">
        <h1>Você ainda não foi contratado</h1>
      </li>
      `
    )
  }
}

const editModal = async () => {
  const user = await getUserInfo()

  const form = document.createElement("form")
  form.classList = "flex col gap-12"

  const title = document.createElement("h1")
  title.innerText = "Editar Usuário"
  title.classList = "font1 mg-rgt-100"

  const usernameInput = document.createElement("input")
  usernameInput.type = "text"
  usernameInput.placeholder = "Seu nome"
  usernameInput.classList.add("txt-grey-1")
  usernameInput.value = user.username
  usernameInput.required = true

  const emailInput = document.createElement("input")
  emailInput.type = "text"
  emailInput.placeholder = "Seu e-mail"
  emailInput.classList.add("txt-grey-1")
  emailInput.value = user.email
  emailInput.required = true

  const passwordInput = document.createElement("input")
  passwordInput.type = "text"
  passwordInput.placeholder = "Sua senha"
  passwordInput.classList.add("txt-grey-1")

  const button = document.createElement("button")
  button.innerText = "Editar perfil"
  button.classList = "btn font4 btn-primary width-block py-12 bold txt-grey-8"

  button.addEventListener("click", async (e) => {
    e.preventDefault()
    const body = {}

    if (usernameInput.value != user.username) {
      body.username = usernameInput.value
    }
    if (emailInput.value != user.email) {
      body.email = emailInput.value
    }
    if (passwordInput.value != "") {
      body.password = passwordInput.value
    }

    await editCurrentUser(body)
    await userHeader()
    const modal = document.querySelector(".modal-bg")
    modal.remove()
  })

  form.append(title, usernameInput, emailInput, passwordInput, button)

  return form
}

navbar()
userHeader()
userCoworkers()
