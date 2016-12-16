import { TequiniDatasource } from './datasource';
import { TequiniDatasourceQueryCtrl } from './query_ctrl';

class TequiniConfigCtrl {}
TequiniConfigCtrl.template = '<datasource-http-settings current="ctrl.current"></datasource-http-settings>';

class TequiniQueryOptionsCtrl {}
TequiniQueryOptionsCtrl.templateUrl = 'partials/query.options.html';


class TequiniAnnotationsQueryCtrl {}
TequiniAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';

export {
    TequiniDatasource as Datasource,
    TequiniDatasourceQueryCtrl as QueryCtrl,
    TequiniConfigCtrl as ConfigCtrl,
    TequiniQueryOptionsCtrl as QueryOptionsCtrl,
    TequiniAnnotationsQueryCtrl as AnnotationsQueryCtrl
};
