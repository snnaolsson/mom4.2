document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem('token');
    const memberMsgEl = document.getElementById("memberMessage");
    

  // Kontrollera om token finns
  if (!token) {
    window.alert('Du måste vara inloggad för att besöka denna sida!');
    window.location.href = 'index.html';  // Omdirigera till inloggningssidan
} else {
    // Validera token genom att göra en förfrågan till den skyddade routen
    fetch("http://127.0.0.1:3005/users/protected", {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Inte auktoriserad');
        }
        return response.json();
    })
        .then(data => {
        
            console.log('Åtkomst beviljad:', data);

        memberMsgEl.innerHTML = `Välkommen, ${data.username}! ${data.privateInfo}.`;
    })
    .catch(error => {
        console.error('Åtkomst nekad:', error);
        window.location.href = 'index.html';  // Omdirigera till inloggningssidan
    });
}
    });
