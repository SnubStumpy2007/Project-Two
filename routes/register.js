router.post('/register', async (req, res) => {
    try {
        // Removed the hashing here since the model already does it
        const user = await User.create({
            user_name: req.body.user_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            pwd_hash: req.body.pwd_hash
        });

        req.session.userId = user.id;
        res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        res.redirect('/register?error=Registration failed. Please try again.');
    }
});
