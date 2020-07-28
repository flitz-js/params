[![npm](https://img.shields.io/npm/v/@flitz/params.svg)](https://www.npmjs.com/package/@flitz/params) [![supported flitz version](https://img.shields.io/static/v1?label=flitz&message=0.14.0%2B&color=blue)](https://github.com/flitz-js/flitz) [![last build](https://img.shields.io/github/workflow/status/flitz-js/params/Publish)](https://github.com/flitz-js/params/actions?query=workflow%3APublish) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/flitz-js/params/pulls)

# @flitz/params

> Extracts path parameters and makes them available in a [flitz](https://github.com/flitz-js/flitz) request.

## Install

Run

```bash
npm install --save @flitz/params
```

from the folder, where your `package.json` is stored.

## Usage

```javascript
const flitz = require('flitz');
const params = require('@flitz/params');

const run = async () => {
  const app = flitz();

  //        👇👇👇
  app.post( params('/foo/:bar/:baz?'), async (req, res) => {
    res.write('Submitted params: ' + JSON.stringify(req.params, null, 2));
    res.end();
  });

  await app.listen(3000);
};

run();
```

Or the TypeScript way:

```typescript
import flitz from 'flitz';
import { params } from '@flitz/params';

const run = async () => {
  const app = flitz();

  //        👇👇👇
  app.post( params('/foo/:bar/:baz?'), async (req, res) => {
    res.write('Submitted params: ' + JSON.stringify(req.params, null, 2));
    res.end();
  });

  await app.listen(3000);
};

run();
```

## TypeScript

TypeScript is optionally supported. The module contains its own [definition files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html).

## Credits

The module makes use of:

* [regexparam](https://github.com/lukeed/regexparam) by [Luke Edwards](https://github.com/lukeed)

## License

MIT © [Marcel Kloubert](https://github.com/mkloubert)
