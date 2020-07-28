// Copyright 2020-present Marcel Joachim Kloubert <marcel.kloubert@gmx.net>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import { Request, RequestPathValidator } from 'flitz';
const regexparam = require('regexparam');

interface RegexParamResult {
  keys: string[];
  pattern: RegExp;
}

/**
 * Creates a new path validator that extracts parameters
 * from the path and writes the data to 'params' property
 * of request context as key/value pair.
 * 
 * @returns {RequestPathValidator} The new path validator.
 */
export function params(path: string): RequestPathValidator {
  const result: RegexParamResult = regexparam(path);

  return (req: Request) => {
    try {
      const params = exec(req.url!, result);
      if (params) {
        req.params = params;

        return true;
      }
    } catch { }

    return false;
  };
}

function exec(path: string, result: RegexParamResult) {
  const paramList: any = {};

  const matches = result.pattern.exec(path);
  if (!matches) {
    return null;
  }

  for (let i = 0; i < result.keys.length; i++) {
    paramList[result.keys[i]] = matches[i + 1];
  }

  return paramList;
}
