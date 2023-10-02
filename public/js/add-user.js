const successMessage = document.querySelector(".custom-success-message");

document.addEventListener("DOMContentLoaded", function () {
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm_password");
  const passwordToggle = document.getElementById("password_toggle");
  const confirmPasswordToggle = document.getElementById(
    "confirm_password_toggle"
  );
  const passwordStrengthBar = document.getElementById("password_strength_bar");
  const passwordStrengthText = document.getElementById(
    "password_strength_text"
  );
  const passwordAlert = document.querySelector(".custom-password-alert");
  const errorMessage = document.querySelector(".custom-error-message");
  const successMessage = document.querySelector(".custom-success-message");

  // Enable function when form is submitted
  document.querySelector("form").addEventListener("submit", function (event) {
    // تحقق من ملء جميع حقول الإدخال المطلوبة
    const usernameValue = document.getElementById("username").value;
    const phoneValue = document.getElementById("phone").value;
    const addressValue = document.getElementById("address").value;
    const positionValue = document.getElementById("position").value;
    const branchValue = document.getElementById("branch").value;
    const passwordValue = document.getElementById("password").value;
    const confirmPasswordValue =
      document.getElementById("confirm_password").value;

    if (
      !usernameValue ||
      !phoneValue ||
      !addressValue ||
      !positionValue ||
      !branchValue ||
      !passwordValue ||
      !confirmPasswordValue
    ) {
      // إذا لم يتم ملء أي من حقول الإدخال المطلوبة، قم بمنع تقديم النموذج وعرض رسالة خطأ
      event.preventDefault();
      errorMessage.textContent = "Please fill in all fields.";
      successMessage.textContent = "";
    } else if (passwordValue !== confirmPasswordValue) {
      // إذا لم تتطابق كلمة المرور وتأكيد كلمة المرور، قم بمنع تقديم النموذج وعرض رسالة خطأ
      event.preventDefault();
      errorMessage.textContent = "Passwords do not match";
      successMessage.textContent = "";
    } else {
      errorMessage.textContent = "";
      return false;
    }
  });

  // Toggle password visibility
  passwordToggle.addEventListener("click", function () {
    if (password.type === "password") {
      password.type = "text";
      passwordToggle.textContent = "🙉";
    } else {
      password.type = "password";
      passwordToggle.textContent = "🙈";
    }
  });

  // Toggle confirm password visibility
  confirmPasswordToggle.addEventListener("click", function () {
    if (confirmPassword.type === "password") {
      confirmPassword.type = "text";
      confirmPasswordToggle.textContent = "🙉";
    } else {
      confirmPassword.type = "password";
      confirmPasswordToggle.textContent = "🙈";
    }
  });

  // تقدير قوة كلمة المرور باستخدام مكتبة zxcvbn.js
  password.addEventListener("input", function () {
    const result = zxcvbn(password.value);
    const score = result.score;
    const strengthText = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
    const strengthClasses = [
      "very-weak",
      "weak",
      "fair",
      "strong",
      "very-strong",
    ];
    passwordStrengthText.textContent = strengthText[score];
    passwordStrengthBar.value = score;
    passwordStrengthBar.classList.remove(...strengthClasses);
    passwordStrengthBar.classList.add(strengthClasses[score]);

    if (score < 3) {
      passwordAlert.textContent =
        "This password is weak. Consider using a stronger one.";
    } else {
      passwordAlert.textContent = "";
    }
  });
});

const userForm = document.getElementById("add-user-form");
const customBtn = document.getElementsByClassName("custom-button")[0];
const progress = document.querySelector(".progress");
userForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("firstname", userForm.elements.firstname.value);
  formData.append("lastname", userForm.elements.lastname.value);
  formData.append("email", userForm.elements.email.value);
  formData.append("phonenumber", userForm.elements.phonenumber.value);
  formData.append("address", userForm.elements.address.value);
  formData.append("position", userForm.elements.position.value);
  formData.append("branch", userForm.elements.branch.value);
  formData.append("password", userForm.elements.password.value);

  try {
    progress.style.display = "block";
    const { data } = await axios.post("/admin/add-user", formData);
    console.log(data);
    successMessage.textContent = data.msg;
    successMessage.style.color = "#22BB33";
    progress.style.display = "none";
  } catch (error) {
    successMessage.textContent = error.response.data.msg;
    successMessage.style.color = "#cc0000";
    progress.style.display = "none";
  }
});
