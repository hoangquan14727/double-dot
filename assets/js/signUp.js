import Validation from "./Validation.js";

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const loginButton = document.querySelector(".login-button");
const inputError = document.querySelectorAll(".input-error");
const successMessage = document.querySelector(".success-message");
const errorMessage = document.querySelector(".error-message");
const loader = document.querySelector(".loader");
const loginButtonText = document.querySelector(".login-button-text");

function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

loginButton.addEventListener("click", (e) => {
  //Ngăn chặn load lại trang
  e.preventDefault();
  const emailValue = email.value;
  const psValue = password.value;
  const cfPasswordValue = confirmPassword.value;

  const validation = new Validation(emailValue, psValue, cfPasswordValue);
  validation.isConfirmPassword();
  console.log(validation.error);
  const [nodeEmailErr, nodePasswordErr, nodeConfirmErr] = inputError;
  validation.toggleErr(nodeEmailErr, validation.error.email);
  validation.toggleErr(nodePasswordErr, validation.error.password);
  validation.toggleErr(nodeConfirmErr, validation.error.confirm);

  if (isEmpty(validation.error)) {
    loginButton.style.pointerEvents = "none";
    loader.style.display = "block";
    loginButtonText.style.display = "none";

    firebase
      .auth()
      .createUserWithEmailAndPassword(emailValue, psValue)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        successMessage.style.display = "block";
        window.location.href = "../html/signIn.html";
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 3000);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMs = error.message;

        console.log(errorMs);
        errorMessage.style.display = "block";
        errorMessage.textContent = errorMs;

        setTimeout(() => {
          errorMessage.style.display = "none";
        }, 3000);
      })
      .finally(() => {
        loginButton.style.pointerEvents = "auto";
        loader.style.display = "none";
        loginButtonText.style.display = "block";
      });
  }
  // if (isEmpty(validation.error)) {
  //   console.log("Tài khoản hợp lệ");
  //   validation.toggleErr(nodeEmailErr, validation.error.email);
  //   validation.toggleErr(nodePasswordErr, validation.error.password);
  //   validation.toggleErr(nodeConfirmErr, validation.error.confirm);
  // } else {
  //   const [nodeEmailErr, nodePasswordErr, nodeConfirmErr] = inputError;
  //   validation.toggleErr(nodeEmailErr, validation.error.email);
  //   validation.toggleErr(nodePasswordErr, validation.error.password);
  //   validation.toggleErr(nodeConfirmErr, validation.error.confirm);

  // nodeEmailErr.textContent = validation.error.email;
  // nodeEmailErr.style.visibility = "visible";
  // nodeEmailErr.parentNode.classList.add("has-error");

  // nodePasswordErr.textContent = validation.error.password;
  // nodePasswordErr.style.visibility = "visible";
  // nodePasswordErr.parentNode.classList.add("has-error");

  // nodeConfirmErr.textContent = validation.error.confirm;
  // nodeConfirmErr.style.visibility = "visible";
  // nodeConfirmErr.parentNode.classList.add("has-error");
  // }
});

// const password = document.querySelector("#password").value;

// loginButton.addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log(password.value);
// });
