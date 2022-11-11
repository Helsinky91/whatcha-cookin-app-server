const isAdmin = (req, res, next) => {
    console.log("role", req.payload.role)
    if (req.payload.role === "admin"){
        res.status(200).json("admin, todo bien")
    } else {
        next()

    }
}

module.exports = isAdmin;