'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Reviews',
      [
        {
          movie_id: 1,
          comment:
            'Mind-bending masterpiece! Christopher Nolan at his best. The dream within a dream concept was executed perfectly.',
          rating: 5.0,
          createdAt: new Date('2024-01-15 10:30:00'),
          updatedAt: new Date('2024-01-15 10:30:00'),
        },
        {
          movie_id: 1,
          comment:
            'The visuals are stunning and the story is complex but rewarding. Leo delivers an amazing performance.',
          rating: 4.8,
          createdAt: new Date('2024-01-20 14:45:00'),
          updatedAt: new Date('2024-01-20 14:45:00'),
        },
        {
          movie_id: 2,
          comment:
            'Emotional and scientifically engaging. The black hole scene is one of the most beautiful in cinema history.',
          rating: 5.0,
          createdAt: new Date('2024-02-01 05:15:00'),
          updatedAt: new Date('2024-02-01 05:15:00'),
        },
        {
          movie_id: 3,
          comment:
            'A cult classic that defined a generation. The twist ending still blows my mind every time I watch it.',
          rating: 4.3,
          createdAt: new Date('2024-02-10 16:20:00'),
          updatedAt: new Date('2024-02-10 16:20:00'),
        },
        {
          movie_id: 4,
          comment:
            "The greatest prison drama ever made. Morgan Freeman's narration is iconic.",
          rating: 5.0,
          createdAt: new Date('2024-02-15 11:00:00'),
          updatedAt: new Date('2024-02-15 11:00:00'),
        },
        {
          movie_id: 5,
          comment:
            'Marlon Brando is unforgettable as Vito Corleone. A perfect crime epic.',
          rating: 5.0, // Corrigido: era 5.6
          createdAt: new Date('2024-02-20 13:30:00'),
          updatedAt: new Date('2024-02-20 13:30:00'),
        },
        {
          movie_id: 6,
          comment:
            "Heath Ledger's Joker performance is legendary. The best superhero movie ever made.",
          rating: 5.0, // Corrigido: era 5.4
          createdAt: new Date('2024-03-01 15:45:00'),
          updatedAt: new Date('2024-03-01 15:45:00'),
        },
        {
          movie_id: 7,
          comment:
            'Tom Hanks is brilliant as Forrest Gump. A beautiful journey through American history.',
          rating: 4.3, // Corrigido: era 8.5 (convertido para escala 5)
          createdAt: new Date('2024-03-05 12:10:00'),
          updatedAt: new Date('2024-03-05 12:10:00'),
        },
        {
          movie_id: 8,
          comment:
            'The perfect conclusion to the Lord of the Rings trilogy. Epic in every sense.',
          rating: 4.8, // Corrigido: era 5.3
          createdAt: new Date('2024-03-10 17:25:00'),
          updatedAt: new Date('2024-03-10 17:25:00'),
        },
        {
          movie_id: 9, // Corrigido: era movie_id: 5 (duplicado)
          comment:
            'Revolutionary visual effects and a groundbreaking story. Changed sci-fi forever.',
          rating: 4.4, // Corrigido: era 8.8 (convertido para escala 5)
          createdAt: new Date('2024-03-15 14:00:00'),
          updatedAt: new Date('2024-03-15 14:00:00'),
        },
        {
          movie_id: 10,
          comment:
            'The movie that started it all. A timeless space opera that never gets old.',
          rating: 4.4, // Corrigido: era 8.7 (convertido para escala 5)
          createdAt: new Date('2024-03-20 10:50:00'),
          updatedAt: new Date('2024-03-20 10:50:00'),
        },
        {
          movie_id: 2,
          comment:
            'The science might not be perfect but the emotional impact is real. Cried multiple times.',
          rating: 4.3, // Corrigido: era 8.5 (convertido para escala 5)
          createdAt: new Date('2024-03-25 13:15:00'),
          updatedAt: new Date('2024-03-25 13:15:00'),
        },
        {
          movie_id: 4,
          comment:
            'Hope and redemption theme is powerful. Tim Robbins and Morgan Freeman have incredible chemistry.',
          rating: 5.0,
          createdAt: new Date('2024-04-01 11:30:00'),
          updatedAt: new Date('2024-04-01 11:30:00'),
        },
        {
          movie_id: 6,
          comment:
            'Dark, gritty, and philosophical. Raises the bar for what comic book movies can be.',
          rating: 4.6, // Corrigido: era 5.1
          createdAt: new Date('2024-04-05 16:40:00'),
          updatedAt: new Date('2024-04-05 16:40:00'),
        },
        {
          movie_id: 8,
          comment:
            '11 Oscars well deserved! The battle scenes are epic and the emotional payoff is satisfying.',
          rating: 5.0,
          createdAt: new Date('2024-04-10 05:25:00'),
          updatedAt: new Date('2024-04-10 05:25:00'),
        },
        {
          movie_id: 11, // The Lion King
          comment:
            'Hakuna Matata! The circle of life has never been more beautiful. Animated perfection.',
          rating: 4.8,
          createdAt: new Date('2024-04-12 09:15:00'),
          updatedAt: new Date('2024-04-12 09:15:00'),
        },
        {
          movie_id: 12, // Back to the Future
          comment:
            "Where we're going, we don't need roads! A perfect blend of sci-fi and comedy.",
          rating: 4.7,
          createdAt: new Date('2024-04-14 14:20:00'),
          updatedAt: new Date('2024-04-14 14:20:00'),
        },
        {
          movie_id: 13, // The Usual Suspects
          comment:
            "The greatest trick the devil ever pulled was convincing the world he didn't exist. Mind-blowing twist!",
          rating: 4.5,
          createdAt: new Date('2024-04-16 11:45:00'),
          updatedAt: new Date('2024-04-16 11:45:00'),
        },
        {
          movie_id: 14, // The Silence of the Lambs
          comment:
            'Chilling and brilliant. Anthony Hopkins as Hannibal Lecter is terrifyingly perfect.',
          rating: 4.6,
          createdAt: new Date('2024-04-18 16:30:00'),
          updatedAt: new Date('2024-04-18 16:30:00'),
        },
        {
          movie_id: 15, // Casablanca
          comment:
            "Here's looking at you, kid. Timeless romance with unforgettable dialogue.",
          rating: 4.5,
          createdAt: new Date('2024-04-20 13:10:00'),
          updatedAt: new Date('2024-04-20 13:10:00'),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {});
  },
};
