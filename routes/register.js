router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            aboutMe: req.body.aboutMe,
            password: hashedPassword
        });
        req.session.userId = user.id;
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.redirect('/register?error=Registration failed. Please try again.');

    }
});
