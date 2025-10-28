'use strict';

const { search } = require('../../routers/movie.router');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SearchHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      movie_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false ,
        type: Sequelize.STRING
      },
      query: {
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
      genre: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      searchedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SearchHistories');
  }
};