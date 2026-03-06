
const signin = () => {
    const email = document.getElementById('input-email');
    
    const email_value = email.value;
    
    const password = document.getElementById('input-password');
    const pass_value = password.value;
    if (email_value=='admin' && pass_value=='admin123') {
        window.location.href = "main.html";
    }
    else{
        confirm("Invalid credentials!! Please, make sure to use actual username and password.")
    }
}

