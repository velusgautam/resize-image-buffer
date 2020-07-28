const fs = require('fs').promises;
const imageSize = require('image-size');
const test = require('ava');
const resizeImg = require('./index.js');

test('resize png image', async (t) => {
  const image = await resizeImg(await fs.readFile('test-image.png'), {
    width: 150,
    height: 99,
  });

  t.deepEqual(imageSize(image), {
    width: 150,
    height: 99,
    type: 'png',
  });
});

test('resize jpg image', async (t) => {
  const image = await resizeImg(await fs.readFile('test-image.jpg'), {
    width: 150,
    height: 99,
  });

  t.deepEqual(imageSize(image), {
    width: 150,
    height: 99,
    type: 'jpg',
  });
});

test('resize png image using only width', async (t) => {
  const image = await resizeImg(await fs.readFile('test-image.png'), {
    width: 150,
  });

  t.deepEqual(imageSize(image), {
    width: 150,
    height: 99,
    type: 'png',
  });
});

test('resize jpg image using only width', async (t) => {
  const image = await resizeImg(await fs.readFile('test-image.jpg'), {
    width: 150,
  });

  t.deepEqual(imageSize(image), {
    width: 150,
    height: 99,
    type: 'jpg',
  });
});

test('resize png image using only height', async (t) => {
  const image = await resizeImg(await fs.readFile('test-image.png'), {
    height: 100,
  });

  t.deepEqual(imageSize(image), {
    width: 150,
    height: 100,
    type: 'png',
  });
});

test('resize jpg image using only height', async (t) => {
  const image = await resizeImg(await fs.readFile('test-image.jpg'), {
    height: 100,
  });

  t.deepEqual(imageSize(image), {
    width: 150,
    height: 100,
    type: 'jpg',
  });
});

test('throw when using wrong format', async (t) => {
  await t.throwsAsync(
    resizeImg(await fs.readFile(__filename), { width: 150 }),
    {
      message: 'Image format not supported',
    }
  );
});

test('resize jpg image and output as png', async (t) => {
  const image = await resizeImg(await fs.readFile('test-image.jpg'), {
    width: 150,
    height: 99,
    format: 'png',
  });

  t.deepEqual(imageSize(image), {
    width: 150,
    height: 99,
    type: 'png',
  });
});

test('resize jpg image and output as bmp', async (t) => {
  const image = await resizeImg(await fs.readFile('test-image.jpg'), {
    width: 150,
    height: 99,
    format: 'bmp',
  });

  t.deepEqual(imageSize(image), {
    width: 150,
    height: 99,
    type: 'bmp',
  });
});

test('resize png image and output as bmp', async (t) => {
  const image = await resizeImg(await fs.readFile('test-image.png'), {
    width: 150,
    height: 99,
    format: 'bmp',
  });

  t.deepEqual(imageSize(image), {
    width: 150,
    height: 99,
    type: 'bmp',
  });
});

test('resize png image and output as jpg', async (t) => {
  const image = await resizeImg(await fs.readFile('test-image.png'), {
    width: 150,
    height: 99,
    format: 'jpg',
  });

  t.deepEqual(imageSize(image), {
    width: 150,
    height: 99,
    type: 'jpg',
  });
});

test('throw if `width` and `height` is not provided', async (t) => {
  await t.throwsAsync(resizeImg(await fs.readFile('test-image.png')), {
    message: 'You need to set either `width` or `height` options',
  });

  await t.throwsAsync(
    resizeImg(await fs.readFile('test-image.png'), { width: NaN }),
    { message: 'You need to set either `width` or `height` options' }
  );

  await t.throwsAsync(
    resizeImg(await fs.readFile('test-image.png'), { width: Infinity }),
    { message: 'You need to set either `width` or `height` options' }
  );
});
