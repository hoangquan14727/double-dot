const dropdownmail = document.querySelector(".dropdown-email");
const logOut = document.querySelector(".header-dropdown-item:last-child");
const user = JSON.parse(
  sessionStorage.getItem(
    "firebase:authUser:AIzaSyD1nbMTyJwlPOQVMW8JXOa_9sHaVAsmwus:[DEFAULT]"
  )
);
console.log(user.emai);
if (!user) {
  window.location.href = "../html/admin.html";
}
logOut.addEventListener("click", () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = "../html/signIn.html";
    })
    .catch((error) => {
      // An error happened.
    });
});
