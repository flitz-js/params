import request from "supertest";
import { params } from '..';

it('should have only 1 parameter (genre) be submitted', async () => {
  const app = global.createTestApp();

  app.get(params('/books/:genre/:title?'), async (req, res) => {
    res.write(JSON.stringify(req.params));
    res.end();
  });

  const response = await request(app)
    .get('/books/horror')
    .parse(global.parseBody)
    .send()
    .expect(200);

  const paramList = JSON.parse(
    response.body.toString('utf8')
  );

  expect(typeof paramList).toBe('object');
  expect(Object.keys(paramList)).toHaveLength(1);
  expect(typeof paramList.genre).toBe('string');
  expect(paramList.genre).toBe('horror');
  expect(typeof paramList.title).toBe('undefined');
  expect(paramList.title).toBe(undefined);
});

it('should have 2 parameter (genre and title) be submitted', async () => {
  const app = global.createTestApp();

  app.get(params('/books/:genre/:title?'), async (req, res) => {
    res.write(JSON.stringify(req.params));
    res.end();
  });

  const response = await request(app)
    .get('/books/HoRrOr/It')
    .parse(global.parseBody)
    .send()
    .expect(200);

  const paramList = JSON.parse(
    response.body.toString('utf8')
  );

  expect(typeof paramList).toBe('object');
  expect(Object.keys(paramList)).toHaveLength(2);
  expect(typeof paramList.genre).toBe('string');
  expect(paramList.genre).toBe('HoRrOr');
  expect(typeof paramList.title).toBe('string');
  expect(paramList.title).toBe('It');
});

it('should return 404', async () => {
  const app = global.createTestApp();

  app.get(params('/books/:genre/:title?'), async (req, res) => {
    res.write(JSON.stringify(req.params));
    res.end();
  });

  await request(app)
    .get('/books')
    .parse(global.parseBody)
    .send()
    .expect(404);
});
