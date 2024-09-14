const AdminModel = require('../model/Admin_model');
const jsonwebtoken = require('jsonwebtoken');

const SECRET_KEY = "MADPEOPLE";

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Received Email:", email);
        console.log("Received Password:", password);

        let admin = await AdminModel.findOne({ email: email });
        if (!admin) {
            return res.json({ success: false, message: "Invalid credentials!" });
        } else {
            console.log("Stored Password:", admin.password);
            if (password !== admin.password) {
                return res.json({ success: false, message: "Invalid credentials!" });
            } else {
                let token = jsonwebtoken.sign({ id: admin._id }, SECRET_KEY);
                return res.json({
                    message: "Login Successfully",
                    success: true,
                    loggedInAdmin: admin,
                    adminToken: token,
                });
            }
        }
    } catch (error) {
        console.log("Error occurred", error);
        return res.json({ error: error });
    }
}


module.exports = { Login };
