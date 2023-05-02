
const myForm = document.querySelector('#myForm');
// const name_input = document.querySelector('#name');
// const email_input = document.querySelector('#email');
// const btn = document.querySelector('#button');
let list = document.querySelector('#list');
// localStorage.setItem('userData',JSON.stringify({}));
myForm.addEventListener('submit', onSubmit);

function onSubmit(event){
    event.preventDefault();
    let name = event.target.name.value;
    let email = event.target.email.value;
    if(name==='' || email===''){
        alert('Enter name and email');
    }else{
        // console.log(name,email);
        var li = document.createElement('li');
        li.className = 'list-group-item';
        var text = document.createTextNode(name+" "+email);
        li.appendChild(text);
        list.appendChild(li);
        // storing user data in form of key value pair //
        // localStorage.setItem(name,email);
        // storing user data in form of object //
        var userData = JSON.parse(localStorage.getItem('userData'));
        userData = {...userData,[name]:email};
        localStorage.setItem('userData',JSON.stringify(userData));
        event.target.name.value = '';
        event.target.email.value = '';
    }
}
