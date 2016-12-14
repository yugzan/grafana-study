import {SushiDatasource} from './datasource';
import {SushiDatasourceQueryCtrl} from './query_ctrl';

class SushiConfigCtrl {}
SushiConfigCtrl.templateUrl = 'partials/config.html';

class SushiQueryOptionsCtrl {}
SushiQueryOptionsCtrl.templateUrl = 'partials/query.options.html';

class SushiAnnotationsQueryCtrl {}
SushiAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html'

export {
  SushiDatasource as Datasource,
  SushiDatasourceQueryCtrl as QueryCtrl,
  SushiConfigCtrl as ConfigCtrl,
  SushiQueryOptionsCtrl as QueryOptionsCtrl,
  SushiAnnotationsQueryCtrl as AnnotationsQueryCtrl
};
