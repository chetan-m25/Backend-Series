export async function registerUser(req, res, next) {
    res.status(201).json({
        message: "User registered successfully"
    })
}

// this below code used in registerUser for handling error
// try {
//   throw new Error("User already exists, with same email");
// } catch (err) {
//   err.status = 409;
//   next(err);
// }