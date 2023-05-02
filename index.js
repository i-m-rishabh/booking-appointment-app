
const myForm = document.querySelector('#myForm');
// const name_input = document.querySelector('#name');
// const email_input = document.querySelector('#email');
// const btn = document.querySelector('#button');
let list = document.querySelector('#list');

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
        localStorage.setItem(name,email);
        event.target.name.value = '';
        event.target.email.value = '';
    }
}
