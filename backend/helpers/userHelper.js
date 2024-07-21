import bcrypt from 'bcrypt';

export const hashPassword = async(user_password) => {
    try {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(user_password, saltRounds)
        return hashedPassword
    } catch (error) {
        console.log(error)
    }
};
export const comparePassword = async (user_password, hashedPassword) => {
    return bcrypt.compare(user_password, hashedPassword);
}