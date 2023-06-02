    console.log('loggewfknal')
    
    function handleSignUp(email, password) {
        const existingUser = localStorage.getItem('user');
        if (existingUser) {
        // User with the same email already exists
        alert('User with the same email already exists.');
        return;
        }
    
        const user = { email, password };
        localStorage.setItem('user', JSON.stringify(user));
        alert('Sign up successful!');
    }
    
    function handleLogin(email, password) {   
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
        // No user found with the given email
        alert('User not found.');
        return;
        }
    
        const user = JSON.parse(storedUser);
        if (user.email === email && user.password === password) {
        // Login successful
        alert('Login successful!');
        } else {
        // Invalid email or password
        alert('Invalid email or password.');
        }
    }
    