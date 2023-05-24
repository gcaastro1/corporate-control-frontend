import { openModal } from "./modal.js"
import { renderDepCards, renderUserCards } from "./render.js"
import {
  getUnemployedUsers,
  getUsers,
  deleteDep,
  deleteUser,
  editUser,
  editDepartment,
  hireUser,
  fireUser,
} from "./requests.js"

const departmentCards = (department) => {
  const card = document.createElement("li")
  card.classList =
    "flex col gap-20 bg-grey-8 px-30 py-20 border-bottom-primary width-card just-btw"

  const infoDiv = document.createElement("div")
  infoDiv.classList = "flex col gap-12"

  const departmentName = document.createElement("h3")
  departmentName.classList.add("font3")
  departmentName.innerText = department.name

  const depDescription = document.createElement("p")
  depDescription.classList.add("font4")
  depDescription.innerText = department.description

  const companyName = document.createElement("p")
  companyName.classList.add("font4")
  companyName.innerText = department.companies.name

  const buttons = document.createElement("div")
  buttons.classList = "flex row gap-12 just-cntr"

  const viewButton = document.createElement("button")
  viewButton.classList.add("btn")

  viewButton.addEventListener("click", async (e) => {
    const unemployeds = await getUnemployedUsers()
    const users = await getUsers()
    const view = viewDepartment(department, unemployeds, users)
    console.log(view)
    openModal(view)
  })

  const viewIcon = document.createElement("i")
  viewIcon.classList = "fa-regular fa-eye txt-primary font3"

  const editButton = document.createElement("button")
  editButton.classList.add("btn")

  editButton.addEventListener("click", (e) => {
    const edit = editDepartmentModal(department)
    console.log(edit)
    openModal(edit)
  })

  const editIcon = document.createElement("i")
  editIcon.classList = "fa-solid fa-pen-to-square txt-grey-1 font3"

  const deleteButton = document.createElement("button")
  deleteButton.classList.add("btn")

  deleteButton.addEventListener("click", (e) => {
    let deleteModal = deleteDepartmentModal(department)
    openModal(deleteModal)
  })

  const deleteIcon = document.createElement("i")
  deleteIcon.classList = "fa-regular fa-trash-can txt-grey-1 font3"

  viewButton.appendChild(viewIcon)
  editButton.appendChild(editIcon)
  deleteButton.appendChild(deleteIcon)
  buttons.append(viewButton, editButton, deleteButton)
  infoDiv.append(departmentName, depDescription, companyName)
  card.append(infoDiv, buttons)

  return card
}

const userCards = (user, department) => {
  let professionalLevel =
    user.professional_level[0].toUpperCase() +
    user.professional_level.substring(1)

  const card = document.createElement("li")
  card.classList =
    "flex col gap-20 bg-grey-8 px-30 py-20 border-bottom-primary width-card just-btw"

  const infoDiv = document.createElement("div")
  infoDiv.classList = "flex col gap-12"

  const userName = document.createElement("h3")
  userName.classList.add("font3")
  userName.innerText = user.username

  const userLevel = document.createElement("p")
  userLevel.classList.add("font4")
  userLevel.innerText = professionalLevel

  const companyName = document.createElement("p")
  companyName.classList.add("font4")
  if (department != "") {
    companyName.innerText = department.companies.name
  }

  const buttons = document.createElement("div")
  buttons.classList = "flex row gap-12 just-cntr"

  const editButton = document.createElement("button")
  editButton.classList.add("btn")

  editButton.addEventListener("click", (e) => {
    const edit = editUserModal(user)
    openModal(edit)
  })

  const editIcon = document.createElement("i")
  editIcon.classList = "fa-solid fa-pen-to-square txt-primary font3"

  const deleteButton = document.createElement("button")
  deleteButton.classList.add("btn")

  deleteButton.addEventListener("click", (e) => {
    let deleteModal = deleteUserModal(user)
    openModal(deleteModal)
  })

  const deleteIcon = document.createElement("i")
  deleteIcon.classList = "fa-regular fa-trash-can txt-grey-1 font3"

  editButton.appendChild(editIcon)
  deleteButton.appendChild(deleteIcon)
  buttons.append(editButton, deleteButton)
  infoDiv.append(userName, userLevel, companyName)
  card.append(infoDiv, buttons)

  return card
}

