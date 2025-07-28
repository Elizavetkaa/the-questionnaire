const form = document.querySelector(".form");
form.addEventListener("submit", (event) => {
    // Предотвращает действие браузера по умолчанию. В данном случае — отправку формы
    //https: //learn.javascript.ru/default-browser-action
    event.preventDefault();

    const name = document.getElementById('name').value;
    const secondName = document.getElementById('secondName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const agree = document.getElementById('agree').checked;

    const data = {
        name: name,
        secondName: secondName,
        email: email,
        phone: phone,
        agree: agree
    };

    fetch('https://Elizavetkaa.space/user', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer: Elizavetkaa'
        },
        body: JSON.stringify(data),
    })

    .then((response) => {
            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }
            return response.json();
        })
        .then((result) => {
            showNotification('Данные успешно отправлены! Спасибо!', true);
            form.reset();
        })
        .catch((error) => {
            showNotification(`Ошибка при отправке данных: ${error.message}`, false);
        });

});

function showNotification(message, isSuccess) {
    const notification = document.createElement('div');
    notification.textContent = message;

    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.padding = '15px';
    notification.style.borderRadius = '8px';
    notification.style.color = '#fff';
    notification.style.fontSize = '16px';
    notification.style.zIndex = '1000';

    if (isSuccess) {
        notification.style.backgroundColor = '#4BB543';
    } else {
        notification.style.backgroundColor = '#D8000C';
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            document.body.removeChild(notification);
        }
    }, 3000);
}