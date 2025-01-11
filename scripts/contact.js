function containsNumbers(text){
for(let i = 0;i<text.length;i++){
    if(!(isNaN(parseInt(text[i])))){
        return true;
    }
}
return false;
}

function validateForm(){
event.preventDefault();
const email = document.getElementById("email");
const firstName = document.getElementById("fname");
const lastName = document.getElementById("lname");
const purpose = document.getElementById("purpose");
const emailError = document.getElementById("email_error");
const fnameError = document.getElementById("fname_error");
const lnameError = document.getElementById("lname_error");
const purposeError = document.getElementById("purpose_error");
let hasError = false;
emailError.innerHTML = '';
email.style.border = "none"
fnameError.innerHTML = '';
firstName.style.border = "none"
lnameError.innerHTML = '';
lastName.style.border = "none"
purposeError.innerHTML = "";
purpose.style.border = "none"

if(email.value == '' || !email.value.includes('@')){
    emailError.innerHTML = "Error Fill You'r Email";
    email.style.border = "1px solid red"
    hasError = true;
}

if(firstName.value == '' || containsNumbers(firstName.value)){
    fnameError.innerHTML = "Error Enter Valid Name or Enter a Name";
    firstName.style.border = "1px solid red"
    hasError = true;
} 
if(lastName.value == '' || containsNumbers(lastName.value)){
    lnameError.innerHTML = "Error Enter Valid Name or Enter a Name";
    lastName.style.border = "1px solid red"
    hasError = true;
} 
if(purpose.selectedIndex == 0){
    purposeError.innerHTML = "Select a value";
    purpose.style.border = "1px solid red"
    hasError = true
}

if(!hasError){
    const myModal = new bootstrap.Modal(document.getElementById('modal')).show()
}
}