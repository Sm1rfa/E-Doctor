/*
dhtmlxScheduler.Net v.3.1.2 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e.attachEvent("onTemplatesReady",function(){var t,n=new dhtmlDragAndDropObject,a=n.stopDrag;n.stopDrag=function(e){return t=e||event,a.apply(this,arguments)},n.addDragLanding(e._els.dhx_cal_data[0],{_drag:function(n,a,i,s){if(!e.checkEvent("onBeforeExternalDragIn")||e.callEvent("onBeforeExternalDragIn",[n,a,i,s,t])){var r=e.attachEvent("onEventCreated",function(a){e.callEvent("onExternalDragIn",[a,n,t])||(this._drag_mode=this._drag_id=null,this.deleteEvent(a))}),d=e.getActionData(t),o={start_date:new Date(d.date)};
if(e.matrix&&e.matrix[e._mode]){var _=e.matrix[e._mode];o[_.y_property]=d.section;var l=e._locate_cell_timeline(t);o.start_date=_._trace_x[l.x],o.end_date=e.date.add(o.start_date,_.x_step,_.x_unit)}e._props&&e._props[e._mode]&&(o[e._props[e._mode].map_to]=d.section),e.addEventNow(o),e.detachEvent(r)}},_dragIn:function(e){return e},_dragOut:function(){return this}})})});