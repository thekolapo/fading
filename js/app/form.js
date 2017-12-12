var formLoading = false;

function sendData() {
    // alert('submit');
    var email = document.getElementById('email');
    console.log(email);
    fetch('https://ripe-dentist.glitch.me/mailchimp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email_address: email.value,
            status: 'subscribed'
        })
    }).then(function(response) {
        // if(response.json().status == 200) {
        email.value = '';
        showMessage('success');
        showLoading(false);
    })
    .catch(function(error) {
        console.log(error);
        showMessage('failure', error.message);
        showLoading(false);
    })

    return false;
}

function showLoading(loading) {
    if(loading){
        document.getElementById('envelope-svg').style.opacity = 0;
        document.getElementById('loading-svg').style.opacity = 1;
        formLoading = true;
    } else {
        document.getElementById('envelope-svg').style.opacity = 1;
        document.getElementById('loading-svg').style.opacity = 0;
        formLoading = false;
    }
}

function showMessage(messageType, message){
    var el = document.querySelector('.callback-msg');
    if(messageType == 'success') {
        el.classList.add('callback-msg--success');
        el.innerHTML = "You've subscribed successfully!";
    } else {
        el.classList.add('callback-msg--failure');
        el.innerHTML = message;
    }
    setTimeout(function(){
        el.className = 'callback-msg';
        el.innerHtml = '';
    }, 5000);
}

document.querySelector('.subscribe__button').addEventListener('click', function(){
    if(!formLoading){
        showLoading(true);
        sendData();
    }
});