/* Modais */

/* Usuário */

const editUserModal = (user) => {
  const arrWork = ["Home Office", "Presencial", "Hibrido"]
  const arrLevel = ["Estágio", "Júnior", "Pleno", "Senior"]

  const form = document.createElement("form")
  form.classList = "flex col gap-12"

  const title = document.createElement("h1")
  title.innerText = "Editar Usuário"
  title.classList = "font1 mg-rgt-100"

  const kindOfWork = document.createElement("select")
  kindOfWork.classList = "txt-grey-1 bg-grey-8 select-company font4"
  const defaultWork = document.createElement("option")
  defaultWork.innerText = "Selecionar modalidade de trabalho "
  defaultWork.value = ""
  defaultWork.disabled = true

  kindOfWork.appendChild(defaultWork)

  arrWork.forEach((work) => {
    const option = document.createElement("option")
    option.innerText = work
    option.value = work.toLowerCase()
    kindOfWork.appendChild(option)

    if (user.kind_of_work == option.value) {
      option.selected = true
    }
  })

  const professionalLevel = document.createElement("select")
  professionalLevel.classList = "txt-grey-1 bg-grey-8 select-company font4"
  const defaultOpt = document.createElement("option")
  defaultOpt.innerText = "Selecionar nível profissional"
  defaultOpt.value = ""
  defaultOpt.disabled = true

  professionalLevel.appendChild(defaultOpt)

  arrLevel.forEach((level) => {
    const option = document.createElement("option")
    option.innerText = level
    option.value = level.toLowerCase()
    professionalLevel.appendChild(option)

    if (user.professional_level == option.value) {
      option.selected = true
    }
  })

  const editButton = document.createElement("button")
  editButton.classList =
    "btn font4 btn-primary width-block py-12 bold txt-grey-8"
  editButton.innerText = "Editar"

  editButton.addEventListener("click", async (e) => {
    e.preventDefault()
    const modal = document.querySelector(".modal-bg")
    const body = {
      kind_of_work: kindOfWork.value,
      professional_level: professionalLevel.value,
    }
    await editUser(body, user.uuid)
    renderUserCards()
    modal.remove()
  })

  form.append(title, kindOfWork, professionalLevel, editButton)
  return form
}

const deleteUserModal = (user) => {
  const container = document.createElement("div")
  container.classList = "flex col gap-20 px-30 py-30"

  const title = document.createElement("h2")
  title.classList = "font2 txt-center"
  title.innerText = `Realmente deseja remover o ${user.username}?`

  const button = document.createElement("button")
  button.classList = "btn font4 btn-success width-block py-12 bold txt-grey-8"
  button.innerText = "Deletar"

  button.addEventListener("click", async (e) => {
    await deleteUser(user.uuid)
    const modal = document.querySelector(".modal-bg")
    renderUserCards()
    modal.remove()
  })

  container.append(title, button)

  return container
}

/* Departamento */

const deleteDepartmentModal = (department) => {
  const container = document.createElement("div")
  container.classList = "flex col gap-20 px-30 py-30"

  const title = document.createElement("h2")
  title.classList = "font2 txt-center"
  title.innerText = `Realmente deseja deletar o Departamento ${department.name} e demitir seus funcionários?`

  const button = document.createElement("button")
  button.classList = "btn font4 btn-success width-block py-12 bold txt-grey-8"
  button.innerText = "Deletar"

  button.addEventListener("click", async (e) => {
    await deleteDep(department.uuid)
    const modal = document.querySelector(".modal-bg")
    renderDepCards()
    modal.remove()
  })

  container.append(title, button)

  return container
}

const editDepartmentModal = (department) => {
  const form = document.createElement("form")
  form.classList = "flex col gap-12"

  const title = document.createElement("h1")
  title.innerText = "Editar Departamento"
  title.classList = "font1 mg-rgt-100"

  const description = document.createElement("textarea")
  description.classList = "txt-grey-1 bg-grey-8 px-20 py-20 font4"
  description.value = department.description

  const editButton = document.createElement("button")
  editButton.classList =
    "btn font4 btn-primary width-block py-12 bold txt-grey-8"
  editButton.innerText = "Editar"

  editButton.addEventListener("click", async (e) => {
    e.preventDefault()
    const body = {
      description: description.value,
    }
    await editDepartment(body, department.uuid)
    const modal = document.querySelector(".modal-bg")
    renderDepCards()
    modal.remove()
  })

  form.append(title, description, editButton)
  return form
}

