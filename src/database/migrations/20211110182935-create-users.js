'use strict';

// Tabela que armazena informações do formulário
module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('users', { 
       id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true
        }, 
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        // Senhas não podem ser gravadas no banco de dados
        password_hash: {
          type: Sequelize.STRING,
          allowNull: false
        },
        admin: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        created_at: {
          // Esse campo vai colocar a data que as informações inseridas foram criadas
          type: Sequelize.DATE,
          allowNull: false
        },
        update_at: {
          // Esse campo sempre vai ter a data da ultima atualização feita pelo usúario
          type: Sequelize.DATE,
          allowNull: false
        }
      }); 
  },

  down: async (queryInterface) => {
     await queryInterface.dropTable('users');
     
  }
};
