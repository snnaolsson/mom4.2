const newUserBtn = document.getElementById('addBtn');
const loginUsername = document.getElementById('username');
const loginPassword = document.getElementById('password');
const message = document.getElementById('msg');

newUserBtn.addEventListener('click', createUser);

async function createUser(e) {
    e.preventDefault();

    try {
        let response = await fetch("http://127.0.0.1:3005/users/register", {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username: loginUsername.value,
                password: loginPassword.value
            })
        })
        let data = await response.json();
        console.log(data);
        if (!response.ok) {
            message.textContent = 'Det gick inte att skapa en ny användare.';
            throw new error('Ingen användare har skapats');

        }
        if (response.status === 201) {
            message.textContent = 'Användare skapad';

        } else {
            message.textContent = 'Error, försök igen';
        }
            
    }catch (error) {
        message.textContent = 'Hoppsan! Något blev fel, var god försök igen!';
     
        
    }
}