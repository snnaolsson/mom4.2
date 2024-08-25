

const loginBtn = document.getElementById('loginBtn');
const loginUsername = document.getElementById('username');
const loginPassword = document.getElementById('password');
const message = document.getElementById('msg');
let token = localStorage.getItem('token');
let userBtn = document.getElementById('userSite');

loginBtn.addEventListener('click', userLogin);
userBtn.addEventListener('click', accessUserside);
console.log(localStorage);

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
            throw new error('Misslyckad inloggning');
        }

        if (response.status === 200) {
            localStorage.setItem('token', data.response.token);
            
            accessUserside();
            window.location.href = 'userside.html';

        }
    } catch (error) {
        message.textContent = 'fel användarnamn eller lösenord.';
    }
}
async function accessUserside(e) {
    e.preventDefault();
  
    try {
        const token = localStorage.getItem('token');
        
        if (!token) {
            window.alert('Du måste vara inloggad för att besöka användarsidan!');
            window.location.href = 'login.html';  // Omdirigera till inloggningssidan om ingen token finns
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
            message.textContent = 'Nej';
            throw new Error('Nej');  // Kasta ett error om responsen inte är OK
        }

        let data = await response.json();

        if (response.status === 200) {
            console.log(data);
            window.location.href = 'userside.html';  // Omdirigera till användarsidan
        }
    } catch (error) {
        console.log(error);
        window.location.href = 'index.html';  // Omdirigera till startsidan om något går fel
    }
}


