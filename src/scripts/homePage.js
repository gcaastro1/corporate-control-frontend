import { navbar } from "./navbar.js"
import { selectItems } from "./filter.js"
import { getCompanies } from "./requests.js"

const registerPage = document.querySelector("#register_button")
const loginPage = document.querySelector("#login_button")

registerPage.addEventListener("click", () => {
  window.location.href = "./src/pages/register/index.html"
})
loginPage.addEventListener("click", () => {
  window.location.href = "./src/pages/login/index.html"
})

const createCards = (company) => {
  const companiesList = document.querySelector("#list_sectors")

  companiesList.insertAdjacentHTML(
    "beforeend",
    `<li
      class="flex col gap-12 bg-grey-8 py-12 px-25 border-bottom-primary width-block just-btw list-item"
    >
      <h4 class="font4">${company.name}</h4>
      <div class="flex col gap-12">
        <p class="font5">${company.opening_hours}</p>
        <span
          class="border-full-primary width-fit txt-primary px-25 py-6 radius-full"
        >
        ${company.sectors.description}
        </span>
      </div>
    </li>`
  )
}

const renderCards = async (sector) => {
  const companies = await getCompanies(sector)
  const companiesList = document.querySelector("#list_sectors")

  companiesList.innerHTML = ""
  companies.forEach((company) => {
    createCards(company)
  })
}

const filterCompanies = () => {
  const select = document.querySelector("#filter_sector")

  select.addEventListener("change", () => {
    renderCards(select.value)
  })
}

navbar()
selectItems()
renderCards("")
filterCompanies()
