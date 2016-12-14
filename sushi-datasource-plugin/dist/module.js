'use strict';

System.register(['./datasource', './query_ctrl'], function (_export, _context) {
  "use strict";

  var SushiDatasource, SushiDatasourceQueryCtrl, SushiConfigCtrl, SushiQueryOptionsCtrl, SushiAnnotationsQueryCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_datasource) {
      SushiDatasource = _datasource.SushiDatasource;
    }, function (_query_ctrl) {
      SushiDatasourceQueryCtrl = _query_ctrl.SushiDatasourceQueryCtrl;
    }],
    execute: function () {
      _export('ConfigCtrl', SushiConfigCtrl = function SushiConfigCtrl() {
        _classCallCheck(this, SushiConfigCtrl);
      });

      SushiConfigCtrl.templateUrl = 'partials/config.html';

      _export('QueryOptionsCtrl', SushiQueryOptionsCtrl = function SushiQueryOptionsCtrl() {
        _classCallCheck(this, SushiQueryOptionsCtrl);
      });

      SushiQueryOptionsCtrl.templateUrl = 'partials/query.options.html';

      _export('AnnotationsQueryCtrl', SushiAnnotationsQueryCtrl = function SushiAnnotationsQueryCtrl() {
        _classCallCheck(this, SushiAnnotationsQueryCtrl);
      });

      SushiAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';

      _export('Datasource', SushiDatasource);

      _export('QueryCtrl', SushiDatasourceQueryCtrl);

      _export('ConfigCtrl', SushiConfigCtrl);

      _export('QueryOptionsCtrl', SushiQueryOptionsCtrl);

      _export('AnnotationsQueryCtrl', SushiAnnotationsQueryCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
