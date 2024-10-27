

const loginBtn = document.getElementById('loginBtn');
const loginUsername = document.getElementById('username');
const loginPassword = document.getElementById('password');
const message = document.getElementById('msg');
let token = localStorage.getItem('token');

loginBtn.addEventListener('click', userLogin);
console.log("index rad 10", localStorage);

async function userLogin(e) {
    e.preventDefault();

    try {
        let response = await fetch('http://127.0.0.1:3005/users/login', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username: loginUsername.value,
                password: loginPassword.value
            })
        })

        let data = await response.json();
        if (!response.ok) {
            message.textContent = 'Inloggning misslyckades';
            console.log("Funkar här, rad 30");
            throw new Error('Misslyckad inloggning');
        }

        if (response.status === 200) {
            localStorage.setItem('token', data.response.token);
            
            console.log("funkr här rad 40");
            accessUserside();
            window.location.replace = 'userside.html';
            
           

        }
    } catch (error) {
        message.textContent = 'fel användarnamn eller lösenord.';
    }
}
async function accessUserside() {
    
  
    try {
        const token = localStorage.getItem('token');
        
        if (!token) {
            window.alert('Du måste vara inloggad för att besöka användarsidan!');
            window.location.href = 'index.html';  // Omdirigera till inloggningssidan om ingen token finns
            return;
        }
        
        console.log(token);

        let response = await fetch("http://127.0.0.1:3005/users/protected", {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token  // Lägg till ett mellanslag efter 'Bearer'
            }
        });

        if (!response.ok) {
            console.log("fel i index rad 68");
            throw new Error('Access denied');  // Kasta ett error om responsen inte är OK
    
        }

        let data = await response.json();
        console.log("Funkar till rad 74");

        if (response.status === 200) {
            console.log("funkar till rad 79");
            console.log("Åtkomst beviljad:", data);
            window.location.href = 'userside.html';  // Omdirigera till användarsidan
            
        }
    } catch (error) {
        console.log("Här går det fel");
        window.location.href = 'index.html';  // Omdirigera till startsidan om något går fel
        
    }
}


