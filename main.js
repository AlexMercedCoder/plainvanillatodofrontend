import './style.css'

import {getTodos, handleSubmit, handleClick} from "./utilities"

getTodos()

document.querySelector("form").addEventListener("submit", handleSubmit)

document.addEventListener("click", handleClick)