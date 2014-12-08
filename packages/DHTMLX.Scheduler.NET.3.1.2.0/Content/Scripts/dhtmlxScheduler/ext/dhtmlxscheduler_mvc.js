/*
dhtmlxScheduler.Net v.3.1.2 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){!function(){function t(e){var t={};for(var n in e)0!==n.indexOf("_")&&(t[n]=e[n]);return d.use_id||delete t.id,t}function n(){clearTimeout(r),r=setTimeout(function(){e.updateView()},1)}function a(e){e._loading=!0,e._not_render=!0,e.callEvent("onXLS",[])}function i(e){e._not_render=!1,e._render_wait&&e.render_view_data(),e._loading=!1,e.callEvent("onXLE",[])}function s(e){return d.use_id?e.id:e.cid}var r,d={use_id:!1};e.backbone=function(r,o){function _(){l.length&&(e.parse(l,"json"),l=[])
}o&&(d=o),r.bind("change",function(t){var a=s(t),i=e._events[a]=t.toJSON();i.id=a,e._init_event(i),n()}),r.bind("remove",function(t){var n=s(t);e._events[n]&&e.deleteEvent(n)});var l=[];r.bind("add",function(t){var n=s(t);if(!e._events[n]){var a=t.toJSON();a.id=n,e._init_event(a),l.push(a),1==l.length&&setTimeout(_,1)}}),r.bind("request",function(t){t instanceof Backbone.Collection&&a(e)}),r.bind("sync",function(t){t instanceof Backbone.Collection&&i(e)}),r.bind("error",function(t){t instanceof Backbone.Collection&&i(e)
}),e.attachEvent("onEventCreated",function(t){var n=new r.model(e.getEvent(t));return e._events[t]=n.toJSON(),e._events[t].id=t,!0}),e.attachEvent("onEventAdded",function(n){if(!r.get(n)){var a=t(e.getEvent(n)),i=new r.model(a),d=s(i);d!=n&&this.changeEventId(n,d),r.add(i),r.trigger("scheduler:add",i)}return!0}),e.attachEvent("onEventChanged",function(n){var a=r.get(n),i=t(e.getEvent(n));return a.set(i),r.trigger("scheduler:change",a),!0}),e.attachEvent("onEventDeleted",function(e){var t=r.get(e);
return t&&(r.trigger("scheduler:remove",t),r.remove(e)),!0})}}()});