/* eslint-disable no-template-curly-in-string */

import test from 'ava'
import convertFile from 'convert/file'

test('noauth', t => {
  const result = convertFile('test/material/2/noauth.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./postman-shim.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com"
  });
}
`)
})

test('basic', t => {
  const result = convertFile('test/material/2/basic.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./postman-shim.js";
import URI from "./urijs.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com",
    auth(config, Var) {
      const address = new URI(config.address);
      address.username("user123");
      address.password("secret");
      config.address = address.toString();
      config.options.auth = "basic";
    }
  });
}
`)
})

test('bearer', t => {
  const result = convertFile('test/material/2/bearer.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./postman-shim.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com",
    auth(config, Var) {
      config.headers.Authorization = "Bearer secrettoken";
    }
  });
}
`)
})

test('digest', t => {
  const result = convertFile('test/material/2/digest.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./postman-shim.js";
import URI from "./urijs.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com",
    auth(config, Var) {
      const address = new URI(config.address);
      address.username("user123");
      address.password("secret");
      config.address = address.toString();
      config.options.auth = "digest";
    }
  });
}
`)
})

test('ntlm', t => {
  const result = convertFile('test/material/2/ntlm.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./postman-shim.js";
import URI from "./urijs.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com",
    auth(config, Var) {
      const address = new URI(config.address);
      address.username("user123");
      address.password("secret");
      config.address = address.toString();
      config.options.auth = "ntlm";
    }
  });
}
`)
})

test('awsv4', t => {
  const result = convertFile('test/material/2/awsv4.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./postman-shim.js";
import URI from "./urijs.js";
import aws4 from "./aws4.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com",
    auth(config, Var) {
      const address = new URI(config.address);
      const options = {
        method: "get",
        protocol: address.protocol(),
        hostname: address.hostname(),
        port: address.port(),
        path: address.path() + address.search(),
        region: "region",
        service: "service"
      };
      const credential = {
        accessKeyId: "accesskey",
        secretAccessKey: "secretkey",
        sessionToken: "session"
      };
      const signed = aws4.sign(options, credential);
      config.address = new URI()
        .protocol(address.protocol())
        .hostname(signed.hostname)
        .path(signed.path)
        .toString();
      Object.assign(config.headers, signed.headers);
    }
  });
}
`)
})

test('oauth1 header sha1', t => {
  const result = convertFile('test/material/2/oauth1-header-sha1.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./postman-shim.js";
import OAuth from "./oauth-1.0a.js";
import { hmac } from "k6/crypto";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com",
    auth(config, Var) {
      const options = {
        consumer: {
          key: "conkey",
          secret: "consec"
        },
        signature_method: "HMAC-SHA1",
        hash_function(data, key) {
          return hmac("sha1", key, data, "base64");
        },
        version: "1.0",
        realm: "realm@example.com"
      };
      const request = {
        method: config.method,
        url: config.address,
        data: {
          oauth_timestamp: "1",
          oauth_nonce: "10"
        }
      };
      const token = {
        key: "tokkey",
        secret: "toksec"
      };
      const oauth = OAuth(options);
      const auth = oauth.toHeader(oauth.authorize(request, token));
      Object.assign(config.headers, auth);
    }
  });
}
`)
})

test('oauth1 header sha256', t => {
  const result = convertFile('test/material/2/oauth1-header-sha256.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./postman-shim.js";
import OAuth from "./oauth-1.0a.js";
import { hmac } from "k6/crypto";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com",
    auth(config, Var) {
      const options = {
        consumer: {
          key: "conkey",
          secret: "consec"
        },
        signature_method: "HMAC-SHA256",
        hash_function(data, key) {
          return hmac("sha256", key, data, "base64");
        },
        version: "1.0",
        realm: "realm@example.com"
      };
      const request = {
        method: config.method,
        url: config.address,
        data: {
          oauth_timestamp: "1",
          oauth_nonce: "10"
        }
      };
      const token = {
        key: "tokkey",
        secret: "toksec"
      };
      const oauth = OAuth(options);
      const auth = oauth.toHeader(oauth.authorize(request, token));
      Object.assign(config.headers, auth);
    }
  });
}
`)
})

