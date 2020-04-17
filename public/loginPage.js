"use strict"

const userForm = new UserForm();

userForm.loginFormCallback = data => ApiConnector.login(data, response => response.success ? location.reload() : console.error("Ошибка!"));

userForm.registerFormCallback = data => ApiConnector.register(data, response => response.success ? location.reload() : console.error("Ошибка!"));