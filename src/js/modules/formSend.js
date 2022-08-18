import modals from "./modals";

const formSend = () => {

    const forms = document.querySelectorAll('form');

    forms.forEach(item => {
        postData(item);
    });

    const message = {
        loading: 'assets/images/icons/spinner.svg',
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    function postData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            const statusMessageImg = document.createElement('img');
            statusMessageImg.src = message.loading;
            statusMessage.classList.add('status_load');
            statusMessage.append(statusMessageImg);
            
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });

            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener('load', () => {
                if(request.status === 200){
                    console.log(request.response);
                    statusMessageImg.remove();
                    if (statusMessage.classList.contains('status_failure')){
                        statusMessage.classList.remove('status_failure');
                    }
                    statusMessage.classList.add('status_ok');
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    },6000);
                }else{
                    statusMessageImg.remove();
                    if (statusMessage.classList.contains('status_ok')){
                        statusMessage.classList.remove('status_ok');
                    }
                    statusMessage.classList.add('status_failure');
                    statusMessage.textContent = message.failure;
                }
            });
        });

    }

};

export default formSend;
