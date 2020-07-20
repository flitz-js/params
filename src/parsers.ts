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
const { exec, match, parse } = require('matchit');

interface MatchItem {
  end: string;
  old: string;
  type: string;
  val: string;
};

/**
 * Creates a new path validator that extracts parameters
 * from the path and writes the data to 'params' property
 * of request context as key/value pair.
 * 
 * @returns {RequestPathValidator} The new path validator.
 */
export function params(path: string): RequestPathValidator {
  const route: any[] = parse(path);

  return (req: Request) => {
    try {
      const matchList: MatchItem[] = match(req.url, [route]);
      if (matchList.length) {
        req.params = exec(req.url, matchList);

        return true;
      }
    } catch { }

    return false;
  };
}
