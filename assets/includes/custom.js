jQuery(document).ready(function ($) {
    // $("#owl-demo").owlCarousel({
    //     navigation: true,
    //     slideSpeed: 300,
    //     paginationSpeed: 500,
    //     items: 1,
    //     singleItem: true,
    //     autoPlay: 4000
    // });
    $(".all-banner-slide").owlCarousel({
        dots: true,
        slideSpeed: 300,
        paginationSpeed: 500,
        items: 1,
        singleItem: true,
        autoPlay: 2000
    });

});
function validate_login_Form() {

    document.getElementById('emailError').innerHTML = '';
    document.getElementById('passwordError').innerHTML = '';

    document.getElementById('email').classList.remove('error-border');
    document.getElementById('password').classList.remove('error-border');

    // Get values from form
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();

    // Validate email
    if (!email) {
        document.getElementById('emailError').innerHTML = 'Email is required';
        document.getElementById('email').classList.add('error-border');
        return false;
    }

    // Validate password
    if (!password) {
        document.getElementById('passwordError').innerHTML = 'Password is required';
        document.getElementById('password').classList.add('error-border');
        return false;
    } else if (password.length < 8) {
        document.getElementById('passwordError').innerHTML = 'Password must be at least 8 characters';
        document.getElementById('password').classList.add('error-border');
        return false;
    }

    if (email && password) {
        loginUser();
        // index_db();
        // event.preventDefault();
        // login(email,password);

    }

}

function validate_signup_Form() {

    document.getElementById('login_emailError').innerHTML = '';
    document.getElementById('login_passwordError').innerHTML = '';
    document.getElementById('login_confirmPasswordError').innerHTML = '';
    document.getElementById('login_nameError').innerHTML = '';

    document.getElementById('login_email').classList.remove('error-border');
    document.getElementById('login_password').classList.remove('error-border');
    document.getElementById('login_confirmPassword').classList.remove('error-border');
    document.getElementById('login_name').classList.remove('error-border');

    // Get values from form
    var email = document.getElementById('login_email').value.trim();
    var password = document.getElementById('login_password').value.trim();
    var confirmPassword = document.getElementById('login_confirmPassword').value.trim();
    var name = document.getElementById('login_name').value.trim();

    // Validate email
    if (!email) {
        document.getElementById('login_emailError').innerHTML = 'Email is required';
        document.getElementById('login_email').classList.add('error-border');
        return false;
    }

    // Validate password
    if (!password) {
        document.getElementById('login_passwordError').innerHTML = 'Password is required';
        document.getElementById('login_password').classList.add('error-border');
        return false;
    } else if (password.length < 8) {
        document.getElementById('login_passwordError').innerHTML = 'Password must be at least 8 characters';
        document.getElementById('login_password').classList.add('error-border');
        return false;
    }

    // Validate confirm password
    if (!confirmPassword) {
        document.getElementById('login_confirmPasswordError').innerHTML = 'Confirm Password is required';
        document.getElementById('login_confirmPassword').classList.add('error-border');
        return false;
    } else if (password !== confirmPassword) {
        document.getElementById('login_confirmPasswordError').innerHTML = 'Passwords do not match';
        document.getElementById('login_confirmPassword').classList.add('error-border');
        return false;
    }

    if (!name) {
        document.getElementById('login_nameError').innerHTML = 'Name is required';
        document.getElementById('login_name').classList.add('error-border');
        return false;
    }



    // Redirect if valid
    if (email && password && confirmPassword && (password === confirmPassword) && password.length >= 8 && name) {
        signupUser();
        // index_db();
        // window.location.href = 'index.html';
        // event.preventDefault();
        // signUp(email,name,password);

    }


}

 





let db;

const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const loginForm = document.querySelector("#loginForm");
const signupForm = document.querySelector("#signupForm");
const userList = document.querySelector("#userList");

window.onload = () => {
    let request = window.indexedDB.open("pb_customs", 1);

    request.onerror = function () {
        console.log("Database failed to open");
    };

    request.onsuccess = function () {
        console.log("Database opened successfully");

        db = request.result;
        // displayUsers();
    };

    request.onupgradeneeded = function (e) {
        let db = e.target.result;

        let userObjectStore = db.createObjectStore("users", {
            keyPath: "id",
            autoIncrement: true,
        });

        userObjectStore.createIndex("email", "email", { unique: true });
        userObjectStore.createIndex("password", "password", { unique: false });

        console.log("Database setup complete");
    };

    //   loginForm.onsubmit = loginUser;
    //   signupForm.onsubmit = signupUser;
};

function loginUser() {
    //   e.preventDefault();
    console.log("--");

    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    // Assuming a simple comparison for demonstration purposes
    authenticateUser(email, password);
}


function signupUser() {
    // e.preventDefault();

    let email = document.querySelector("#login_email").value;
    let name = document.querySelector("#login_name").value;
    let password = document.querySelector("#login_password").value;

    // Check if the user with the given email already exists
    let transaction = db.transaction("users");
    let userObjectStore = transaction.objectStore("users");
    let emailIndex = userObjectStore.index("email");

    let request = emailIndex.get(email);

    request.onsuccess = function (event) {
        if (event.target.result) {
            // User with the same email already exists
            alert("User with this email already exists. Please use a different email.");
        } else {
            console.log("bie");
            // User does not exist, proceed with signup
            let newUser = { email, name, password };

            let transaction = db.transaction(["users"], "readwrite");
            let userObjectStore = transaction.objectStore("users");
            let add_request = userObjectStore.add(newUser);


            add_request.onsuccess = () => {
                clearSignupForm();
                console.log("hie");
                // alert("Signup successful!");
                authenticateUser(email,password);
            };

            add_request.onerror = () => {
                console.log("Error adding user to database");
            };
        }
    };
}


function authenticateUser(email, password) {
    console.log("taa");
    let userObjectStore = db.transaction("users").objectStore("users");
    let index = userObjectStore.index("email");

    let request = index.get(email);

    request.onsuccess = function () {

        let user = request.result;
        // console.log(user.name);
       
        

        if (user && user.password === password) {
            if (user){
                sessionStorage.setItem("loggedInUser", JSON.stringify({ name: user.name, email: user.email }));
            }else{
                sessionStorage.setItem("loggedInUser", JSON.stringify({ name: '', email: user.email }));
            }
            console.log("login");
            alert("Login successful!");
           
            window.location.href = "index.html"; 
        } else {
            alert("Invalid email or password");
        }
    };
}


function clearSignupForm() {
    document.querySelector("#login_email").value = "";
    document.querySelector("#login_name").value = "";
    document.querySelector("#login_password").value = "";
    document.querySelector("#login_confirmPassword").value = "";
}


