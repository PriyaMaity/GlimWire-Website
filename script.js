const isLoggedIn = localStorage.getItem("isLoggedIn");
if (isLoggedIn === "true") {
  window.location.href = "./MainPage/index.html";
}

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  const storedUser = JSON.parse(localStorage.getItem("user"));
  console.log("Stored user:", storedUser);

  if (!storedUser) {
    Swal.fire({
      title: "No User Found!",
      text: "Please sign up first.",
      icon: "error",
      confirmButtonText: "OK",
    });
    return;
  }

  if (storedUser.email === email && storedUser.password === password) {
    localStorage.setItem("isLoggedIn", "true");
    Swal.fire({
      title: "Login Successful!",
      text: "Welcome back!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      console.log("Redirecting to MainPage...");
      window.location.href = "./MainPage/index.html";
    });
  } else {
    Swal.fire({
      title: "Error!",
      text: "Invalid email or password.",
      icon: "error",
      confirmButtonText: "Try Again",
    });
  }
});
