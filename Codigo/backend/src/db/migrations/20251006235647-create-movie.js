'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER 
      },
      imdbID: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true 
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      year: {
        type: Sequelize.SMALLINT,
        allowNull: false
      },
      decade: {
        type: Sequelize.SMALLINT,
        allowNull: false
      },
      plot: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      genre: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      rated: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      runtime: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      director: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      actors: {
        type: Sequelize.STRING(512),
        allowNull: true
      },
      poster: {
        type: Sequelize.STRING(512),
        allowNull: true
      },
      imdbRating: {
        type: Sequelize.DECIMAL(3, 1),
        allowNull: true
      },
      ratings: {
        type: Sequelize.JSON,
        allowNull: true
      },
      type: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    
    // Criação dos índices para performance (year, decade, type)
    await queryInterface.addIndex('Movies', ['decade'], { name: 'decade_index' });
    await queryInterface.addIndex('Movies', ['year'], { name: 'year_index' });
    await queryInterface.addIndex('Movies', ['type'], { name: 'type_index' });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Movies');
  }
};