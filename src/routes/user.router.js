const { Router } = require('express');
const {getUserList, getUserById, createUser, updateUser, deleteUser} = require("../controllers/user.contr");

//http://localhost:5001/api/users

// /api/users
const userRouter = Router();

//userRouter.post('/', createUserContr);
userRouter.get('/:_id', getUserById);

userRouter.get('/', getUserList);

userRouter.post('/', createUser);

userRouter.patch('/:_id', updateUser);

userRouter.delete('/:_id', deleteUser);

module.exports = userRouter;
