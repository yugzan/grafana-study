//https://github.com/grafana/grafana/blob/master/public/app/core/services/backend_srv.ts
//import _ from "lodash";
import moment from "moment";

class TequiniDatasource {
    //constructor() {}
    constructor(instanceSettings, $q, backendSrv, templateSrv) {
        this.type = instanceSettings.type;
        this.url = instanceSettings.url;
        this.name = instanceSettings.name;
        this.q = $q;
        this.backendSrv = backendSrv;
        this.templateSrv = templateSrv;
    }
    query(options) {
        console.log("run query");
        // console.log(options);
        
        var query = this.buildQueryParameters(options);
        // console.log("query");
        // console.log(query);
        query.targets = query.targets.filter(t => !t.hide);
        console.log("query.targets");
        console.log(query.targets);
        console.log(this.url + '/devices/' + options.targets[0].devices + '/sensors/' + options.targets[0].sensors );

        /*console.log(
            this.backendSrv.request(options).then(
                response => {
                    options.url = 'http://127.0.0.1:8080/api/devices/' + response.resources[0].id;
                    return this.backendSrv.request(options).then(resp => {
                        console.log(resp);
                        return resp;
                    });
                    // return this.backendSrv.'http://127.0.0.1:8080/api/devices/' + response.resources[0].id;
                }
            ));*/
        //return [];
        var urls = this.buildQueryUrl( this.url , options.targets);
        console.log(this.getQueryDatas(this.backendSrv, urls[0] ) ) ;
        console.log("query.getQueryDatas");

                var ajaxreq = this.backendSrv.datasourceRequest({
                  url: this.url +'/api/devices/'+ options.targets[0].devices  + '/sensors/'+ options.targets[0].sensors +'/data',
                  data: query,
                  method: 'GET',
                  headers: {
                    'X-Auth-Username': 'admin',
                    'X-Auth-Password': 'pass',
                    'Content-Type': 'application/json'
                 }
               }).then(response => {
                  if (response.status === 200) {
                    response.data=this.transform_tequini( options.targets[0].target , response.data);
                    return response;
                  }
                });
               return ajaxreq;
    }
    buildQueryUrl(thisurl ,targets){
        var options  = [];
          _.forEach( targets , function(target) {
            var o = {
                  url: thisurl +'/api/devices/'+ target.devices  + '/sensors/'+ target.sensors +'/data',
                  method: 'GET',
                  headers: {
                    'X-Auth-Username': 'admin',
                    'X-Auth-Password': 'pass',
                    'Content-Type': 'application/json'
                 }
               };
               console.log(o);
               options.push(o);
           });
          return options;
    }
    getQueryDatas(Srv, options){
            return Srv.request(options)
            .then( response => {
                    return response;
                }
            );
    }
    transform_tequini(target,data){
      var pattern = [  ];
      var datapoints = [  ];
      var count = 0 ;
      _.forEach( data.resources , function(opt) {
          datapoints.push( [opt.value, moment(opt.at).valueOf() ] );
       });
       var  tempModel = {
        "target": target, //opt.id  The field being queried for
        "datapoints":datapoints
      };
      //return tempModel;
      pattern.push( tempModel );
      console.log(pattern);
      return pattern;
    }

    testDatasource() {
            console.log("run testDatasource");
            var options = {
                method: 'GET',
                url: this.url + '/api/devices',
                headers: {
                    'X-Auth-Username': 'admin',
                    'X-Auth-Password': 'pass',
                    'Content-Type': 'application/json'
                }
            };
            console.log(this.backendSrv);
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
                'X-Auth-Username': 'admin',
                'X-Auth-Password': 'pass',
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
                'X-Auth-Username': 'admin',
                'X-Auth-Password': 'pass',
                'Content-Type': 'application/json'
            }
        };
        return this.metricFindQuery(options, query);
    }
    mapResultsToTextValue(result) {
        return _.map(result.data.resources, (opt) => {
            // console.log(opt);
            return { text: opt.id, value: opt.name };
        });
    }
    buildQueryParameters(options) {
        //remove placeholder targets
        console.log("buildQueryParameters");
        console.log(options.targets);
        options.targets = _.filter(options.targets, target => {
            return target.target !== 'select metric';
        });
        options.targets = _.filter(options.targets, target => {
            return target.devices !== 'select device';
        });
        options.targets = _.filter(options.targets, target => {
            return target.sensors !== 'select sensor';
        });

        var targets = _.map(options.targets, target => {
            return {
                devices: target.devices,
                sensors: target.sensors,
                target: this.templateSrv.replace(target.devices + '.' + target.sensors),
                refId: target.refId,
                hide: target.hide,
                type: target.type || 'timeserie'
            };
        });

        options.targets = targets;

        return options;
    }

}


export { TequiniDatasource };
