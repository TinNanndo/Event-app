

export const signup = async (email, password) => {
    try {
       const userCreditential = await createUserWithEmailAndPassword(auth, email, password);
       await emailVerification();

       const user = userCreditential.user;
       console.log ("User created with email: ", user);
       return user;
    } catch (error) {
        throw error;
    }

    const emailVerification = async () => {
        const user = auth.currentUser;

        try {
            await sendEmailVerification(auth.currentUser, {
                handleCodeINApp: true,
                url: 'http://localhost:3000',
            }).then(() => {
                showEmailAlert(user.email);
            });
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Email verification error: ", errorCode, errorMessage);
            throw error;
        }
    };
};

