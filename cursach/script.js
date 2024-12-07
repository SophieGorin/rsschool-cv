// script.js

// Вспомогательные переменные
let userData = {};
let peerConnection;
let dataChannel;
let localStream;

// Функция для регистрации пользователя
document.getElementById('registerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    userData = { email, password }; // Сохраняем данные пользователя
    localStorage.setItem('userData', JSON.stringify(userData)); // Сохраняем в localStorage
    window.location.href = 'login.html'; // Перенаправляем на страницу входа
});

// Функция для логина
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (storedUserData?.email === email && storedUserData?.password === password) {
        window.location.href = 'profile.html'; // Перенаправляем на страницу профиля
    } else {
        alert('Invalid credentials');
    }
});

// Отображение данных профиля
if (document.getElementById('userEmail')) {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    document.getElementById('userEmail').textContent = `Email: ${storedUserData.email}`;
}

// Инициализация видеозвонка с WebRTC
if (document.getElementById('localVideo')) {
    const servers = null;
    peerConnection = new RTCPeerConnection(servers);

    // Получаем видео и аудио с локальной камеры
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
            document.getElementById('localVideo').srcObject = stream;
            localStream = stream;
            peerConnection.addStream(localStream);
        }).catch((err) => {
            console.error('Error accessing media devices.', err);
        });

    // Обработка видеозвонка
    peerConnection.onaddstream = (event) => {
        document.getElementById('remoteVideo').srcObject = event.stream;
    };

    // Сетевой чат
    document.getElementById('sendMessage')?.addEventListener('click', () => {
        const message = document.getElementById('messageInput').value;
        const messagesContainer = document.getElementById('messages');
        messagesContainer.innerHTML += `<p>${message}</p>`;
        document.getElementById('messageInput').value = '';
    });
}
