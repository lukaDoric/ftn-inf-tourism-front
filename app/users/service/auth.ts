export function setUserLoginState(isLoggedIn: boolean) {
  const loginLink = document.getElementById("login");
  const logoutLink = document.getElementById("logout");

  if (isLoggedIn) {
    if (loginLink) loginLink.style.display = "none";
    if (logoutLink) logoutLink.style.display = "block";
  } else {
    if (loginLink) loginLink.style.display = "block";
    if (logoutLink) logoutLink.style.display = "none";
  }
}

export function handleLogout() {
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  setUserLoginState(false);
  window.location.href = "../../../index.html";
}

export function checkLoginStatus() {
  const username = localStorage.getItem("username");
  setUserLoginState(!!username);
}
