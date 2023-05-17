
const myForm = document.querySelector('#myForm');
var name_input = document.querySelector('#name');
var email_input = document.querySelector('#email');
// const btn = document.querySelector('#button');
let list = document.querySelector('#list');
// localStorage.setItem('userData',JSON.stringify({}));
myForm.addEventListener('submit', onSubmit);
list.addEventListener('click',deleteItem);
list.addEventListener('click',editItem);


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
        // var text = document.createTextNode(name+" "+email);
        var userName = document.createElement('span');
        userName.className = 'userName me-1';
        var text = document.createTextNode(name);
        userName.appendChild(text);
        li.appendChild(userName);

        var userEmail = document.createElement('span');
        userEmail.className = 'userEmail me-1';
        var text = document.createTextNode(email);
        userEmail.appendChild(text);
        li.appendChild(userEmail);

        // li.appendChild(text);
        list.appendChild(li);
        // adding delete button //
        var deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm delete float-end';
        var text = document.createTextNode('delete');
        deleteBtn.appendChild(text);
        li.appendChild(deleteBtn);
        // adding edit button
        var editBtn = document.createElement('button');
        editBtn.className = 'btn btn-primary btn-sm me-1 edit float-end';
        var text = document.createTextNode('edit');
        editBtn.appendChild(text);
        li.appendChild(editBtn);
        // storing user data in form of key value pair //
        // localStorage.setItem(name,email);
        // storing user data in form of object //
        // var userData = JSON.parse(localStorage.getItem('userData'));
        
        // storing to locall storage
        userData = {name:name,email:email};
        localStorage.setItem(email,JSON.stringify(userData));

        // storing to cloud using axios
        axios.post('https://crudcrud.com/api/29a542450ad8436b8679e0ddacb7019b/users',{
            "name":name,
            "email":email
        })
         .then(res=>alert('user added'))
         .catch(err=>{
            alert('something went wrong');
            console.error(err);
        })
        event.target.name.value = '';
        event.target.email.value = '';
    }
}
//  delete item
function deleteItem(event){
    // console.log((event.target.className).indexOf('delete'));

    if((event.target.className).indexOf('delete')!=-1){
        list.removeChild(event.target.parentElement);
        let email = (event.target.parentElement.querySelector('.userEmail').textContent);
        // deletion from local storage
        localStorage.removeItem(email);
        
    }
}
// edit item
function editItem(event){
    if(event.target.className.indexOf('edit')!=-1){
        // console.log("edit button pressed");
        name_input.value = event.target.parentElement.querySelector('.userName').textContent;
        email_input.value = event.target.parentElement.querySelector('.userEmail').textContent;
    }
    event.target.className = 'delete';
    deleteItem(event);
    // name_input.value = 'name here';
    // email_input.value = 'email here';
}
