// Initialize users in local storage if not already set
if (!localStorage.getItem('users')) {
    const users = {
        lexzy: 'password1',
        pely: 'password2',
        icezee: 'password3',
        praise: 'password4',
        hatedvylan: 'password5'
    };
    localStorage.setItem('users', JSON.stringify(users));
}

// Initialize chat messages in local storage if not already set
if (!localStorage.getItem('messages')) {
    localStorage.setItem('messages', JSON.stringify([]));
}

// Check login state
function checkLoginState() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser && window.location.pathname !== '/index.html') {
        window.location.href = 'index.html';
    }
}
checkLoginState();

// Load chat messages
function loadChat() {
    const chatBox = document.getElementById('chat-box');
    if (chatBox) {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        chatBox.innerHTML = '';
        messages.forEach(msg => {
            chatBox.innerHTML += `<p><strong>${msg.user}:</strong> ${msg.text} <small>(${msg.timestamp})</small></p>`;
        });
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

// Grab buttons
const buttons = document.querySelectorAll('.action-btn');
console.log('Buttons found:', buttons.length);

buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Home buttons (home.html)
        if (button.textContent === 'Say Yo') alert('Yo, it’s The Boys!');
        else if (button.textContent === 'Crew Vibes') alert('Best crew, best vibes.');
        else if (button.textContent === 'Boys Only') alert('The Boys rule this spot!');

        // Chat (chat.html)
        else if (button.id === 'send-btn') {
            const input = document.getElementById('chat-input');
            if (input && input.value) {
                const user = localStorage.getItem('loggedInUser');
                const messages = JSON.parse(localStorage.getItem('messages')) || [];
                const timestamp = new Date().toLocaleTimeString();
                messages.push({
                    user: user,
                    text: input.value,
                    timestamp: timestamp
                });
                localStorage.setItem('messages', JSON.stringify(messages));
                input.value = '';
                loadChat();
            }
        }

        // Login (index.html)
        else if (button.id === 'login-btn') {
            const username = document.getElementById('username').value.toLowerCase();
            const password = document.getElementById('password').value;
            const users = JSON.parse(localStorage.getItem('users')) || {};
            if (users[username] && users[username] === password) {
                localStorage.setItem('loggedInUser', username);
                document.getElementById('message').textContent = 'Logged in! Heading to The Boys...';
                setTimeout(() => { window.location.href = 'home.html'; }, 1000);
            } else {
                document.getElementById('message').textContent = 'Invalid username or password.';
            }
        }

        // Sign Up (index.html)
        else if (button.id === 'signup-btn') {
            const username = document.getElementById('username').value.toLowerCase();
            const password = document.getElementById('password').value;
            const users = JSON.parse(localStorage.getItem('users')) || {};
            if (users[username]) {
                document.getElementById('message').textContent = 'Username already exists.';
            } else {
                users[username] = password;
                localStorage.setItem('users', JSON.stringify(users));
                document.getElementById('message').textContent = 'Signed up! Now login.';
            }
        }
    });
});

// Load chat on page load
if (document.getElementById('chat-box')) {
    loadChat();
}

// Logout
const logout = document.getElementById('logout');
if (logout) {
    logout.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'index.html';
    });
}