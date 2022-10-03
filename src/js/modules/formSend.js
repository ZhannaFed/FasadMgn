import modals from "./modals";

const formSend = () => {

    const forms = document.querySelectorAll('form');

    forms.forEach(item => {
        bindPostData(item);
    });

    const message = {
        loading: 'assets/images/icons/spinner.svg',
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body:  data
        });

        return await res.json();
    };

    function bindPostData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            const statusMessageImg = document.createElement('img');
            statusMessageImg.src = message.loading;
            statusMessage.classList.add('status_load');
            statusMessage.append(statusMessageImg);
            
            form.append(statusMessage);
            
            const formData = new FormData(form);

            // Используя обЪект
            // const object = {};
            // formData.forEach(function(value, key){
            //     object[key] = value;
            // });

            // Используя методы Object.entries() и Object.fromEntries()
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            

            postData('http://localhost:3000/requests', json)
            .then(data => {
                    console.log(data);
                    statusMessageImg.remove();
                    if (statusMessage.classList.contains('status_failure')){
                        statusMessage.classList.remove('status_failure');
                    }
                    statusMessage.classList.add('status_ok');
                    statusMessage.textContent = message.success;                   
                    setTimeout(() => {
                        statusMessage.remove();
                    },6000);
            }).catch(() => {
                    statusMessageImg.remove();
                    if (statusMessage.classList.contains('status_ok')){
                        statusMessage.classList.remove('status_ok');
                    }
                    statusMessage.classList.add('status_failure');
                    statusMessage.textContent = message.failure;
                    setTimeout(() => {
                        statusMessage.remove();
                    },6000);
            }).finally(() => {
                form.reset();
            });
        });

    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));


};

export default formSend;
