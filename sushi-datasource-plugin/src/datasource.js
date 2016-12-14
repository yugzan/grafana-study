export class SushiDatasource {

  constructor(instanceSettings, $q, backendSrv, templateSrv) {
    this.type = instanceSettings.type;
    this.url = instanceSettings.url;
    this.name = instanceSettings.name;
    this.q = $q;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
  }

  query(options) {
  }

  testDatasource() {
    return true;
  }

  annotationQuery(options) {

  }

  metricFindQuery(options) {
  }
}
