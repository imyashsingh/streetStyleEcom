import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
        console.error("Hash Password Error <=>", error);
    }
};

export const comparePassword = async (password, hashedPassword) => {
    try {
        const cmpPassword = await bcrypt.compare(password, hashedPassword);
        return cmpPassword;
    } catch (error) {
        console.error("Compare Password Error <=>", error);
    }
};
