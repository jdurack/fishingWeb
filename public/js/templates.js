this["Fishing"] = this["Fishing"] || {};
this["Fishing"]["Template"] = this["Fishing"]["Template"] || {};

this["Fishing"]["Template"]["bb/template/home.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "Welcome to ";
  if (stack1 = helpers.appName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.appName); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n\n<div id='homeMap' style='height: 500px;'/>";
  return buffer;
  });

this["Fishing"]["Template"]["bb/template/mainLayout.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"navigation\" class=\"navbar navbar-default navbar-fixed-top\">\n  <div class=\"container\">\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\" href=\"#\"><b>";
  if (stack1 = helpers.appName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.appName); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</b></a>\n    </div>\n    <div class=\"navbar-collapse collapse\">\n      <ul class=\"nav navbar-nav\">\n        <li class=\"active\"><a href=\"#\">Some link</a></li>\n      </ul>\n    </div><!--/.nav-collapse -->\n  </div>\n</div>\n\n<div class=\"container\">\n  <div class=\"row centered\">\n\n    <div id='fishingAppContent'></div>\n\n  </div>\n</div>\n\n<div class='footer'>\n  <div class=\"container\">\n    <p>";
  if (stack1 = helpers.appName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.appName); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n  </div>\n</div>";
  return buffer;
  });

this["Fishing"]["Template"]["bb/template/report.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h1>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.location)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h1>\n\n<!--\n<div id='usgsFlowRateChart' class='dataChart'></div>\n-->\n<div id='usgsGageHeightChart' class='dataChart'></div>\n<div id='precipitationDataChart' class='dataChart'></div>";
  return buffer;
  });