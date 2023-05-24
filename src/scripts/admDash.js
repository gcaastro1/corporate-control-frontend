import { navbar } from "./navbar.js"
import { renderDepCards, renderUserCards } from "./render.js"
import { getLocalStorage } from "./localStorage.js"
import { getCompanies, createDepartment, validateUser } from "./requests.js"
import { openModal } from "./modal.js"

// Verificar permissão no localStorage

const verifyPermission = async () => {
  const getLocal = getLocalStorage()
  if (getLocal == "") {
    window.location.href = "/"
  }
  console.log()
  const validate = await validateUser(getLocal.token)
  if (validate.is_admin == false) {
    window.location.href = "/src/pages/userDash/index.html"
  }
}

verifyPermission()

// Logout

const logout = document.querySelector("#logout_button")
logout.addEventListener("click", (e) => {
  localStorage.removeItem("@kenzieEmpresas:token")
  window.location.href = "/"
})

// Preencher o Select

const selectOptions = async () => {
  const companies = await getCompanies("")
  const select = document.querySelector("#companies_select")

  companies.forEach((company) => {
    select.insertAdjacentHTML(
      "beforeend",
      `<option value="${company.uuid}">${company.name}</option>`
    )
  })
}

// Modal de Novo Departamento

const newDepartments = async () => {
  const companies = await getCompanies("")

  const form = document.createElement("form")
  form.classList = "flex col gap-12"

  const title = document.createElement("h1")
  title.innerText = "Criar Departamento"
  title.classList.add("font1")

  const department = document.createElement("input")
  department.type = "text"
  department.placeholder = "Nome do departamento"
  department.classList.add("txt-grey-1")
  department.required = true

  const description = document.createElement("input")
  description.type = "text"
  description.placeholder = "Descrição"
  description.classList.add("txt-grey-1")
  description.required = true

  const companyName = document.createElement("select")
  companyName.classList = "txt-grey-1 bg-grey-8 select-company"
  companyName.required = true
  const defaultOpt = document.createElement("option")
  defaultOpt.innerText = "Selecionar Empresa"
  defaultOpt.selected = true
  defaultOpt.disabled = true
  defaultOpt.value = ""

  companyName.append(defaultOpt)

  companies.forEach((company) => {
    const options = document.createElement("option")
    options.innerText = company.name
    options.value = company.uuid
    companyName.appendChild(options)
  })

  const createButton = document.createElement("button")
  createButton.classList =
    "btn font4 btn-primary width-block py-12 bold txt-grey-8"
  createButton.innerText = "Criar Departamento"

  createButton.addEventListener("click", async (e) => {
    e.preventDefault()
    const body = {
      name: department.value,
      description: description.value,
      company_uuid: companyName.value,
    }
    await createDepartment(body)
    const modal = document.querySelector(".modal-bg")
    renderDepCards()
    modal.remove()
  })

  form.append(title, department, description, companyName, createButton)
  return form
}

const newDep = document.querySelector("#new_department")
newDep.addEventListener("click", async () => {
  const form = await newDepartments()
  openModal(form)
})

navbar()
selectOptions()
renderDepCards()
renderUserCards()
