class Validation {
  constructor(email, password, confirmPw) {
    this.email = email;
    this.password = password;
    this.confirmPw = confirmPw;
    this.error = {};
    this.isEmail();
    this.isPassword();
  }
  isEmail() {
    const regexEmail =
      /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!regexEmail.test(this.email)) {
      this.error.email = "Bạn vui lòng nhập đúng email";
    }
  }
  isPassword() {
    // const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // if (!regexPassword.test(this.password)) {
    //   this.error.password = "Bạn vui lòng nhập đúng định dạng mật khấu";
    // }
    console.log(this.password);
    if (this.password.length < 1) {
      this.error.password = "Bạn vui lòng nhập đúng định dạng mật khấu";
    }
  }
  isConfirmPassword() {
    if (this.confirmPw == "") {
      this.error.confirm = "Bạn vui lòng xác thực lại mật khẩu";
    }
    if (this.password !== this.confirmPw) {
      this.error.confirm = "Bạn đã nhập lại mật khẩu sai";
    }
  }
  toggleErr(node, err) {
    node.textContent = err;
    node.style.visibility = err ? "visible" : "hidden";
    node.parentNode.className = err ? "form-control has-error" : "form-control";
    // node.parentNode.classList.add("has-error");
  }
  //Cách đầu tiên tôi làm mà không hiệu quả
  // hideErr(node, err) {
  //   node.textContent = err;
  //   node.style.visibility = "hidden";
  //   node.parentNode.classList.remove("has-error");
  // }
}

export default Validation;

// const lan1 = new Validation("quanne@gmail.com", "1234Quanne", "1234Quanne");
// console.log(lan1.isConfirmPw());
// const lan2 = new Validation("1234567890", "1234", "abcd");
// console.log(lan2.isConfirmPw());