const viewDepartment = (department, unemployeds, users) => {
  const container = document.createElement("div")
  container.classList = "flex col gap-12"

  const title = document.createElement("h1")
  title.classList.add("font1")
  title.innerText = department.name

  const headerContainer = document.createElement("div")
  headerContainer.classList = "flex row just-btw gap-60"

  const depInfoContainer = document.createElement("div")
  depInfoContainer.classList = "flex col gap-12"

  const depDescription = document.createElement("p")
  depDescription.classList.add("font4")
  depDescription.innerText = department.description

  const company = document.createElement("p")
  company.classList.add("font4")
  company.innerText = department.companies.name

  const formContainer = document.createElement("form")
  formContainer.classList = "flex col gap-12 items-end"

  const select = document.createElement("select")
  select.classList = "txt-grey-1 bg-grey-8 py-12 pr-100 out-none pointer"
  select.id = "select_user"

  const defaultOption = document.createElement("option")
  defaultOption.innerText = "Selecionar Funcionario"
  defaultOption.selected = true
  defaultOption.disabled = true

  select.append(defaultOption)

  unemployeds.forEach((user) => {
    const option = document.createElement("option")
    option.innerText = user.username
    option.value = user.uuid
    option.id = user.uuid

    select.append(option)
  })

  const toHire = document.createElement("button")
  toHire.classList = "btn font4 btn-success py-12 px-20 bold txt-grey-8"
  toHire.innerText = "Contratar"

  const employesList = document.createElement("ul")
  employesList.classList = "flex row gap-8 overflow-x"

  const filterUser = users.filter(
    (user) => user.department_uuid == department.uuid
  )

  filterUser.forEach((user) => {
    const card = employeds(user, department)
    employesList.append(card)
  })

  toHire.addEventListener("click", async (e) => {
    e.preventDefault()
    const body = {
      department_uuid: department.uuid,
      user_uuid: select.value,
    }
    await hireUser(body)
    const newHire = users.filter((user) => user.uuid == select.value)
    const card = employeds(newHire[0], department)
    employesList.appendChild(card)
    defaultOption.selected = true
    const option = document.getElementById(`${newHire[0].uuid}`)
    option.remove()
    renderUserCards()
  })

  depInfoContainer.append(depDescription, company)
  formContainer.append(select, toHire)
  headerContainer.append(depInfoContainer, formContainer)
  container.append(title, headerContainer, employesList)

  return container
}

const employeds = (user, department) => {
  const card = document.createElement("li")
  card.classList =
    "flex col gap-20 bg-grey-8 px-30 py-20 border-bottom-primary width-user just-btw"

  const infoContainer = document.createElement("div")
  infoContainer.classList = "flex col gap-8"

  const name = document.createElement("h3")
  name.classList = "font3 mg-rgt-130"
  name.innerText = user.username

  let level = ""

  if (user.professional_level != "") {
    level =
      user.professional_level[0].toUpperCase() +
      user.professional_level.substring(1)
  }

  const professionalLevel = document.createElement("p")
  professionalLevel.classList.add("font4")
  professionalLevel.innerText = level

  const company = document.createElement("p")
  company.classList.add("font4")
  company.innerText = department.companies.name

  const buttonContainer = document.createElement("div")
  buttonContainer.classList = "flex row just-cntr"

  const firedButton = document.createElement("button")
  firedButton.classList = "btn font4 btn-alert py-12 px-30 bold"
  firedButton.innerText = "Desligar"

  firedButton.addEventListener("click", async (e) => {
    const select = document.querySelector("#select_user")
    await fireUser(user.uuid)
    card.remove()
    select.insertAdjacentHTML(
      "beforeend",
      `<option value="${user.uuid}" id="${user.uuid}">${user.username}</option>`
    )
    renderUserCards()
  })

  infoContainer.append(name, professionalLevel, company)
  buttonContainer.append(firedButton)
  card.append(infoContainer, buttonContainer)

  return card
}

export { departmentCards, userCards }
