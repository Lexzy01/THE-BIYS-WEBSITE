// Grab all buttons with class 'action-btn'
const buttons = document.querySelectorAll('.action-btn');
console.log('Buttons found:', buttons.length);

// Handle all buttons across pages
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Homepage buttons (home.html)
        if (button.textContent === 'Say Yo') {
            alert('Yo, it’s The Boys!');
        } else if (button.textContent === 'Crew Vibes') {
            alert('Best crew, best vibes.');
        } else if (button.textContent === 'Boys Only') {
            alert('The Boys rule this spot!');
        }
        // Chat page (chat.html)
        else if (button.id === 'send-btn') {
            const input = document.getElementById('chat-input');
            const chatBox = document.querySelector('.chat-box');
            if (input && chatBox && input.value) {
                chatBox.innerHTML += `<p><strong>Lexzy:</strong> ${input.value}</p>`;
                input.value = '';
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        }
        // Hangouts page (hangouts.html)
        else if (button.id === 'add-hangout') {
            const input = document.getElementById('hangout-input');
            const hangoutList = document.querySelector('.hangout-list');
            if (input && hangoutList && input.value) {
                hangoutList.innerHTML += `<li><strong>Lexzy:</strong> ${input.value}</li>`;
                input.value = '';
            }
        }
        // Login page (index.html)
        else if (button.id === 'login-btn') {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            if (users[username] && users[username] === password) {
                document.getElementById('message').textContent = 'Logged in! Heading to The Boys...';
                setTimeout(() => { window.location.href = 'home.html'; }, 1000);
            } else {
                document.getElementById('message').textContent = 'Wrong username or password.';
            }
        }
        else if (button.id === 'signup-btn') {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            if (username && password && !users[username]) {
                users[username] = password;
                document.getElementById('message').textContent = 'Signed up! Now login.';
            } else {
                document.getElementById('message').textContent = 'Username taken or fields empty.';
            }
        }
    });
});

// Fake user database (hardcoded)
const users = {
    'Lexzy': 'password1',
    'Pely': 'password2',
    'Icezee': 'password3',
    'Praise': 'password4',
    'Hated Vylan': 'password5'
};

// Logout for all pages except login
const logout = document.getElementById('logout');
if (logout) {
    logout.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}