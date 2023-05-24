import { getSectors } from "./requests.js"

const selectItems = async () => {
  const sectors = await getSectors()
  const select = document.querySelector("#filter_sector")

  sectors.forEach((sector) => {
    select.insertAdjacentHTML(
      "beforeend",
      `<option value="${sector.description}">${sector.description}</option>`
    )
  })
}

export { selectItems }
