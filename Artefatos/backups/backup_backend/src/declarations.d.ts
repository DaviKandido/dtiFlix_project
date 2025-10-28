declare module '@isatech/express-sequelize-query-filter';

declare namespace Express {
  export interface Request {
    filterOptions?: import('sequelize').FindOptions;
  }
}