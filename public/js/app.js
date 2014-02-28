(function() {
  var googleChartsLoaded, initApp, windowLoaded,
    _this = this;

  window.Fishing = {
    Collection: {},
    Decorator: {},
    Model: {},
    Helper: {},
    Template: {},
    View: {},
    Global: {}
  };

  windowLoaded = false;

  googleChartsLoaded = false;

  initApp = function() {
    Fishing.Global.router = new Fishing.Router();
    return Backbone.history.start();
  };

  $(window).load(function() {
    windowLoaded = true;
    if (windowLoaded && googleChartsLoaded) {
      return initApp();
    }
  });

  google.load('visualization', '1', {
    packages: ['corechart']
  });

  google.setOnLoadCallback(function() {
    googleChartsLoaded = true;
    if (windowLoaded && googleChartsLoaded) {
      return initApp();
    }
  });

}).call(this);

(function() {
  Fishing.Constants = {
    appName: 'Fishwin',
    loggingOn: true,
    api: {
      domain: 'localhost',
      port: 8080
    },
    paramIds: {
      flowRate: 1,
      gageHeight: 2
    },
    googleAPIKey: 'AIzaSyAVteFYmf-gg2-gj5tta6hAxiTO823Fyhc',
    homeMap: {
      center: {
        latitude: 40.440546,
        longitude: -122.376709
      },
      zoomLevel: 7
    }
  };

  Fishing.Data = {
    locations: {}
  };

}).call(this);

(function() {
  var Fishing_Helper_APIUtils,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Fishing_Helper_APIUtils = (function() {
    function Fishing_Helper_APIUtils() {
      this.getLocations = __bind(this.getLocations, this);
      this.getLocation = __bind(this.getLocation, this);
      this.fetchData = __bind(this.fetchData, this);
    }

    Fishing_Helper_APIUtils.prototype.globalData = {};

    Fishing_Helper_APIUtils.prototype.locationsFetching = false;

    Fishing_Helper_APIUtils.prototype.locationsFetched = false;

    Fishing_Helper_APIUtils.prototype.locationsFetchedCallbacks = [];

    Fishing_Helper_APIUtils.prototype.fetchData = function(endpoint, data, cb) {
      var url,
        _this = this;
      url = '/api/' + endpoint;
      data = data || {};
      return $.ajax({
        url: url,
        data: data,
        complete: function(response, responseStatus) {
          var e;
          data = {};
          if (responseStatus === 'success') {
            try {
              data = JSON.parse(response.responseText);
            } catch (_error) {
              e = _error;
              flError('data parsing failed');
            }
          } else {
            flError('data fetch failed');
          }
          return cb(data);
        }
      });
    };

    Fishing_Helper_APIUtils.prototype.getLocation = function(locationId, cb) {
      var location,
        _this = this;
      if (this.locationsFetched) {
        location = this.globalData.locations[locationId];
        return cb(location);
      } else {
        if (this.locationsFetching) {
          return this.locationsFetchedCallbacks.push(function() {
            return _this.getLocation(locationId, cb);
          });
        } else {
          return this.getLocations(function() {
            return _this.getLocation(locationId, cb);
          });
        }
      }
    };

    Fishing_Helper_APIUtils.prototype.getLocations = function(cb) {
      var _this = this;
      if (this.locationsFetched) {
        return cb(this.globalData.locations);
      } else {
        this.locationsFetching = true;
        this.locationsFetchedCallbacks.push(cb);
        return this.fetchData('locations', {}, function(responseData) {
          _this.globalData.locations = responseData;
          _this.locationsFetched = true;
          _this.locationsFetching = false;
          return _.each(_this.locationsFetchedCallbacks, function(locationsFetchedCallback) {
            return locationsFetchedCallback(_this.globalData.locations);
          });
        });
      }
    };

    return Fishing_Helper_APIUtils;

  })();

  Fishing.Helper.APIUtils = new Fishing_Helper_APIUtils();

}).call(this);

