(function(config) {
  window.trinketConfig = {
    get : function(key) {
      return config[key];
    },
    prefix : function(path, type) {
      if (path.charAt(0) !== '/') {
        path = '/' + path;
      }

      if (typeof type === 'undefined') {
        var pathType = path.match(/\/(\w+)\//);
        if (pathType) {
          type = pathType[1];
        }
      }

      return (type && config.prefixes[type])
        ? '/' + config.prefixes[type] + path
        // use current date if no prefix config can be found
        : '/' + config.cachePrefix + Date.now() + path;
    },
    getUrl : function(path) {
      if (path.charAt(0) !== '/') {
        path = '/' + path;
      }
      return config.protocol + '://' + config.apphostname + path;
    },
    getClassUrl : function(userSlug, courseSlug) {
      var classUri = '/' + courseSlug

      if (config.usersubdomains) {
        return '//' + userSlug + '.' + config.apphostname + classUri;
      } else {
        return '/u/' + userSlug + '/classes' + classUri;
      }
    }
  };
})(window.trinket.config);
