//https://github.com/grafana/grafana/blob/master/public/app/core/services/backend_srv.ts
// import _ from "lodash";
import moment from "moment";

class TequiniDatasource {
    //constructor() {}
    constructor(instanceSettings, $q, backendSrv, templateSrv) {
        this.q = $q;
        this.backendSrv = backendSrv;
        this.templateSrv = templateSrv;
        this.type = instanceSettings.type;
        this.url = instanceSettings.url;
        this.name = instanceSettings.name;
        this.basicAuth = window.atob(instanceSettings.basicAuth.replace('Basic ', ''));
        var useropt = this.basicAuth.split(":");
        this.user = useropt[0];
        this.password = useropt[1];
    }
    query(options) {
        console.log("run query");

        var query = this.buildQueryParameters(options);

        query.targets = query.targets.filter(t => !t.hide);
        console.log("query.targets");
        console.log(query.targets);

        //build url options 
        var queries = this.buildQueryUrl(this.url, options.targets);
        //build promise
        var allQueryPromise = _.map(queries, function(queryIt) {
            return this.getQueryDatas(this.backendSrv, queryIt);
        }.bind(this));

        return this.q.all(allQueryPromise).then(function(allResponse) {
            return this.transformResources(options, allResponse);
        }.bind(this));


        /*console.log(
            this.backendSrv.request(options).then(
                response => {
                    options.url = this.url + '/api/devices/' + response.resources[0].id;
                    return this.backendSrv.request(options).then(resp => {
                        console.log(resp);
                        //     if (resp.status === 200) {
                        //         resp.data = this.transform_tequini(options.targets[0].target, response.data);
                        //         return resp;
                        //     }
                    });
                    // return this.backendSrv.'http://127.0.0.1:8080/api/devices/' + response.resources[0].id;
                }
            ));*/
        //return [];
    }//query

    buildQueryUrl(thisurl, targets) {
        var options = [];
        _.forEach(targets, function(target) {
            var o = {
                url: thisurl + '/api/devices/' + target.devices + '/sensors/' + target.sensors + '/data',
                method: 'GET',
                headers: {
                    'X-Auth-Username': this.user,
                    'X-Auth-Password': this.password,
                    'Content-Type': 'application/json'
                }
            };
            console.log(o);
            options.push(o);
        }.bind(this));
        return options;
    }
    getQueryDatas(Srv, options) {
        return Srv.request(options)
            .then(response => {
                return response;
            });
    }
    transformResources(options, allResponse) {
        var result = [];
        _.each(allResponse, function(response, index) {
            //var metrics = transformMetricData(response, options.targets[index], options.scopedVars);
            // result = result.concat(metrics);
            console.log(options.targets[index].devices + '.' + options.targets[index].sensors);
            result.push(this.transformDataPoints(options.targets[index] , response));
        }.bind(this));
        // console.log({ data: result });
        return { data: result };
    }
    transformDataPoints(target, data) {
        var datapoints = [];
        //check value is not object
        console.log(typeof data.resources[0].value);
        if (_.isObject(data.resources[0].value)) {
            _.each(data.resources, function(objset, index) {
                datapoints.push([  objset.value[target.valuekeys] , moment(objset.at).valueOf()]);
            });
            var tempModel = {
                "target": target.devices + "." + target.sensors  + "." + target.valuekeys, //opt.id  The field being queried for
                "datapoints": datapoints
            };
        } else {
            _.forEach(data.resources, opt => {
                datapoints.push([opt.value, moment(opt.at).valueOf()]);
            });
            var tempModel = {
                "target": target.devices + "." + target.sensors, //opt.id  The field being queried for
                "datapoints": datapoints
            };
        }
        return tempModel;
    }

    testDatasource() {
            console.log("run testDatasource");
            var options = {
                method: 'GET',
                url: this.url + '/api/devices',
                headers: {
                    'X-Auth-Username': this.user,
                    'X-Auth-Password': this.password,
                    'Content-Type': 'application/json'
                }
            };
            var datasourceRequest = this.backendSrv.datasourceRequest(options);
            return datasourceRequest.then(response => {
                if (response.status === 200) {
                    return { status: "success", message: "Tequini datasource is working", title: "Success" };
                }
            });
        } //test datasource


    annotationQuery(options) {

    }
    metricFindQuery(options, query) {
        return this.backendSrv.datasourceRequest(query).then(this.mapResultsToTextValue);
    }
    metricLastValueKeysFindQuery(options){
        console.log(this.url + '/api/devices/' + options.devices + '/sensors/' + options.sensors + '/data?maxResults=1');

        var query = {
            url: this.url + '/api/devices/' + options.devices + '/sensors/' + options.sensors + '/data?maxResults=1',
            method: 'GET',
            headers: {
                'X-Auth-Username': this.user,
                'X-Auth-Password': this.password,
                'Content-Type': 'application/json'
            }
        };
        //return this.metricFindQuery(options, query);
        return this.backendSrv.datasourceRequest(query).then(this.mapLastValueKeysToTextValue);
    }
    metricSensorsFindQuery(options) {
        console.log(this.url + '/api/devices/' + options.devices);
        var interpolated = {
            target: this.templateSrv.replace(options.target, null, 'regex')
        };
        console.log(interpolated);
        var query = {
            url: this.url + '/api/devices/' + options.devices + '/sensors',
            data: interpolated,
            method: 'GET',
            headers: {
                'X-Auth-Username': this.user,
                'X-Auth-Password': this.password,
                'Content-Type': 'application/json'
            }
        };
        return this.metricFindQuery(options, query);
    }
    metricDevicesFindQuery(options) {
        console.log("run metricDevicesFindQuery");
        console.log(options.target);
        var interpolated = {
            target: this.templateSrv.replace(options.target, null, 'regex')
        };
        var query = {
            url: this.url + '/api/devices',
            data: interpolated,
            method: 'GET',
            headers: {
                'X-Auth-Username': this.user,
                'X-Auth-Password': this.password,
                'Content-Type': 'application/json'
            }
        };
        return this.metricFindQuery(options, query);
    }
    mapLastValueKeysToTextValue(result) {
        return _.map(result.data.resources[0].value, function(v, k) {
            return { text: k , value: k };
        });
    }
    mapResultsToTextValue(result) {
        return _.map(result.data.resources, (opt) => {
            return { text: opt.id, value: opt.name };
        });
    }
    buildQueryParameters(options) {
        //remove placeholder targets
        console.log("buildQueryParameters");
        options.targets = _.filter(options.targets, target => {
            return (target.devices !== 'select device' && target.sensors !== 'select sensor');
        });

        var targets = _.map(options.targets, target => {
            return {
                devices: target.devices,
                sensors: target.sensors,
                valuekeys:target.valuekeys,
                dsType: 'tequini',
                target: this.templateSrv.replace(target.devices + '.' + target.sensors),
                refId: target.refId,
                hide: target.hide,
                type: target.type || 'timeserie'
            };
        });
        options.targets = targets;
        console.log(options.targets);
        return options;
    }

}


export { TequiniDatasource };
