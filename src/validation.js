// Validation function to handle both login and signup
function validateForm(values, isSignup) {
    let errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    const numberPattern = /^(7|8|9)\d{9}$/;

    if (isSignup) {
        if (values.name === "") {
            errors.name = "Name should not be empty";
        } else if (/\d/.test(values.name)) {
            errors.name = "Name should not contain numbers";
        } else {
            errors.name = "";
        }

        if (values.number === "") {
            errors.number = "Phone Number should not be empty";
        } else if (!numberPattern.test(values.number)) {
            errors.number = "Phone Number is not valid";
        } else {
            errors.number = "";
        }
    }

    if (values.email === "") {
        errors.email = "Email should not be empty";
    } else if (!emailPattern.test(values.email)) {
        errors.email = "Email didn't match";
    } else {
        errors.email = "";
    }

    if (values.password === "") {
        errors.password = "Password should not be empty";
    } else if (!passwordPattern.test(values.password)) {
        errors.password = "Password should have at least one digit, one lowercase letter, one uppercase letter, and be a minimum of 8 characters long, without special characters.";
    } else {
        errors.password = "";
    }

    return errors;
}

export default validateForm;
