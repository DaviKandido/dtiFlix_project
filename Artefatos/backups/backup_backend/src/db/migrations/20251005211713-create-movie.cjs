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
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      year: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      decade: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      plot: {
        type: Sequelize.TEXT
      },
      genre: {
        type: Sequelize.STRING
      },
      rated: {
        type: Sequelize.STRING
      },
      runtime: {
        type: Sequelize.STRING
      },
      director: {
        type: Sequelize.STRING
      },
      actors: {
        type: Sequelize.STRING
      },
      poster: {
        type: Sequelize.STRING
      },
      imdbRating: {
        type: Sequelize.DECIMAL(3, 1)
      },
      ratings: {
        type: Sequelize.JSON
      },
      type: {
        type: Sequelize.STRING
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Movies');
  }
};