const request = require('supertest');
const app = require('../src/index');

describe('Tasks API', () => {
  let taskId;

  test('GET /api/tasks - retourne la liste des tâches', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('POST /api/tasks - crée une nouvelle tâche', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Tâche test', description: 'Description test' });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Tâche test');
    taskId = res.body.data.id;
  });

  test('PUT /api/tasks/:id - modifie une tâche', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ title: 'Tâche modifiée' });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe('Tâche modifiée');
  });

  test('DELETE /api/tasks/:id - supprime une tâche', async () => {
    const res = await request(app).delete(`/api/tasks/${taskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test('POST /api/tasks - échoue sans titre', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ description: 'Sans titre' });
    expect(res.statusCode).toBe(400);
  });
});
