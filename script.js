const form = document.querySelector(".form");
form.addEventListener("submit", (event) => {
    // Предотвращает действие браузера по умолчанию. В данном случае — отправку формы
    // https://learn.javascript.ru/default-browser-action
    event.preventDefault();

    const name = form.elements['name'].value;
    const secondName = form.elements['secondName'].value;
    const email = form.elements['email'].value;
    const phone = form.elements['phone'].value;
    const agree = form.elements['agree'].checked;

    const data = {
        name: name,
        secondName: secondName,
        email: email,
        phone: phone,
        agree: agree
    };
    fetch('https://polinashneider.space/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка при отправке данных');
            }
            return response.json();
        })
        .then((result) => {

            showNotification('Данные успешно отправлены! Спасибо!', true);
            form.reset();
        })
        .catch((error) => {

            showNotification('Произошла ошибка при отправке. Попробуйте еще раз.', false);
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
        document.body.removeChild(notification);
    }, 3000);
}