(function() {
  var Fishing_Helper_Logger,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Fishing_Helper_Logger = (function() {
    function Fishing_Helper_Logger() {
      this.error = __bind(this.error, this);
      this.log = __bind(this.log, this);
    }

    Fishing_Helper_Logger.prototype.log = function(msg, obj) {
      if (!Fishing.Constants.loggingOn) {
        return;
      }
      if (Fishing.Helper.Utils.isUndefined(obj)) {
        return console.log(msg);
      } else {
        return console.log(msg, obj);
      }
    };

    Fishing_Helper_Logger.prototype.error = function(msg, obj) {
      if (!Fishing.Constants.loggingOn) {
        return;
      }
      if (Fishing.Helper.Utils.isUndefined(obj)) {
        return console.error(msg);
      } else {
        return console.error(msg, obj);
      }
    };

    return Fishing_Helper_Logger;

  })();

  Fishing.Helper.Logger = new Fishing_Helper_Logger();

  window.flLog = Fishing.Helper.Logger.log;

  window.flError = Fishing.Helper.Logger.error;

}).call(this);

(function() {
  var Fishing_Helper_Utils,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Fishing_Helper_Utils = (function() {
    function Fishing_Helper_Utils() {
      this.isUndefined = __bind(this.isUndefined, this);
    }

    Fishing_Helper_Utils.prototype.capitalize = function(s) {
      return s[0].toUpperCase() + s.slice(1);
    };

    Fishing_Helper_Utils.prototype.stringToFunction = function(str) {
      var arr, fn, i, _i, _ref;
      arr = str.split('.');
      fn = window;
      for (i = _i = 0, _ref = arr.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        fn = fn[arr[i]];
      }
      return fn;
    };

    Fishing_Helper_Utils.prototype.isUndefined = function(input) {
      if (typeof input === 'undefined') {
        return true;
      } else {
        return false;
      }
    };

    return Fishing_Helper_Utils;

  })();

  Fishing.Helper.Utils = new Fishing_Helper_Utils();

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Fishing.Router = (function(_super) {
    __extends(Router, _super);

    function Router() {
      this.renderPage = __bind(this.renderPage, this);
      this.setupMainLayout = __bind(this.setupMainLayout, this);
      this.sampleReport = __bind(this.sampleReport, this);
      this.report = __bind(this.report, this);
      this["default"] = __bind(this["default"], this);
      _ref = Router.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Router.prototype.mainLayout = null;

    Router.prototype.routes = {
      '': 'default',
      'home': 'home',
      'report/:locationId': 'report',
      'sampleReport': 'sampleReport'
    };

    Router.prototype["default"] = function() {
      return this.renderPage('home');
    };

    Router.prototype.report = function(locationId) {
      return this.renderPage('report', {
        locationId: locationId
      });
    };

    Router.prototype.sampleReport = function() {
      return this.renderPage('sampleReport');
    };

    Router.prototype.setupMainLayout = function() {
      if (!this.mainLayout) {
        return this.mainLayout = new Fishing.View.MainLayout({
          name: 'mainLayout',
          elSelector: '#fishingApp'
        });
      }
    };

    Router.prototype.renderPage = function(page, data) {
      this.setupMainLayout();
      this.mainLayout.teardownSubViews();
      this.mainLayout.addSubViewByDefinition({
        name: page,
        elSelector: '#fishingAppContent'
      }, data);
      return this.mainLayout.render();
    };

    return Router;

  })(Backbone.Router);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Fishing.View.Base = (function(_super) {
    __extends(Base, _super);

    function Base() {
      this._teardown = __bind(this._teardown, this);
      this.teardownSubViews = __bind(this.teardownSubViews, this);
      this.render = __bind(this.render, this);
      this.addSubViewByDefinition = __bind(this.addSubViewByDefinition, this);
      this.set = __bind(this.set, this);
      this.addSubView = __bind(this.addSubView, this);
      this.renderTemplate = __bind(this.renderTemplate, this);
      this.getTemplateSource = __bind(this.getTemplateSource, this);
      this.getTemplateName = __bind(this.getTemplateName, this);
      this.renderSubViews = __bind(this.renderSubViews, this);
      this.initialize = __bind(this.initialize, this);
      this.getTemplateData = __bind(this.getTemplateData, this);
      this.postRender = __bind(this.postRender, this);
      this.preRender = __bind(this.preRender, this);
      this.postInitialize = __bind(this.postInitialize, this);
      this.preInitialize = __bind(this.preInitialize, this);
      _ref = Base.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Base.prototype.subViews = [];

    Base.prototype.isGlobalView = false;

    Base.prototype.name = '';

    Base.prototype.preInitialize = function() {};

    Base.prototype.postInitialize = function() {};

    Base.prototype.preRender = function() {};

    Base.prototype.postRender = function() {};

    Base.prototype.getTemplateData = function() {
      return {};
    };

    Base.prototype.initialize = function(data) {
      var element,
        _this = this;
      this.preInitialize();
      _.each(data, function(datumValue, datumKey) {
        return _this.set(datumKey, datumValue);
      });
      element = $(this.elSelector);
      this.setElement(element);
      return this.postInitialize();
    };

    Base.prototype.renderSubViews = function() {
      var _this = this;
      return _.each(this.subViews, function(subView) {
        return subView.render();
      });
    };

    Base.prototype.getTemplateName = function() {
      return 'bb/template/' + this.name + '.html';
    };

    Base.prototype.getTemplateSource = function() {
      var templateName;
      templateName = this.getTemplateName();
      return window["Fishing"]["Template"][templateName];
    };

    Base.prototype.renderTemplate = function() {
      var data, element, html, source;
      source = this.getTemplateSource();
      data = this.getTemplateData();
      html = source(data);
      element = $(this.elSelector);
      this.setElement(element);
      return this.$el.html(html);
    };

    Base.prototype.addSubView = function(subView) {
      return this.subViews.push(subView);
    };

    Base.prototype.set = function(key, value) {
      return this[key] = value;
    };

    Base.prototype.addSubViewByDefinition = function(subViewDefinition, data) {
      var subView, subViewClass, subViewClassName;
      data = data || {};
      data.name = subViewDefinition.name;
      data.elSelector = subViewDefinition.elSelector;
      subViewClassName = 'Fishing.View.' + Fishing.Helper.Utils.capitalize(data.name);
      subViewClass = Fishing.Helper.Utils.stringToFunction(subViewClassName);
      subView = new subViewClass(data);
      return this.addSubView(subView);
    };

    Base.prototype.render = function() {
      this.preRender();
      this.renderTemplate();
      this.renderSubViews();
      return this.postRender();
    };

    Base.prototype.teardownSubViews = function() {
      var _this = this;
      _.each(this.subViews, function(subView) {
        return subView._teardown();
      });
      return this.subViews = [];
    };

    Base.prototype._teardown = function() {
      this.$el.html('');
      return this.$el.remove();
    };

    return Base;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Fishing.View.Home = (function(_super) {
    __extends(Home, _super);

    function Home() {
      this.drawMap = __bind(this.drawMap, this);
      this.postRender = __bind(this.postRender, this);
      this.getTemplateData = __bind(this.getTemplateData, this);
      _ref = Home.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Home.prototype.googleMap = null;

    Home.prototype.getTemplateData = function() {
      return {
        appName: Fishing.Constants.appName
      };
    };

    Home.prototype.postRender = function() {
      return this.drawMap();
    };

    Home.prototype.drawMap = function() {
      var element, mapCenter, options,
        _this = this;
      mapCenter = Fishing.Constants.homeMap.center;
      options = {
        center: new google.maps.LatLng(mapCenter.latitude, mapCenter.longitude),
        zoom: Fishing.Constants.homeMap.zoomLevel
      };
      element = document.getElementById('homeMap');
      this.googleMap = new google.maps.Map(element, options);
      return Fishing.Helper.APIUtils.getLocations(function(locations) {
        return _.each(locations, function(location) {
          var latLng, marker;
          latLng = new google.maps.LatLng(location.latitude, location.longitude);
          marker = new google.maps.Marker({
            position: latLng,
            map: _this.googleMap
          });
          return google.maps.event.addListener(marker, 'click', function() {
            return Fishing.Global.router.navigate('report/' + location.locationId, {
              trigger: true
            });
          });
        });
      });
    };

    return Home;

  })(Fishing.View.Base);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Fishing.View.MainLayout = (function(_super) {
    __extends(MainLayout, _super);

    function MainLayout() {
      this.getTemplateData = __bind(this.getTemplateData, this);
      _ref = MainLayout.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    MainLayout.prototype.getTemplateData = function() {
      return {
        appName: Fishing.Constants.appName
      };
    };

    return MainLayout;

  })(Fishing.View.Base);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Fishing.View.Report = (function(_super) {
    __extends(Report, _super);

    function Report() {
      this.drawPrecipitationDataChart = __bind(this.drawPrecipitationDataChart, this);
      this.drawUSGSDataCharts = __bind(this.drawUSGSDataCharts, this);
      this.drawChart = __bind(this.drawChart, this);
      this.getPrecipitationDataArray = __bind(this.getPrecipitationDataArray, this);
      this.getUSGSDataArray = __bind(this.getUSGSDataArray, this);
      this.getUSGSGageHeightDataArray = __bind(this.getUSGSGageHeightDataArray, this);
      this.getUSGSFlowRateDataArray = __bind(this.getUSGSFlowRateDataArray, this);
      this.getChartTitle = __bind(this.getChartTitle, this);
      this.fetchLocationData = __bind(this.fetchLocationData, this);
      this.postRender = __bind(this.postRender, this);
      this.postInitialize = __bind(this.postInitialize, this);
      this.getTemplateData = __bind(this.getTemplateData, this);
      _ref = Report.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Report.prototype.location = null;

    Report.prototype.usgsData = null;

    Report.prototype.precipitationData = null;

    Report.prototype.getTemplateData = function() {
      return {
        location: this.location.attributes
      };
    };

    Report.prototype.postInitialize = function() {
      this.location = new Fishing.Model.Location();
      this.location.on('change', this.render);
      return this.fetchLocationData();
    };

    Report.prototype.postRender = function() {
      if (this.usgsData !== null) {
        this.drawUSGSDataCharts();
      }
      if (this.precipitationData !== null) {
        return this.drawPrecipitationDataChart();
      }
    };

    Report.prototype.fetchLocationData = function() {
      var _this = this;
      Fishing.Helper.APIUtils.fetchData('location', {
        locationId: this.locationId
      }, function(responseData) {
        return _this.location.set(responseData);
      });
      Fishing.Helper.APIUtils.fetchData('usgsData', {
        locationId: this.locationId
      }, function(responseData) {
        _this.usgsData = responseData;
        return _this.drawUSGSDataCharts();
      });
      return Fishing.Helper.APIUtils.fetchData('precipitationData', {
        locationId: this.locationId
      }, function(responseData) {
        _this.precipitationData = responseData;
        return _this.drawPrecipitationDataChart();
      });
    };

    Report.prototype.getChartTitle = function() {
      return 'Stream flow';
    };

    Report.prototype.getUSGSFlowRateDataArray = function() {
      return this.getUSGSDataArray(Fishing.Constants.paramIds.flowRate, 'Stream Flow');
    };

    Report.prototype.getUSGSGageHeightDataArray = function() {
      return this.getUSGSDataArray(Fishing.Constants.paramIds.gageHeight, 'Gage Height');
    };

    Report.prototype.getUSGSDataArray = function(paramId, dataLabel) {
      var data,
        _this = this;
      data = [['Date/Time', dataLabel]];
      _.each(this.usgsData, function(datum) {
        var datumForArray;
        if (datum.paramId === paramId) {
          datumForArray = [datum.localDateTime, parseFloat(datum.value)];
          return data.push(datumForArray);
        }
      });
      return data;
    };

    Report.prototype.getPrecipitationDataArray = function() {
      var data,
        _this = this;
      data = [['Date', 'Precipitation (inches)']];
      _.each(this.precipitationData, function(datum) {
        var datumForArray;
        datumForArray = [datum.date, parseFloat(datum.precipitationInches)];
        return data.push(datumForArray);
      });
      return data;
    };

    Report.prototype.drawChart = function(dataArray, title, elementId) {
      var chart, chartElement, data, options;
      if (dataArray.length < 2) {
        flLog('empty data for chart: ' + title);
        return;
      }
      data = google.visualization.arrayToDataTable(dataArray);
      options = {
        title: title,
        curveType: 'function',
        legend: {
          position: 'bottom'
        }
      };
      chartElement = document.getElementById(elementId);
      chart = new google.visualization.LineChart(chartElement);
      return chart.draw(data, options);
    };

    Report.prototype.drawUSGSDataCharts = function() {
      return this.drawChart(this.getUSGSGageHeightDataArray(), 'Gage Height', 'usgsGageHeightChart');
    };

    Report.prototype.drawPrecipitationDataChart = function() {
      return this.drawChart(this.getPrecipitationDataArray(), 'Precipitation', 'precipitationDataChart');
    };

    return Report;

  })(Fishing.View.Base);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Fishing.View.SampleReport = (function(_super) {
    __extends(SampleReport, _super);

    function SampleReport() {
      _ref = SampleReport.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return SampleReport;

  })(Fishing.View.Base);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Fishing.Model.Base = (function(_super) {
    __extends(Base, _super);

    function Base() {
      _ref = Base.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return Base;

  })(Backbone.Model);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Fishing.Model.Location = (function(_super) {
    __extends(Location, _super);

    function Location() {
      _ref = Location.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return Location;

  })(Fishing.Model.Base);

}).call(this);
