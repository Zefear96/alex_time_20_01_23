// technical_task.txt

// Task 1.
// Создать форму, в которую можно ввести след. информацию: имя пользователя, пароль, подтверждение пароля, админ или нет(можно использовать checkbox) задача: необходимо пользователей сохранять в local storage под ключом users, необходимо реализовать проверки: на уникальность имени и на совпадение паролей

// Task 2.
// Продолжаем предыдущий проект, создать форму для добавления продуктов в которую можно добавить: название, цену, ссылку на картинку; при нажатии на кнопку СОЗДАТЬ ПРОДУКТ, должна запрашиваться информация о пользователе в модальном окне(имя и пароль), затем необходимо проверить существует ли этот пользователь, подходит ли пароль к данному пользователю и является ли он админом, если все совпадает, добавить продукт в db.json(использовать json-server), также у каждого продукта должно быть поле АВТОР, автора необходимо динамически добавлять самостоятельно, данные можно получить к примеру в момент проверки существует ли пользователь вообще

// Task 3.
// Продолжаем предыдущий проект, добавить функцию рендера, которая срабатывает при обновлении страницы по умолчанию, а также запускается при нажатии на кнопку ПОЛУЧИТЬ СПИСОК ПРОДУКТОВ

// Task 4.
// Продолжаем предыдущий проект, добавить возможность редактирования продуктов, у каждого продукта должна быть кнопка РЕДАКТИРОВАТЬ, при нажатии на которую данные о продукте попадают в форму(можно использовать форму, которая предназначалась для создания продукта, можно создать отдельную, также можно использовать модалку), затем при нажатии на кнопку СОХРАНИТЬ ИЗМЕНЕНИЯ продукт должен быть изменен и страница должна заново отрисовать все продукты

// Task 5.
// Продолжаем предыдущий проект, у каждого продукта должна быть кнопка УДАЛИТЬ, при нажатии кнопку, продукт должен быть удален, также необходимо вызвать рендер для отображения изменений

// Все таски связаны между собой, для верстки использовать бутстрап(дизайн на ваше усмотрение, компоненты, которые обязательно должны быть на странице(навбар, форма добавления продукта, карточки))
// После завершения проекта необходимо все загрузить в гитхаб и прикрепить ссылку в классруме

let userName = document.querySelector('#username');
let userPass = document.querySelector('#userpass');
let userPassConf = document.querySelector('#userpass-conf');
let adminCheck = document.querySelector('#admin-check');

// local storage scripts start
function initStorage() {
       if (!localStorage.getItem('users')) {
              localStorage.setItem('users', '[]');
       };
};
initStorage();

function setUsersToStorage(users) {
       localStorage.setItem('users', JSON.stringify(users))
};

function getUsersFromStorage() {
       let users = JSON.parse(localStorage.getItem('users'));
       return users;
};
// local storage scripts end

// create users
function createUsers() {

       let userObj = {
              name: userName.value,
              password: userPass.value,
              isLogin: false,
              isAdmin: false
       };
       
       if (adminCheck.checked === true) {
              userObj.isAdmin = true
       }

       let users = getUsersFromStorage();
       
       if (users.some(item => item.name == userName.value)) {
              alert('Username must be uniq!')
              return
       };

       if (userPass.value !== userPassConf.value) {
              alert('Passwords dont match!')
              return
       };

       users.push(userObj);
       setUsersToStorage(users);

       userName.value = '';
       userPass.value = '';
       userPassConf.value = '';

       let btnClose = document.querySelector('.btn-close');
       btnClose.click();
       // render();
};

let addUserBtn = document.querySelector('.add-user-btn');
addUserBtn.addEventListener('click', createUsers);

let userNameLog = document.querySelector('#username-login');
let userPassLog = document.querySelector('#userpass-login');
let loginBtn = document.querySelector('#login-btn')

function getUserObj() {
       let users = getUsersFromStorage();
       return users.find(item => item.name === userNameLog.value)
}

function login() {
       let user = getUserObj();
       if (user.name !== userNameLog.value) {
              alert('Invalid username')
              return
       } 

       if (user.password !== userPassLog.value) {
              alert('Invalid password')
              return
       } 

       user.isLogin = true
       setUsersToStorage(user)
}

loginBtn.addEventListener('click', login)

let prodImg = document.querySelector('#prod-url-inp');
let prodTitle = document.querySelector('#prod-title-inp');
let prodPrice = document.querySelector('#prod-price-inp');
let prodBtnAdd = document.querySelector('.add-prod-btn');
// console.log(prodImg, prodTitle);

function addProduct() {
       login()
       let prodObj = {
              img: prodImg.value,
              title: prodTitle.value,
              price: prodPrice.value
       }

              fetch('http://localhost:8000/db', {
              method: 'POST',
              body: JSON.stringify(prodObj),
              headers: {
                     "Content-Type": "application/json;charset=utf-8"
              }
              });
       
       let btnClose = document.querySelector('.btn-close-prod');
       btnClose.click();

}

prodBtnAdd.addEventListener('click', addProduct);

// delete 
// function deleteContact(e) {
//        let contactId = e.target.parentNode.parentNode.id;
//        let contacts = getContactsFromStorage();
//        contacts = contacts.filter(item => item.id != contactId);
//        setContactsToStorage(contacts);
//        render()
//      };
     
// function addDeleteEvent () {
//        let delBtns = document.querySelectorAll('.delete-contact-btn');
//        // console.log(delBtns);
//        delBtns.forEach(item => item.addEventListener('click', deleteContact))
// };

// // update
// function updateContact(e) {
//        let contactId = e.target.parentNode.parentNode.id;
//        // console.log(productId);
//        let contacts = getContactsFromStorage();
//        let contactObj = contacts.find(item => item.id == contactId);
//        imgInp.value = contactObj.url;
//        nameInp.value = contactObj.name;
//        phoneInp.value = contactObj.phone;
//        emailInp.value = contactObj.email;
//        addressInp.value = contactObj.address;

//        saveChangesBtn.setAttribute('id', contactId);
// };

// function addUpdateEvent() {
//        let updateBtns = document.querySelectorAll('.update-contact-btn');
//        // console.log(updateBtns);
//        updateBtns.forEach(item => item.addEventListener('click', updateContact))
// };

// function saveChanges(e) {
//        if (!saveChangesBtn.id) return;
//        let contacts = getContactsFromStorage();
//        let contactObj = contacts.find(item => item.id == saveChangesBtn.id)
//        // console.log(productObj); 
//        contactObj.url = imgInp.value;
//        contactObj.name = nameInp.value;
//        contactObj.phone = phoneInp.value;
//        contactObj.email = emailInp.value;
//        contactObj.address = addressInp.value;

//        setContactsToStorage(contacts);
//        saveChangesBtn.removeAttribute('id');

//        imgInp.value = '';
//        nameInp.value = '';
//        phoneInp.value = '';
//        emailInp.value = '';
//        addressInp.value = '';

//        let btnClose = document.querySelector('.btn-close');
//        btnClose.click();

//        render()
// };

// saveChangesBtn.addEventListener('click', saveChanges);

// search
// let searchInp = document.querySelector('#search-inp');
// searchInp.addEventListener('input', e => {
//        // console.log(e.target.value);
//        let contacts = getContactsFromStorage();
//        contacts = contacts.filter(item => {
//               return item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
//        });
//        // console.log(products);
//        render(contacts);
// });