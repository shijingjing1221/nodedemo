/*global document, window, angular*/
(function() {
  window.chrometwo_require([
    'jquery'
  ], function(jq) {
    'use strict';
    window.require.config({
      urlArgs: ''
    });
    var base = '/labs/rhlabsangular/';
    if (!window.LABS_DEBUG) {
      window.deps = ['app/vendor.js', 'app/app.js'];
    } else {
      window.deps = window.deps.map(function(dep) {
        return base + dep + '.js';
      });
    }
    // keep track of deferreds we are loading
    var dfds = [];
    var qLoad = function(mod, index) {
      var previousDfd = dfds[index - 1];
      dfds[index] = new jq.Deferred();
      // Internal load that actually wraps the chrometwo_require
      var _load = function() {
        window.chrometwo_require(mod.split(), function() {
          // All good, resolve deferred
          dfds[index].resolve();
        });
      };
      if (previousDfd) {
        // We have a previous mod loading, chain the next load
        previousDfd.then(_load);
      } else {
        // First module being loaded. Fire away
        _load();
      }
      return dfds[index].promise();
    };
    // Queue up loading of modules
    for (var i = 0; i < window.deps.length; i++) {
      qLoad(window.deps[i], i);
    }
    // Once all modules have loaded bootstrap it
    jq.when.apply(jq, dfds).then(function() {
      // Bootstrap angular app
      angular.bootstrap(document, ['rhlabsangularApp']);
      // Fade in main element
      jq('#rhlabsangular').fadeIn();
    });

  });
})();
