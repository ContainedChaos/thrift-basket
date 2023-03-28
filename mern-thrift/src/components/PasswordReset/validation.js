const Validation = (user) => {
    let errors = {}

    if (!user.otp) {
        errors.otp = "OTP is required"
    }

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

    return errors;
}

export default Validation;