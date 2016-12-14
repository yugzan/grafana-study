"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, SushiDatasource;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export("SushiDatasource", SushiDatasource = function () {
        function SushiDatasource(instanceSettings, $q, backendSrv, templateSrv) {
          _classCallCheck(this, SushiDatasource);

          this.type = instanceSettings.type;
          this.url = instanceSettings.url;
          this.name = instanceSettings.name;
          this.q = $q;
          this.backendSrv = backendSrv;
          this.templateSrv = templateSrv;
        }

        _createClass(SushiDatasource, [{
          key: "query",
          value: function query(options) {}
        }, {
          key: "testDatasource",
          value: function testDatasource() {
            return true;
          }
        }, {
          key: "annotationQuery",
          value: function annotationQuery(options) {}
        }, {
          key: "metricFindQuery",
          value: function metricFindQuery(options) {}
        }]);

        return SushiDatasource;
      }());

      _export("SushiDatasource", SushiDatasource);
    }
  };
});
//# sourceMappingURL=datasource.js.map
