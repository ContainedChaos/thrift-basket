const Validation = (user) => {
    let errors = {}

    if (!user.name) {
        errors.name = "Name is required"
    }

    else if (user.name.length < 4) {
        errors.name = "Name must be atleast 5 characters"
    }

    if (!user.email) {
        errors.email = "Email is required"
    }

    else if (user.email.search(/[@]/) < 0)
    errors.email = "Email is not valid"

    if (!user.password) {
        errors.password = "Password is required"
    }

    else if (user.password.length < 8 || (user.password.search(/[0-9]/) < 0) || (user.password.search(/[A-Z]/) < 0) || (user.password.search(/[a-z]/) < 0)) {
        errors.password = "Password must be atleast 8 characters having an uppercase letter, a lowercase letter and a number"
    }

    if (!user.reEnterPassword) {
        errors.reEnterPassword = "Please confirm your password"
    }

    else if (user.password !== user.reEnterPassword) {
        errors.reEnterPassword = "Password fields do not match"
    }

    if (!user.phone) {
        errors.phone = "Phone number is required"
    }

    else if (user.phone.length < 11) {
        errors.phone = "Phone number must be 11 characters"
    }

    return errors;
}

export default Validation;