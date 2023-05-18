
const axiosInstance = axios.create({
    baseURL: 'https://crudcrud.com/api/7d5ed0bdd10344b7a7fcbdf99cdb04ac'
});

const myForm = document.querySelector('#myForm');
var name_input = document.querySelector('#name');
var email_input = document.querySelector('#email');
// const btn = document.querySelector('#button');
let list = document.querySelector('#list');
// localStorage.setItem('userData',JSON.stringify({}));
myForm.addEventListener('submit', onSubmit);
list.addEventListener('click', deleteItem);
list.addEventListener('click', editItem);
document.addEventListener('DOMContentLoaded', loadItems);

function createNewList(name, email) {
    // creating li element
    var li = document.createElement('li');
    li.className = 'list-group-item';
    // adding user name to li element
    var userName = document.createElement('span');
    userName.className = 'userName me-1';
    var text = document.createTextNode(name);
    userName.appendChild(text);
    li.appendChild(userName);
    // adding user email to li element
    var userEmail = document.createElement('span');
    userEmail.className = 'userEmail me-1';
    var text = document.createTextNode(email);
    userEmail.appendChild(text);
    li.appendChild(userEmail);
    // adding delete button to li element//
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
    // adding li to ul
    list.appendChild(li);
}

function saveDataToCloud(data) {
    axiosInstance.post('/users', data)
        .then(res => {
            createNewList(data.name, data.email);
            console.log("data added successfully");
        })
        .catch(err => {
            console.error(err);
            console.log('something went wrong');
        })
}

function onSubmit(event) {
    event.preventDefault();
    let name = event.target.name.value;
    let email = event.target.email.value;
    if (name === '' || email === '') {
        alert('Enter name and email');
    } else {
        userData = { name: name, email: email };
        // saving data to cloud and if success also displaying them on screen
        saveDataToCloud(userData);
        // resetting the input values
        event.target.name.value = '';
        event.target.email.value = '';
    }
}
//  delete item
function deleteItem(event) {
    // console.log((event.target.className).indexOf('delete'));
    if ((event.target.className).indexOf('delete') != -1) {
        let email = (event.target.parentElement.querySelector('.userEmail').textContent);
        list.removeChild(event.target.parentElement);
        // deletion from local storage
        // localStorage.removeItem(email);

        // deletion from cloud
        deleteFromCloud(email);
    }
}
// edit item
function editItem(event) {
    if (event.target.className.indexOf('edit') != -1) {
        // console.log("edit button pressed");
        let userName = event.target.parentElement.querySelector('.userName').textContent;
        name_input.value = userName;
        userEmail = event.target.parentElement.querySelector('.userEmail').textContent;
        email_input.value = userEmail;
        event.target.className = 'delete';
        list.removeChild(event.target.parentElement);
        deleteFromCloud(userEmail);
    }
}
// on loading site load items from cooud
function loadItems() {
    axiosInstance.get('/users')
        .then(res => {
            res.data.forEach((item) => {
                createNewList(item.name, item.email);
            })
        })
        .catch(err => {
            console.error(err);
        })
}
function deleteFromCloud(email) {
    axiosInstance.get('/users')
        .then(res => {
            res.data.forEach(item => {
                if (item.email === email) {

                    axiosInstance.delete(`/users/${item._id}`)
                        .then(res => {
                            //  loadItems(); actually it load item from cloud and result is appeded in frontend so duplicate data
                            console.log(res);
                            console.log('deleted successfully');
                        })
                        .catch(err => {
                            console.error(err);
                        })
                }
            })
        })
        .catch(err => {
            console.error(err);
        })
}