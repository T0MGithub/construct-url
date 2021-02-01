const constructUrl = require("../index.js");
const expect = require("chai").expect;

describe("construct-url", function() {
  it("http should be replaced with https", function() {
    expect(
      constructUrl("http://example.com", {
        protocol: "https",
        path: "/test"
      })
    ).to.equal("https://example.com/test");
  });

  it("protocol none should remove http", function() {
    expect(
      constructUrl("http://example.com", {
        protocol: "none"
      })
    ).to.equal("example.com");
  });

  it("query parameters should be able to be numbers", function() {
    expect(
      constructUrl("https://example.com", {
        path: "/TEST",
        queryParams: {
          option: 1
        },
        lowercase: true
      })
    ).to.equal("https://example.com/test?option=1");
  });

  it("query parameters and path should be converted to lowercase", function() {
    expect(
      constructUrl("https://example.com", {
        path: "/TEST",
        queryParams: {
          option: " test ",
          OPTION_TWO: "test_two"
        },
        lowercase: true
      })
    ).to.equal("https://example.com/test?option=test&option_two=test_two");
  });

  it("& shouldn't be appended to end of URL when one query provided", function() {
    expect(
      constructUrl("example.com", {
        path: "/test",
        queryParams: {
          option: "test"
        }
      })
    ).to.equal("example.com/test?option=test");
  });

  it("hash should be appended to end of URL", function() {
    expect(
      constructUrl("example.com", {
        path: "/test",
        queryParams: {
          option: "test"
        },
        hash: "test"
      })
    ).to.equal("example.com/test?option=test#test");
  });

  it("if no query parameters appended ? shouldn't be added", function() {
    expect(
      constructUrl("example.com", {
        path: "/test",
        queryParams: {},
        hash: "test"
      })
    ).to.equal("example.com/test#test");
  });

  it("to lowercase option should be applied to hash", function() {
    expect(
      constructUrl("example.com", {
        hash: "TEST",
        lowercase: true
      })
    ).to.equal("example.com#test");
  });
});
