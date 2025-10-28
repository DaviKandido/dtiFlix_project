import type { Response } from 'express';

const HttpResponse = {
  ok: (res: Response, body: any) => {
    const statusCode = 200;
    res.status(statusCode).send(body);
  },

  created: (res: Response, body: any) => {
    const statusCode = 201;
    res.status(statusCode).send(body);
  },

  updated: (res: Response, body = {}) => {
    const statusCode = 200;
    res.status(statusCode).send(body);
  },

  deleted: (res: Response, body: any) => {
    const statusCode = 200;
    res.status(statusCode).send(body);
  },

  end: (res: Response, statusCode = 200) => {
    res.status(statusCode).end();
  },
};

export default HttpResponse;