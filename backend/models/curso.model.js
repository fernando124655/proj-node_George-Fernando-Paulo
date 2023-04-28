const curso = (sequelize, DataTypes) => {
  const Curso = sequelize.define(
    "Curso",
    {
      nome: {
        type: DataTypes.STRING,
      },
      ch: {
        type: DataTypes.INTEGER,
      },
      categoria_id:{
        type: DataTypes.INTEGER,
        reference:{
          model: "categoria",
          key: "id"
        }
      }
    },
    {
      tableName: "curso",
    }
  );
  return Curso;
};

export default curso;
