import { departmentCards, userCards } from "./cards.js"
import { getDepartment, getUsers, getCompanyDepartments } from "./requests.js"

const renderDepCards = async () => {
  const departments = await getDepartment()
  const list = document.querySelector("#companies_list")

  list.innerHTML = ""

  departments.forEach((department) => {
    const card = departmentCards(department)
    list.append(card)
  })
}

const renderUserCards = async () => {
  const users = await getUsers()
  const departments = await getDepartment()
  const list = document.querySelector("#users_list")

  list.innerHTML = ""

  users.forEach((user) => {
    if (user.is_admin != true) {
      let userDepartment = departments.filter(
        (dep) => dep.uuid == user.department_uuid
      )
      if (userDepartment.length == 0) {
        userDepartment = ""
      } else {
        userDepartment = userDepartment[0]
      }
      const card = userCards(user, userDepartment)
      list.append(card)
    }
  })
}

const filterDep = async () => {
  const select = document.querySelector("#companies_select")
  const list = document.querySelector("#companies_list")

  select.addEventListener("change", async (e) => {
    list.innerHTML = ""
    const departments = await getCompanyDepartments(select.value)

    console.log(departments)
    if (departments != []) {
      departments.forEach((department) => {
        const card = departmentCards(department)
        list.append(card)
      })
    }
    console.log(list.children.length)
    if (list.children.length == 0) {
      console.log(departments)
      list.insertAdjacentHTML(
        "afterbegin",
        `<li class="width-block flex col items-center"><h3 class="font3">Nenhum departamento encontrado</h3></li>`
      )
    }
  })
}
filterDep()

export { renderDepCards, renderUserCards }
