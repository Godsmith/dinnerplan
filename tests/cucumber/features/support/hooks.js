/**
 * Created by Filip on 2015-10-29.
 */
(function () {

  'use strict';

  module.exports = function () {

    this.Before(function () {
      this.server.call('reset');
    });

  };

})();