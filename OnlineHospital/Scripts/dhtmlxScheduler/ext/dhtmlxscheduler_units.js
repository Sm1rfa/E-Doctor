/*
dhtmlxScheduler.Net v.3.1.2 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e._props={},e.createUnitsView=function(t,a,n,i,r,s){"object"==typeof t&&(n=t.list,a=t.property,i=t.size||0,r=t.step||1,s=t.skip_incorrect,t=t.name),e._props[t]={map_to:a,options:n,step:r,position:0},i>e._props[t].options.length&&(e._props[t]._original_size=i,i=0),e._props[t].size=i,e._props[t].skip_incorrect=s||!1,e.date[t+"_start"]=e.date.day_start,e.templates[t+"_date"]=function(t){return e.templates.day_date(t)},e._get_unit_index=function(t,a){var n=t.position||0,i=Math.floor((e._correct_shift(+a,1)-+e._min_date)/864e5);
return n+i},e.templates[t+"_scale_text"]=function(e,t,a){return a.css?"<span class='"+a.css+"'>"+t+"</span>":t},e.templates[t+"_scale_date"]=function(a){var n=e._props[t],i=n.options;if(!i.length)return"";var r=e._get_unit_index(n,a),s=i[r];return e.templates[t+"_scale_text"](s.key,s.label,s)},e.date["add_"+t]=function(t,a){return e.date.add(t,a,"day")},e.date["get_"+t+"_end"]=function(a){return e.date.add(a,e._props[t].size||e._props[t].options.length,"day")},e.attachEvent("onOptionsLoad",function(){for(var a=e._props[t],n=a.order={},i=a.options,r=0;r<i.length;r++)n[i[r].key]=r;
a._original_size&&0===a.size&&(a.size=a._original_size,delete a.original_size),a.size>i.length?(a._original_size=a.size,a.size=0):a.size=a._original_size||a.size,e._date&&e._mode==t&&e.setCurrentView(e._date,e._mode)}),e["mouse_"+t]=function(t){var a=e._props[this._mode];if(a){t=this._week_indexes_from_pos(t),this._drag_event||(this._drag_event={}),this._drag_id&&this._drag_mode&&(this._drag_event._dhx_changed=!0);var n=Math.min(t.x+a.position,a.options.length-1);t.section=(a.options[n]||{}).key,t.x=0;
var i=this.getEvent(this._drag_id);this._update_unit_section({view:a,event:i,pos:t})}return t.force_redraw=!0,t},e.callEvent("onOptionsLoad",[])},e._update_unit_section=function(e){var t=e.view,a=e.event,n=e.pos;a&&(a[t.map_to]=n.section)},e.scrollUnit=function(t){var a=e._props[this._mode];a&&(a.position=Math.min(Math.max(0,a.position+t),a.options.length-a.size),this.update_view())},function(){var t=function(t){var a=e._props[e._mode];if(a&&a.order&&a.skip_incorrect){for(var n=[],i=0;i<t.length;i++)"undefined"!=typeof a.order[t[i][a.map_to]]&&n.push(t[i]);
t.splice(0,t.length),t.push.apply(t,n)}return t},a=e._pre_render_events_table;e._pre_render_events_table=function(e,n){return e=t(e),a.apply(this,[e,n])};var n=e._pre_render_events_line;e._pre_render_events_line=function(e,a){return e=t(e),n.apply(this,[e,a])};var i=function(t,a){if(t&&"undefined"==typeof t.order[a[t.map_to]]){var n=e,i=864e5,r=Math.floor((a.end_date-n._min_date)/i);return a[t.map_to]=t.options[Math.min(r+t.position,t.options.length-1)].key,!0}},r=e._reset_scale,s=e.is_visible_events;
e.is_visible_events=function(t){var a=s.apply(this,arguments);if(a){var n=e._props[this._mode];if(n&&n.size){var i=n.order[t[n.map_to]];if(i<n.position||i>=n.size+n.position)return!1}}return a},e._reset_scale=function(){var t=e._props[this._mode],a=r.apply(this,arguments);if(t){this._max_date=this.date.add(this._min_date,1,"day");for(var n=this._els.dhx_cal_data[0].childNodes,i=0;i<n.length;i++)n[i].className=n[i].className.replace("_now","");if(t.size&&t.size<t.options.length){var s=this._els.dhx_cal_header[0],d=document.createElement("DIV");
t.position&&(d.className="dhx_cal_prev_button",d.style.cssText="left:1px;top:2px;position:absolute;",d.innerHTML="&nbsp;",s.firstChild.appendChild(d),d.onclick=function(){e.scrollUnit(-1*t.step)}),t.position+t.size<t.options.length&&(d=document.createElement("DIV"),d.className="dhx_cal_next_button",d.style.cssText="left:auto; right:0px;top:2px;position:absolute;",d.innerHTML="&nbsp;",s.lastChild.appendChild(d),d.onclick=function(){e.scrollUnit(t.step)})}}return a};var d=e._get_event_sday;e._get_event_sday=function(t){var a=e._props[this._mode];
return a?(i(a,t),a.order[t[a.map_to]]-a.position):d.call(this,t)};var o=e.locate_holder_day;e.locate_holder_day=function(t,a,n){var r=e._props[this._mode];return r&&n?(i(r,n),1*r.order[n[r.map_to]]+(a?1:0)-r.position):o.apply(this,arguments)};var _=e._time_order;e._time_order=function(t){var a=e._props[this._mode];a?t.sort(function(e,t){return a.order[e[a.map_to]]>a.order[t[a.map_to]]?1:-1}):_.apply(this,arguments)},e.attachEvent("onEventAdded",function(t,a){if(this._loading)return!0;for(var n in e._props){var i=e._props[n];
"undefined"==typeof a[i.map_to]&&(a[i.map_to]=i.options[0].key)}return!0}),e.attachEvent("onEventCreated",function(t,a){var n=e._props[this._mode];if(n&&a){var r=this.getEvent(t),s=this._mouse_coords(a);this._update_unit_section({view:n,event:r,pos:s}),i(n,r),this.event_updated(r)}return!0})}()});