test('oauth1 header text', t => {
  const result = convertFile('test/material/2/oauth1-header-text.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./postman-shim.js";
import OAuth from "./oauth-1.0a.js";
import { hmac } from "k6/crypto";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com",
    auth(config, Var) {
      const options = {
        consumer: {
          key: "conkey",
          secret: "consec"
        },
        signature_method: "PLAINTEXT",
        version: "1.0",
        realm: "realm@example.com"
      };
      const request = {
        method: config.method,
        url: config.address,
        data: {
          oauth_timestamp: "1",
          oauth_nonce: "10"
        }
      };
      const token = {
        key: "tokkey",
        secret: "toksec"
      };
      const oauth = OAuth(options);
      const auth = oauth.toHeader(oauth.authorize(request, token));
      Object.assign(config.headers, auth);
    }
  });
}
`)
})

test('oauth1 body', t => {
  const result = convertFile('test/material/2/oauth1-body.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./postman-shim.js";
import OAuth from "./oauth-1.0a.js";
import { hmac } from "k6/crypto";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "POST",
    address: "http://example.com",
    auth(config, Var) {
      const options = {
        consumer: {
          key: "conkey",
          secret: "consec"
        },
        signature_method: "HMAC-SHA1",
        hash_function(data, key) {
          return hmac("sha1", key, data, "base64");
        },
        version: "1.0",
        realm: "realm@example.com"
      };
      const request = {
        method: config.method,
        url: config.address,
        data: {
          oauth_timestamp: "1",
          oauth_nonce: "10"
        }
      };
      const token = {
        key: "tokkey",
        secret: "toksec"
      };
      const oauth = OAuth(options);
      const auth = oauth.authorize(request, token);
      Object.assign(config.data, auth);
    }
  });
}
`)
})

test('oauth1 address', t => {
  const result = convertFile('test/material/2/oauth1-address.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./postman-shim.js";
import OAuth from "./oauth-1.0a.js";
import URI from "./urijs.js";
import { hmac } from "k6/crypto";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com",
    data: "line1\\nline2\\nline3\\n",
    auth(config, Var) {
      const options = {
        consumer: {
          key: "conkey",
          secret: "consec"
        },
        signature_method: "HMAC-SHA1",
        hash_function(data, key) {
          return hmac("sha1", key, data, "base64");
        },
        version: "1.0",
        realm: "realm@example.com"
      };
      const request = {
        method: config.method,
        url: config.address,
        data: {
          oauth_timestamp: "1",
          oauth_nonce: "10"
        }
      };
      const token = {
        key: "tokkey",
        secret: "toksec"
      };
      const oauth = OAuth(options);
      const auth = oauth.authorize(request, token);
      const address = new URI(config.address);
      for (const key of Object.keys(auth)) {
        address.addQuery(key, auth[key]);
      }
      config.address = address.toString();
    }
  });
}
`)
})

test('oauth2 header', t => {
  const result = convertFile('test/material/2/oauth2-header.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./postman-shim.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com",
    auth(config, Var) {
      config.headers.Authorization = "Bearer token";
    }
  });
}
`)
})

test('oauth2 address', t => {
  const result = convertFile('test/material/2/oauth2-address.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./postman-shim.js";
import URI from "./urijs.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com",
    auth(config, Var) {
      const address = new URI(config.address);
      address.addQuery("access_token", "token");
      config.address = address.toString();
    }
  });
}
`)
})

test('inherit collection', t => {
  const result = convertFile('test/material/2/inherit-collection.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./postman-shim.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com",
    auth(config, Var) {
      config.headers.Authorization = "Bearer token";
    }
  });
}
`)
})

test('inherit folder', t => {
  const result = convertFile('test/material/2/inherit-folder.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./postman-shim.js";
import { group } from "k6";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");

export default function() {
  group("TestFolder", function() {
    postman[Request]({
      name: "TestRequest",
      method: "GET",
      address: "http://example.com",
      auth(config, Var) {
        config.headers.Authorization = "Bearer token";
      }
    });
  });
}
`)
})

test('inherit nested', t => {
  const result = convertFile('test/material/2/inherit-nested.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./postman-shim.js";
import { group } from "k6";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");

export default function() {
  group("TestFolder1", function() {
    group("TestFolder2", function() {
      group("TestFolder3", function() {
        group("TestFolder4", function() {
          postman[Request]({
            name: "TestRequest",
            method: "GET",
            address: "http://example.com",
            auth(config, Var) {
              config.headers.Authorization = "Bearer token";
            }
          });
        });
      });
    });
  });
}
`)
})
