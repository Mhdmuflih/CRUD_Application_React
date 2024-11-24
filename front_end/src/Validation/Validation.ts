const ValidatoinUserForm = (formData: any) => {
    let formErrors: any = {};
    let valid: boolean = true;

    if (!formData.name) {
        valid = false;
        formErrors.name = 'Name is required';
    }

    if (!formData.email) {
        valid = false;
        formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        valid = false;
        formErrors.email = 'Email address is invalid';
    }

    if (!formData.password) {
        valid = false;
        formErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
        valid = false;
        formErrors.password = 'Password must be at least 6 characters';
    }

    return { valid, formErrors };

}

export {
    ValidatoinUserForm,
    
}