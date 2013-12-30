(function() {
  window.Fishing = {
    Collection: {},
    Decorator: {},
    Model: {},
    Template: {},
    View: {}
  };

  $(window).load(function() {
    var router;
    router = new Fishing.Router();
    return Backbone.history.start();
  });

}).call(this);

(function() {
  Fishing.Util = {
    capitalize: function(s) {
      return s[0].toUpperCase() + s.slice(1);
    },
    stringToFunction: function(str) {
      var arr, fn, i, _i, _ref;
      arr = str.split('.');
      fn = window;
      for (i = _i = 0, _ref = arr.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        fn = fn[arr[i]];
      }
      return fn;
    }
  };

}).call(this);

(function() {
  Fishing.Constants = {
    'some': 'thing'
  };

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
      this.report = __bind(this.report, this);
      this["default"] = __bind(this["default"], this);
      _ref = Router.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Router.prototype.mainLayout = null;

    Router.prototype.routes = {
      '': 'default',
      'report/:locationId': 'report'
    };

    Router.prototype["default"] = function() {
      return this.renderPage('home');
    };

    Router.prototype.report = function(locationId) {
      return this.renderPage('report', {
        locationId: locationId
      });
    };

    Router.prototype.setupMainLayout = function() {
      if (!this.mainLayout) {
        this.mainLayout = new Fishing.View.MainLayout({
          el: $('#fishingApp')
        });
        return this.mainLayout.name = 'mainLayout';
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
      this.getTemplateData = __bind(this.getTemplateData, this);
      this.postRender = __bind(this.postRender, this);
      this.preRender = __bind(this.preRender, this);
      _ref = Base.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Base.prototype.subViews = [];

    Base.prototype.isGlobalView = false;

    Base.prototype.name = '';

    Base.prototype.preRender = function() {};

    Base.prototype.postRender = function() {};

    Base.prototype.getTemplateData = function() {
      return {};
    };

    Base.prototype.renderSubViews = function() {
      var _this = this;
      console.log('renderSubViews, count: ' + this.subViews.length);
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
      var html, source;
      source = this.getTemplateSource();
      html = source(this.getTemplateData());
      return this.$el.html(html);
    };

    Base.prototype.addSubView = function(subView) {
      return this.subViews.push(subView);
    };

    Base.prototype.set = function(key, value) {
      return this[key] = value;
    };

    Base.prototype.addSubViewByDefinition = function(subViewDefinition, data) {
      var element, selector, subView, subViewClass, subViewClassName,
        _this = this;
      data = data || {};
      data.name = subViewDefinition.name;
      subViewClassName = 'Fishing.View.' + Fishing.Util.capitalize(data.name);
      subViewClass = Fishing.Util.stringToFunction(subViewClassName);
      subView = new subViewClass();
      _.each(data, function(datumValue, datumKey) {
        return subView.set(datumKey, datumValue);
      });
      selector = subViewDefinition.elSelector;
      element = this.isGlobalView ? $(selector) : this.$(selector);
      subView.setElement(element);
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
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Fishing.View.MainLayout = (function(_super) {
    __extends(MainLayout, _super);

    function MainLayout() {
      _ref = MainLayout.__super__.constructor.apply(this, arguments);
      return _ref;
    }

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
      this.fetchLocationData = __bind(this.fetchLocationData, this);
      this.postRender = __bind(this.postRender, this);
      _ref = Report.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Report.prototype.postRender = function() {
      return this.fetchLocationData();
    };

    Report.prototype.fetchLocationData = function() {
      return console.log('fetching data for locationId: ' + this.locationId);
    };

    return Report;

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
