// options.toLowerCase
// options.protocol

module.exports = function(baseUrl, options) {
  // determine what was provided
  let constructedUrl;
  // if no baseUrl was provided
  if (baseUrl === undefined) {
    constructedUrl = "";
  }
  // if options where provided as the first parameter
  else if (typeof baseUrl === "object") {
    constructedUrl = "";
    options = baseUrl;
  }
  // if a baseUrl was actually provided
  else {
    constructedUrl = baseUrl;
  }

  // if options provided, apply options
  if (options) {
    // check whether to convert to lowercase
    let convertToLowercase;
    if (options.lowercase === true) {
      convertToLowercase = true;
    } else {
      convertToLowercase = false;
    }

    // enforce protocol option
    let protocolOption = options.protocol;
    if (protocolOption !== undefined) {
      // check whether to enforce URL starts with HTTPS
      if (protocolOption.toLowerCase() === "https") {
        // if URL starts with HTTP instead of HTTPS
        if (constructedUrl.toLowerCase().startsWith("http://")) {
          // remove http
          constructedUrl = constructedUrl.slice(7, constructedUrl.length);
        }
        // if url doesn't already start with HTTPS, add HTTPS
        if (!constructedUrl.toLowerCase().startsWith("https://")) {
          constructedUrl = "https://" + constructedUrl;
        }
      }

      // check whether to enforce URL starts with HTTP
      else if (protocolOption.toLowerCase() === "http") {
        // if URL starts with HTTPS instead of HTTP
        if (constructedUrl.toLowerCase().startsWith("https://")) {
          // remove HTTPS
          constructedUrl = constructedUrl.slice(8, constructedUrl.length);
        }
        // if url doesn't already start with HTTP, add HTTP
        if (!constructedUrl.toLowerCase().startsWith("http://")) {
          constructedUrl = "http://" + constructedUrl;
        }
      }

      // check whether to enforce no HTTP or HTTPS
      else if (protocolOption.toLowerCase() === "none") {
        // if URL starts with https://, remove it
        if (constructedUrl.toLowerCase().startsWith("https://")) {
          constructedUrl = constructedUrl.slice(8, constructedUrl.length);
        }
        // if URL starts with http://, remove it
        else if (constructedUrl.toLowerCase().startsWith("http://")) {
          constructedUrl = constructedUrl.slice(7, constructedUrl.length);
        }
      }
    }

    // add path option
    let pathToAppend = options.path;
    if (pathToAppend !== undefined) {
      // if slash on end of baseUrl, remove slash
      if (constructedUrl[constructedUrl.length - 1] === "/")
        constructedUrl = constructedUrl.slice(0, -1);
      // if URL at start at path, remove URL
      if (pathToAppend[0] === "/")
        pathToAppend = pathToAppend.slice(1, pathToAppend.length);

      // if lowercase is true, convert path to lowercase
      if (convertToLowercase === true)
        pathToAppend = pathToAppend.toLowerCase();

      // add path
      constructedUrl = constructedUrl + "/" + pathToAppend;
    }

    // construct query parameters
    let queryOptions = options.queryParams;
    if (queryOptions !== undefined) {
      let listOfQueries = new Array();
      // get all keys from object
      let allKeys = Object.keys(queryOptions);
      // iterate over every key
      for (let i = 0; i < allKeys.length; i++) {
        // get current query and value
        let currentQuery = allKeys[i];
        let currentValue = queryOptions[currentQuery];
        if (currentValue !== undefined) {
          let encodedParameter = encodeURIComponent(
            String(currentValue.trim())
          );
          if (convertToLowercase) {
            encodedParameter = encodedParameter.toLowerCase();
            currentQuery = currentQuery.trim().toLowerCase();
          }
          listOfQueries.push(currentQuery + "=" + encodedParameter);
        }
      }

      // construct entire query parameters
      if (listOfQueries.length > 0) {
        let allQueries = "?" + listOfQueries.join("&");
        constructedUrl = constructedUrl + allQueries;
      }
    }

    // add hash to url
    let hashToAdd = options.hash;
    if (hashToAdd !== undefined) {
      hashToAdd = String(options.hash).trim();
      if (convertToLowercase) hashToAdd = hashToAdd.toLowerCase();
      constructedUrl = constructedUrl + "#" + hashToAdd;
    }
  }

  return constructedUrl;
};
