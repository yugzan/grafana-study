import { QueryCtrl } from 'app/plugins/sdk';

export class TequiniDatasourceQueryCtrl extends QueryCtrl {

    constructor($scope, $injector, backendSrv, uiSegmentSrv) {
        super($scope, $injector);

        this.scope = $scope;
        this.uiSegmentSrv = uiSegmentSrv;
        this.backendSrv = backendSrv;
        this.target.target = this.target.target || 'select metric';
        this.target.valuekeys = this.target.valuekeys || 'select valuekeys';
        this.target.devices = this.target.devices || 'select device';
        this.target.sensors = this.target.sensors || 'select sensor';
        this.target.type = this.target.type || 'timeserie';
    }

    $onInit() {
    }
    getValueKeysOptions(){
        return this.datasource.metricLastValueKeysFindQuery(this.target)
            .then(this.uiSegmentSrv.transformToSegments(false));
    }

    getSensorsOptions() {
        return this.datasource.metricSensorsFindQuery(this.target)
            .then(this.uiSegmentSrv.transformToSegments(false));
        // Options have to be transformed by uiSegmentSrv to be usable by metric-segment-model directive
    }
    getDevicesOptions() {
        return this.datasource.metricDevicesFindQuery(this.target)
            .then(this.uiSegmentSrv.transformToSegments(false));
        // Options have to be transformed by uiSegmentSrv to be usable by metric-segment-model directive
    }
    toggleEditorMode() {
        this.target.rawQuery = !this.target.rawQuery;
    }

    onChangeInternal() {
        this.panelCtrl.refresh(); // Asks the panel to refresh data.
    }
}

TequiniDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';
