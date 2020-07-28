> Resize images in memory

## Install

```
npm install resize-image-buffer

yarn add resize-image-buffer
```

## Usage

```js
const fs = require('fs');
const resizeImg = require('resize-image-buffer');

(async () => {
  const image = await resizeImg(fs.readFileSync('unicorn.png'), {
    width: 128,
    height: 128,
  });

  fs.writeFileSync('unicorn-128x128.png', image);
})();
```

## API

### resizeImg(buffer, options)

Returns a `Promise<Buffer>` with the resized image.

#### buffer

Type: `Buffer`

An image buffer. Supported formats are `bmp`, `jpg` and `png`.

#### options

Type: `Object`

##### width

Type: `number`

Desired width of the target image.

##### height

Type: `number`

Desired height of the target image.

##### format

Type: `string`

The output file format for the target image. Supported formats are `bmp`, `jpg` and `png`.
