const form = document.getElementById("form");
const incorrect = document.querySelector(".hidden_incorrect ");
let userEmail = document.getElementById("email");
let userPassword = document.getElementById("password");
let user = {
  email: "sophie.bluel@test.tld",
  password: "S0phie",
};

const getToken = async () => {
  let res = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  let data = await res.json();
  localStorage.setItem("Bearer", data.token);
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (userEmail.value === user.email && userPassword.value === user.password) {
    await getToken();
    window.location.href = "./adminPage.html";
  } else {
    incorrect.style.opacity = "1";
  }
});
