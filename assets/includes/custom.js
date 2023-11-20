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

        window.location.href = 'index.html';
    }

}

function validate_signup_Form() {

    document.getElementById('login_emailError').innerHTML = '';
    document.getElementById('login_passwordError').innerHTML = '';
    document.getElementById('login_confirmPasswordError').innerHTML = '';

    document.getElementById('login_email').classList.remove('error-border');
    document.getElementById('login_password').classList.remove('error-border');
    document.getElementById('login_confirmPassword').classList.remove('error-border');

    // Get values from form
    var email = document.getElementById('login_email').value.trim();
    var password = document.getElementById('login_password').value.trim();
    var confirmPassword = document.getElementById('login_confirmPassword').value.trim();

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



    // Redirect if valid
    if (email && password && confirmPassword && (password === confirmPassword) && password.length >= 8) {

        window.location.href = 'index.html';
    }
}