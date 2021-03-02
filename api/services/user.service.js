module.exports = (repositories) => {
    const user_service = {
      findAll: async () => {
        return repositories.user.findAll();
      },
      register: async (data) => {
        return repositories.user.createtUser(data);
      },
      findById: async (id) => {
        const rows = await repositories.user.findById(id);
        return rows[0];
      },
      findByEmail: async (data) => {
        const user = await repositories.user.findByEmail(data);
        return user;
      },
    };
  
    return user_service;
  };
  