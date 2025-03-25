// Load users from localStorage or use default
let users = JSON.parse(localStorage.getItem('users')) || {
    'Lexzy': 'password1',
    'Pely': 'password2',
    'Icezee': 'password3',
    'Praise': 'password4',
    'Hated Vylan': 'password5'
};

// Load chat messages from localStorage or start empty
let chatMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];

// On page load, display chat messages (for chat.html)
const chatBox = document.getElementById('chat-box');
if (chatBox) {
    chatMessages.forEach(msg => {
        chatBox.innerHTML += `<p><strong>${msg.user}:</strong> ${msg.text}</p>`;
    });
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}

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
            const userSelect = document.getElementById('chat-user');
            const chatBox = document.getElementById('chat-box');
            if (input && userSelect && chatBox && input.value) {
                const message = { user: userSelect.value, text: input.value };
                chatMessages.push(message); // Add to array
                localStorage.setItem('chatMessages', JSON.stringify(chatMessages)); // Save to localStorage
                chatBox.innerHTML += `<p><strong>${message.user}:</strong> ${message.text}</p>`;
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
                localStorage.setItem('users', JSON.stringify(users));
                document.getElementById('message').textContent = 'Signed up! Now login.';
            } else {
                document.getElementById('message').textContent = 'Username taken or fields empty.';
            }
        }
    });
});

// Logout for all pages except login
const logout = document.getElementById('logout');
if (logout) {
    logout.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}