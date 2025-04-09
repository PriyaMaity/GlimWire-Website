document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  const userData = {
    name,
    email,
    password,
  };

  localStorage.setItem("user", JSON.stringify(userData));
  Swal.fire({
    title: "Signup Successful!",
    text: "Redirecting to login page...",
    icon: "success",
    confirmButtonText: "OK",
  }).then(() => {
    window.location.href = "../index.html";
  });
});
