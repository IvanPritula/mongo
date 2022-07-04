const userModel = require('../db/models/user');

class UserService {
createUser = async (data) => {
  try {
    const User = userModel();

    const result = await User.insertOne(data);
    // result.insertedId

    return result.insertedId;
  } catch (error) {
    console.log(error);
  }
};

findUserList = async (limit,page) => {
  const User = userModel();
  const foundUsers = await User.find({
    limit: limit,
    offset: (page - 1) * limit,
    include: [{model:User,as:"users"}], // LEFT OUTER JOIN
  });

  return foundUsers;
};

findUserById = async (userId) => {//userId
  const User = userModel();
  const user = await User.findOne({userId:userId});
  
  if (!user) {
    throw createHttpError(404, "User not found");
  }

  return user;
};

updateUserById = async (id, data) => {
  const User = userModel();
  const [count] = await User.updateOne(data, {
    where: {
      id,
    },
  });
  if (count === 0) {
    throw createHttpError(404, "User not found");
  }

  const updatedUser = await this.findUserById(id);

  return updatedUser;
};

deleteUserById = async (id) => {
  const User = userModel();
  const deletedUser = await this.findUserById(id);
  if (!deletedUser) {
    throw createHttpError(404, "User not found");
  }

  await User.deleteOne({ where: { id } });

  return deletedUser;
};
}

module.exports = new UserService();