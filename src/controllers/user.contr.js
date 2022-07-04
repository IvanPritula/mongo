//const { ObjectId } = require("mongodb");
const { findUserById, findUserList, createUser, updateUserById, deleteUserById } = require("../services/user.service");

class UserController {
createUser = async (req, res, next) => {
  try {
    const data = req.body;

    const createdUser = await createUser(data);

    res.status(200).send({ data: createdUser });
  } catch (error) {
    next(error);
  }
};

updateUser = async (req, res, next) => {
  try {
    const data = req.body;
    const id = req.params.id;

    const updatedUser = await updateUserById(id, data);

    res.status(200).send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletedUser = await deleteUserById(id);

    res.status(200).send({ data: deletedUser });
  } catch (error) {
    next(error);
  }
};

getUserById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const foundUser = await findUserById({id:id});
  
    res.status(200).send({ data: foundUser });
  } catch (error) {
    next(error);
  }
};

getUserList = async (req, res, next) => {
  try {
    // ?page=1&limit=10
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
  
    const userList = await findUserList(limit, page);
  
    res.status(200).send({ data: userList });
  } catch (error) {
    next(error);
  }
};
}

module.exports = new UserController();