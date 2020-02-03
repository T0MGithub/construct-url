# construct-url

A lightweight NPM module to construct URLs including query parameters, path, protocol, domain and hash.

## Installation

Installation using NPM:

```javascript
$ npm i construct-url --save
```

## Usage

Example usage:

```javascript
const constructURL = require("construct-url");

// returns "https://example.com/page/details?option_a=test&option_b=test_two#main"
constructURL("http://example.com/", {
  queryParams: {
    option_a: "TEST",
    OPTION_B: "test_two"
  },
  path: "/page/details",
  lowercase: true,
  protocol: "https",
  hash: "main"
});
```

```javascript
constructUrl(baseUrl, options);
```

## Configuration Options

### baseUrl

The base URL is the domain for the constructed URL and which all query parameters, the path and the hash is appended to.

### options.queryParams

Query parameters should be a object passed in. Each key and value in the object will be appended to the URL as a query parameter. The key will be used as the query parameter and the value as the query value.

For example a query parameter object containing a key of "a" and a corresponding value of "b", would result in a query string of "?a=b".

### options.path

Path parameter will be added to the URL as a path. The path parameter will avoid duplicate "/" in the path, by removing the last character of the base URL if it is a "/" and the first character of the path if it is a slash "/".

### options.hash

The hash parameter will be used to add a hash symbol and the value to the end of a URL. For example, if a hash value of "main" is provided, the constructed URL will end in "#main".

### options.lowercase

If the lowercase parameter has a value of `true`, the path, hash and query parameters will all be converted to lowercase.

### options.protocol

If the protocol attribute is equal to "https" or "http", the constructed URL will start with the relevant protocol. If the base URL provided already has a different protocol, the protocol will be replaced. If the protocol attribute is equal to "none", the constructed URL will have no protocol, even if the base URL had a protocol.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Author

[TomPrograms](https://github.com/TomPrograms)
