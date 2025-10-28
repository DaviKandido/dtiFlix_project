'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SearchHistories', [
      {
        movie_id: 1,
        title: 'Inception',
        query: 'inception',
        year: 2010,
        decade: 2010,
        genre: 'Sci-Fi',
        type: 'movie',
        searchedAt: new Date('2024-01-15 14:30:00')
      },
      {
        movie_id: 2,
        title: 'Interstellar',
        query: 'interstellar',
        year: 2014,
        decade: 2010,
        genre: 'Sci-Fi',
        type: 'movie',
        searchedAt: new Date('2024-01-16 09:15:00')
      },
      {
        movie_id: 3,
        title: 'Fight Club',
        query: 'fight club',
        year: 1999,
        decade: 1990,
        genre: 'Drama',
        type: 'movie',
        searchedAt: new Date('2024-01-17 16:45:00')
      },
      {
        movie_id: 4,
        title: 'The Shawshank Redemption',
        query: 'shawshank redemption',
        year: 1994,
        decade: 1990,
        genre: 'Drama',
        type: 'movie',
        searchedAt: new Date('2024-01-18 11:20:00')
      },
      {
        movie_id: 5,
        title: 'The Godfather',
        query: 'godfather',
        year: 1972,
        decade: 1970,
        genre: 'Crime',
        type: 'movie',
        searchedAt: new Date('2024-01-19 13:10:00')
      },
      {
        movie_id: 6,
        title: 'The Dark Knight',
        query: 'dark knight',
        year: 2008,
        decade: 2000,
        genre: 'Action',
        type: 'movie',
        searchedAt: new Date('2024-01-20 15:30:00')
      },
      {
        movie_id: 7,
        title: 'Forrest Gump',
        query: 'forrest gump',
        year: 1994,
        decade: 1990,
        genre: 'Drama',
        type: 'movie',
        searchedAt: new Date('2024-01-21 10:45:00')
      },
      {
        movie_id: 8,
        title: 'The Lord of the Rings: The Return of the King',
        query: 'lord of the rings',
        year: 2003,
        decade: 2000,
        genre: 'Fantasy',
        type: 'movie',
        searchedAt: new Date('2024-01-22 17:00:00')
      },
      {
        movie_id: 9,
        title: 'The Matrix',
        query: 'matrix',
        year: 1999,
        decade: 1990,
        genre: 'Sci-Fi',
        type: 'movie',
        searchedAt: new Date('2024-01-23 14:20:00')
      },
      {
        movie_id: 10,
        title: 'Star Wars: Episode IV - A New Hope',
        query: 'star wars',
        year: 1977,
        decade: 1970,
        genre: 'Fantasy',
        type: 'movie',
        searchedAt: new Date('2024-01-24 12:30:00')
      },
      {
        movie_id: 1,
        title: 'Inception',
        query: 'christopher nolan movies',
        year: 2010,
        decade: 2010,
        genre: 'Sci-Fi',
        type: 'movie',
        searchedAt: new Date('2024-01-25 08:45:00')
      },
      {
        movie_id: 2,
        title: 'Interstellar',
        query: 'space movies',
        year: 2014,
        decade: 2010,
        genre: 'Sci-Fi',
        type: 'movie',
        searchedAt: new Date('2024-01-26 19:15:00')
      },
      {
        movie_id: 6,
        title: 'The Dark Knight',
        query: 'batman movies',
        year: 2008,
        decade: 2000,
        genre: 'Action',
        type: 'movie',
        searchedAt: new Date('2024-01-27 20:30:00')
      },
      {
        movie_id: 4,
        title: 'The Shawshank Redemption',
        query: 'prison movies',
        year: 1994,
        decade: 1990,
        genre: 'Drama',
        type: 'movie',
        searchedAt: new Date('2024-01-28 11:45:00')
      },
      {
        movie_id: 8,
        title: 'The Lord of the Rings: The Return of the King',
        query: 'fantasy movies',
        year: 2003,
        decade: 2000,
        genre: 'Fantasy',
        type: 'movie',
        searchedAt: new Date('2024-01-29 16:20:00')
      },
      {
        movie_id: 3,
        title: 'Fight Club',
        query: 'david fincher movies',
        year: 1999,
        decade: 1990,
        genre: 'Drama',
        type: 'movie',
        searchedAt: new Date('2024-01-30 13:10:00')
      },
      {
        movie_id: 5,
        title: 'The Godfather',
        query: 'mafia movies',
        year: 1972,
        decade: 1970,
        genre: 'Crime',
        type: 'movie',
        searchedAt: new Date('2024-01-31 15:40:00')
      },
      {
        movie_id: 7,
        title: 'Forrest Gump',
        query: 'tom hanks movies',
        year: 1994,
        decade: 1990,
        genre: 'Drama',
        type: 'movie',
        searchedAt: new Date('2024-02-01 09:30:00')
      },
      {
        movie_id: 9,
        title: 'The Matrix',
        query: 'keanu reeves movies',
        year: 1999,
        decade: 1990,
        genre: 'Sci-Fi',
        type: 'movie',
        searchedAt: new Date('2024-02-02 18:25:00')
      },
      {
        movie_id: 10,
        title: 'Star Wars: Episode IV - A New Hope',
        query: 'classic sci-fi',
        year: 1977,
        decade: 1970,
        genre: 'Sci-Fi',
        type: 'movie',
        searchedAt: new Date('2024-02-03 14:50:00')
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SearchHistories', null, {});
  }
};