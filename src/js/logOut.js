let logOutBtn = document.getElementById("logOut");
logOutBtn.addEventListener('click', logOut);

function logOut() {
    localStorage.clear();
    window.location.href = 'index.html';

}