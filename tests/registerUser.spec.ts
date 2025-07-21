import { test, expect, request } from '@playwright/test';


test('Complete user register', async ({ page, request }) => {

  await page.goto('https://reqres.in');

  await page.click('text=Create User');

  await page.fill('#name', 'Marcela Maya');
  await page.fill('#job', 'QA Engineer');

  const apiResponse = await request.post('https://reqres.in/api/users', {
    data: {
      name: 'Marcela Maya',
      job: 'QA Engineer',
    },
  });

   expect(apiResponse.status()).toBe(201);

   const responseBody = await apiResponse.json();

   console.log('API Response:', responseBody);

   expect(responseBody).toHaveProperty('id');

     console.log(`SQL Query hopefully:
    SELECT * FROM users WHERE id = '${responseBody.id}';
  `);

});

