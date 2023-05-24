import { getLocalStorage } from "./localStorage.js"
import { toastfy } from "./toastfy.js"

const baseUrl = "http://localhost:6278"
const getStorage = getLocalStorage()

/* Rotas sem token */

/* GET */

const getSectors = async () => {
  try {
    const data = await fetch(`${baseUrl}/sectors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const response = await data.json()
    /* console.log(response) */
    return response
  } catch (err) {
    console.log(err)
  }
}

const getCompanies = async (sector) => {
  try {
    const data = await fetch(`${baseUrl}/companies/${sector}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const response = await data.json()
    /* console.log(response) */
    return response
  } catch (err) {
    console.log(err)
  }
}

const validateUser = async (token) => {
  try {
    const data = await fetch(`${baseUrl}/auth/validate_user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    const response = await data.json()
    return response
  } catch (err) {
    console.log(err)
  }
}

/* POST */

const registerRequest = async (body) => {
  try {
    const data = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    if (data.ok) {
      toastfy("Conta criada com sucesso.", "success")
      const toast = document.querySelector("#toastfy")
      setTimeout(() => {
        toast.remove()
        window.location.href = "/src/pages/login/index.html"
      }, 4900)
    } else {
      toastfy("Algo deu errado.", "error")
      const toast = document.querySelector("#toastfy")
      setTimeout(() => {
        toast.remove()
      }, 4900)
    }
    /* console.log(response) */
    return data
  } catch (err) {
    console.log(err)
  }
}

const loginRequest = async (body) => {
  try {
    const data = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    const response = await data.json()
    if (data.ok) {
      localStorage.setItem("@kenzieEmpresas:token", JSON.stringify(response))
      const validate = await validateUser(response.token)
      if (validate.is_admin == true) {
        window.location.href = "/src/pages/admDash/index.html"
      } else {
        window.location.href = "/src/pages/userDash/index.html"
      }
    } else {
      toastfy("E-mail ou senha inválidos.", "error")
      const toast = document.querySelector("#toastfy")
      setTimeout(() => {
        toast.remove()
      }, 4900)
    }
    /* return data */
  } catch (err) {
    console.log(err)
  }
}

/* Rotas de Funcionario */

const getUserInfo = async () => {
  try {
    const data = await fetch(`${baseUrl}/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getStorage.token}`,
      },
    })

    const response = await data.json()
    return response
  } catch (err) {
    console.log(err)
  }
}

const getCoworkersInfo = async () => {
  try {
    const data = await fetch(`${baseUrl}/users/departments/coworkers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getStorage.token}`,
      },
    })

    const response = await data.json()
    return response
  } catch (err) {
    console.log(err)
  }
}

const getUserDepartments = async () => {
  try {
    const data = await fetch(`${baseUrl}/users/departments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getStorage.token}`,
      },
    })

    const response = await data.json()
    return response
  } catch (err) {
    console.log(err)
  }
}

const editCurrentUser = async (body) => {
  try {
    const data = await fetch(`${baseUrl}/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getStorage.token}`,
      },
      body: JSON.stringify(body),
    })

    if (data.ok) {
      toastfy("Seus dados foram atualizados.", "success")
      const toast = document.querySelector("#toastfy")
      setTimeout(() => {
        toast.remove()
      }, 4900)
    }
    const response = await data.json()
    return response
  } catch (err) {
    console.log(err)
  }
}

/* Rotas de Admin */

const getDepartment = async () => {
  try {
    const data = await fetch(`${baseUrl}/departments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getStorage.token}`,
      },
    })

    const response = await data.json()
    return response
  } catch (err) {
    console.log(err)
  }
}

const getCompanyDepartments = async (id) => {
  try {
    const data = await fetch(`${baseUrl}/departments/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getStorage.token}`,
      },
    })

    const response = await data.json()
    return response
  } catch (err) {
    console.log(err)
  }
}

const getUsers = async () => {
  try {
    const data = await fetch(`${baseUrl}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getStorage.token}`,
      },
    })

    const response = await data.json()
    return response
  } catch (err) {
    console.log(err)
  }
}

const getUnemployedUsers = async () => {
  try {
    const data = await fetch(`${baseUrl}/admin/out_of_work`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getStorage.token}`,
      },
    })

    const response = await data.json()
    return response
  } catch (err) {
    console.log(err)
  }
}

const deleteDep = async (id) => {
  try {
    const data = await fetch(`${baseUrl}/departments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getStorage.token}`,
      },
    })
    if (data.ok) {
      toastfy("Departamento excluido com sucesso.", "success")
      const toast = document.querySelector("#toastfy")
      setTimeout(() => {
        toast.remove()
      }, 4900)
    }
  } catch (err) {
    console.log(err)
  }
}

const deleteUser = async (id) => {
  try {
    const data = await fetch(`${baseUrl}/admin/delete_user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getStorage.token}`,
      },
    })
    if (data.ok) {
      toastfy("Usuário excluido com sucesso.", "success")
      const toast = document.querySelector("#toastfy")
      setTimeout(() => {
        toast.remove()
      }, 4900)
    }
  } catch (err) {
    console.log(err)
  }
}

const editUser = async (body, id) => {
  try {
    const data = await fetch(`${baseUrl}/admin/update_user/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getStorage.token}`,
      },
      body: JSON.stringify(body),
    })
    if (data.ok) {
      toastfy("Usuário editado com sucesso.", "success")
      const toast = document.querySelector("#toastfy")
      setTimeout(() => {
        toast.remove()
      }, 4900)
    }
    const response = await data.json()

    return response
  } catch (err) {
    console.log(err)
  }
}

const editDepartment = async (body, id) => {
  try {
    const data = await fetch(`${baseUrl}/departments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getStorage.token}`,
      },
      body: JSON.stringify(body),
    })

    if (data.ok) {
      toastfy("Departamento editado com sucesso.", "success")
      const toast = document.querySelector("#toastfy")
      setTimeout(() => {
        toast.remove()
      }, 4900)
    }
    const response = await data.json()

    return response
  } catch (err) {
    console.log(err)
  }
}

const createDepartment = async (body) => {
  try {
    const data = await fetch(`${baseUrl}/departments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getStorage.token}`,
      },
      body: JSON.stringify(body),
    })
    if (data.ok) {
      toastfy("Departamento criado com sucesso.", "success")
      const toast = document.querySelector("#toastfy")
      setTimeout(() => {
        toast.remove()
      }, 4900)
    } else {
      toastfy("Algo de errado aconteceu.", "error")
      const toast = document.querySelector("#toastfy")
      setTimeout(() => {
        toast.remove()
      }, 4900)
    }
    return data
  } catch (err) {
    console.log(err)
  }
}

const hireUser = async (body) => {
  try {
    const data = await fetch(`${baseUrl}/departments/hire/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getStorage.token}`,
      },
      body: JSON.stringify(body),
    })
    const response = await data.json()

    return response
  } catch (err) {
    console.log(err)
  }
}

const fireUser = async (id) => {
  try {
    const data = await fetch(`${baseUrl}/departments/dismiss/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getStorage.token}`,
      },
    })
    const response = await data.json()

    return response
  } catch (err) {
    console.log(err)
  }
}

export {
  getSectors,
  getCompanyDepartments,
  getCompanies,
  registerRequest,
  loginRequest,
  getUserInfo,
  getCoworkersInfo,
  getUserDepartments,
  getDepartment,
  getUsers,
  getUnemployedUsers,
  deleteDep,
  deleteUser,
  editUser,
  editCurrentUser,
  editDepartment,
  createDepartment,
  hireUser,
  fireUser,
  validateUser,
}
