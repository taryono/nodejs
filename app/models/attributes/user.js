exports.user = async function (req) {
    const user = {   
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        cellphone: req.body.cellphone,
        sex: req.body.sex,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    }
    return user;
} 