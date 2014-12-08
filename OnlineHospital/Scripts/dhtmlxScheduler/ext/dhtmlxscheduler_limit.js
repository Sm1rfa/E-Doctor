/*
dhtmlxScheduler.Net v.3.1.2 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e.config.limit_start=null,e.config.limit_end=null,e.config.limit_view=!1,e.config.check_limits=!0,e.config.mark_now=!0,e.config.display_marked_timespans=!0,e._temp_limit_scope=function(){function t(t,i,n,a,s){var r=e,d=[],o={_props:"map_to",matrix:"y_property"};for(var l in o){var _=o[l];if(r[l])for(var h in r[l]){var c=r[l][h],u=c[_];t[u]&&(d=r._add_timespan_zones(d,e._get_blocked_zones(i[h],t[u],n,a,s)))}}return d=r._add_timespan_zones(d,e._get_blocked_zones(i,"global",n,a,s))
}var i=null,n="dhx_time_block",a="default",s=function(e,t,i){return t instanceof Date&&i instanceof Date?(e.start_date=t,e.end_date=i):(e.days=t,e.zones=i),e},r=function(e,t,i){var a="object"==typeof e?e:{days:e};return a.type=n,a.css="",t&&(i&&(a.sections=i),a=s(a,e,t)),a};e.blockTime=function(t,i,n){var a=r(t,i,n);return e.addMarkedTimespan(a)},e.unblockTime=function(t,i,n){i=i||"fullday";var a=r(t,i,n);return e.deleteMarkedTimespan(a)},e.attachEvent("onBeforeViewChange",function(t,i,n,a){return e.config.limit_view&&(a=a||i,n=n||t,a.valueOf()>e.config.limit_end.valueOf()||this.date.add(a,1,n)<=e.config.limit_start.valueOf())?(setTimeout(function(){e.setCurrentView(i||e.config.limit_start,n)
},1),!1):!0}),e.checkInMarkedTimespan=function(i,n,s){n=n||a;for(var r=!0,d=new Date(i.start_date.valueOf()),o=e.date.add(d,1,"day"),l=e._marked_timespans;d<i.end_date;d=e.date.date_part(o),o=e.date.add(d,1,"day")){var _=+e.date.date_part(new Date(d)),h=d.getDay(),c=t(i,l,h,_,n);if(c)for(var u=0;u<c.length;u+=2){var v=e._get_zone_minutes(d),f=i.end_date>o||i.end_date.getDate()!=d.getDate()?1440:e._get_zone_minutes(i.end_date),g=c[u],m=c[u+1];if(f>g&&m>v&&(r="function"==typeof s?s(i,v,f,g,m):!1,!r))break
}}return!r};var d=e.checkLimitViolation=function(t){if(!t)return!0;if(!e.config.check_limits)return!0;var i=e,a=i.config,s=[];if(t.rec_type)for(var r=e.getRecDates(t),d=0;d<r.length;d++){var o=e._copy_event(t);e._lame_copy(o,r[d]),s.push(o)}else s=[t];for(var l=!0,_=0;_<s.length;_++){var h=!0,o=s[_];o._timed=e.isOneDayEvent(o),h=a.limit_start&&a.limit_end?o.start_date.valueOf()>=a.limit_start.valueOf()&&o.end_date.valueOf()<=a.limit_end.valueOf():!0,h&&(h=!e.checkInMarkedTimespan(o,n,function(e,t,n,a,s){var r=!0;
return s>=t&&t>=a&&((1440==s||s>n)&&(r=!1),e._timed&&i._drag_id&&"new-size"==i._drag_mode?(e.start_date.setHours(0),e.start_date.setMinutes(s)):r=!1),(n>=a&&s>n||a>t&&n>s)&&(e._timed&&i._drag_id&&"new-size"==i._drag_mode?(e.end_date.setHours(0),e.end_date.setMinutes(a)):r=!1),r})),h||(h=i.checkEvent("onLimitViolation")?i.callEvent("onLimitViolation",[o.id,o]):h),l=l&&h}return l||(i._drag_id=null,i._drag_mode=null),l};e._get_blocked_zones=function(e,t,i,n,a){var s=[];if(e&&e[t])for(var r=e[t],d=this._get_relevant_blocked_zones(i,n,r,a),o=0;o<d.length;o++)s=this._add_timespan_zones(s,d[o].zones);
return s},e._get_relevant_blocked_zones=function(e,t,i,n){var a=i[t]&&i[t][n]?i[t][n]:i[e]&&i[e][n]?i[e][n]:[];return a},e.attachEvent("onMouseDown",function(e){return!(e==n)}),e.attachEvent("onBeforeDrag",function(t){return t?d(e.getEvent(t)):!0}),e.attachEvent("onClick",function(t){return d(e.getEvent(t))}),e.attachEvent("onBeforeLightbox",function(t){var n=e.getEvent(t);return i=[n.start_date,n.end_date],d(n)}),e.attachEvent("onEventSave",function(t,i){if(!i.start_date||!i.end_date){var n=e.getEvent(t);
i.start_date=new Date(n.start_date),i.end_date=new Date(n.end_date)}if(i.rec_type){var a=e._lame_clone(i);return e._roll_back_dates(a),d(a)}return d(i)}),e.attachEvent("onEventAdded",function(t){if(!t)return!0;var i=e.getEvent(t);return!d(i)&&e.config.limit_start&&e.config.limit_end&&(i.start_date<e.config.limit_start&&(i.start_date=new Date(e.config.limit_start)),i.start_date.valueOf()>=e.config.limit_end.valueOf()&&(i.start_date=this.date.add(e.config.limit_end,-1,"day")),i.end_date<e.config.limit_start&&(i.end_date=new Date(e.config.limit_start)),i.end_date.valueOf()>=e.config.limit_end.valueOf()&&(i.end_date=this.date.add(e.config.limit_end,-1,"day")),i.start_date.valueOf()>=i.end_date.valueOf()&&(i.end_date=this.date.add(i.start_date,this.config.event_duration||this.config.time_step,"minute")),i._timed=this.isOneDayEvent(i)),!0
}),e.attachEvent("onEventChanged",function(t){if(!t)return!0;var n=e.getEvent(t);if(!d(n)){if(!i)return!1;n.start_date=i[0],n.end_date=i[1],n._timed=this.isOneDayEvent(n)}return!0}),e.attachEvent("onBeforeEventChanged",function(e){return d(e)}),e.attachEvent("onBeforeEventCreated",function(t){var i=e.getActionData(t).date,n={_timed:!0,start_date:i,end_date:e.date.add(i,e.config.time_step,"minute")};return d(n)}),e.attachEvent("onViewChange",function(){e._mark_now()}),e.attachEvent("onSchedulerResize",function(){return window.setTimeout(function(){e._mark_now()
},1),!0}),e.attachEvent("onTemplatesReady",function(){e._mark_now_timer=window.setInterval(function(){e._is_initialized()&&e._mark_now()},6e4)}),e._mark_now=function(t){var i="dhx_now_time";this._els[i]||(this._els[i]=[]);var n=e._currentDate(),a=this.config;if(e._remove_mark_now(),!t&&a.mark_now&&n<this._max_date&&n>this._min_date&&n.getHours()>=a.first_hour&&n.getHours()<a.last_hour){var s=this.locate_holder_day(n);this._els[i]=e._append_mark_now(s,n)}},e._append_mark_now=function(t,i){var n="dhx_now_time",a=e._get_zone_minutes(i),s={zones:[a,a+1],css:n,type:n};
if(!this._table_view){if(this._props&&this._props[this._mode]){for(var r=this._els.dhx_cal_data[0].childNodes,d=[],o=0;o<r.length-1;o++){var l=t+o;s.days=l;var _=e._render_marked_timespan(s,null,l)[0];d.push(_)}return d}return s.days=t,e._render_marked_timespan(s,null,t)}return"month"==this._mode?(s.days=+e.date.date_part(i),e._render_marked_timespan(s,null,null)):void 0},e._remove_mark_now=function(){for(var e="dhx_now_time",t=this._els[e],i=0;i<t.length;i++){var n=t[i],a=n.parentNode;a&&a.removeChild(n)
}this._els[e]=[]},e._marked_timespans={global:{}},e._get_zone_minutes=function(e){return 60*e.getHours()+e.getMinutes()},e._prepare_timespan_options=function(t){var i=[],n=[];if("fullweek"==t.days&&(t.days=[0,1,2,3,4,5,6]),t.days instanceof Array){for(var s=t.days.slice(),r=0;r<s.length;r++){var d=e._lame_clone(t);d.days=s[r],i.push.apply(i,e._prepare_timespan_options(d))}return i}if(!t||!(t.start_date&&t.end_date&&t.end_date>t.start_date||void 0!==t.days&&t.zones))return i;var o=0,l=1440;"fullday"==t.zones&&(t.zones=[o,l]),t.zones&&t.invert_zones&&(t.zones=e.invertZones(t.zones)),t.id=e.uid(),t.css=t.css||"",t.type=t.type||a;
var _=t.sections;if(_){for(var h in _)if(_.hasOwnProperty(h)){var c=_[h];c instanceof Array||(c=[c]);for(var r=0;r<c.length;r++){var u=e._lame_copy({},t);u.sections={},u.sections[h]=c[r],n.push(u)}}}else n.push(t);for(var v=0;v<n.length;v++){var f=n[v],g=f.start_date,m=f.end_date;if(g&&m)for(var p=e.date.date_part(new Date(g)),x=e.date.add(p,1,"day");m>p;){var u=e._lame_copy({},f);delete u.start_date,delete u.end_date,u.days=p.valueOf();var y=g>p?e._get_zone_minutes(g):o,b=m>x||m.getDate()!=p.getDate()?l:e._get_zone_minutes(m);
u.zones=[y,b],i.push(u),p=x,x=e.date.add(x,1,"day")}else f.days instanceof Date&&(f.days=e.date.date_part(f.days).valueOf()),f.zones=t.zones.slice(),i.push(f)}return i},e._get_dates_by_index=function(t,i,n){var a=[];i=e.date.date_part(new Date(i||e._min_date)),n=new Date(n||e._max_date);for(var s=i.getDay(),r=t-s>=0?t-s:7-i.getDay()+t,d=e.date.add(i,r,"day");n>d;d=e.date.add(d,1,"week"))a.push(d);return a},e._get_css_classes_by_config=function(e){var t=[];return e.type==n&&(t.push(n),e.css&&t.push(n+"_reset")),t.push("dhx_marked_timespan",e.css),t.join(" ")
},e._get_block_by_config=function(e){var t=document.createElement("DIV");return e.html&&("string"==typeof e.html?t.innerHTML=e.html:t.appendChild(e.html)),t},e._render_marked_timespan=function(t,i,n){var a=[],s=e.config,r=this._min_date,d=this._max_date,o=!1;if(!s.display_marked_timespans)return a;if(!n&&0!==n){if(t.days<7)n=t.days;else{var l=new Date(t.days);if(o=+l,!(+d>+l&&+l>=+r))return a;n=l.getDay()}var _=r.getDay();_>n?n=7-(_-n):n-=_}var h=t.zones,c=e._get_css_classes_by_config(t);if(e._table_view&&"month"==e._mode){var u=[],v=[];
if(i)u.push(i),v.push(n);else{v=o?[o]:e._get_dates_by_index(n);for(var f=0;f<v.length;f++)u.push(this._scales[v[f]])}for(var f=0;f<u.length;f++){i=u[f],n=v[f];var g=Math.floor((this._correct_shift(n,1)-r.valueOf())/(864e5*this._cols.length)),m=this.locate_holder_day(n,!1)%this._cols.length;if(!this._ignores[m]){var p=e._get_block_by_config(t),x=Math.max(i.offsetHeight-1,0),y=Math.max(i.offsetWidth-1,0),b=this._colsS[m],w=this._colsS.heights[g]+(this._colsS.height?this.xy.month_scale_height+2:2)-1;
p.className=c,p.style.top=w+"px",p.style.lineHeight=p.style.height=x+"px";for(var E=0;E<h.length;E+=2){var D=h[f],k=h[f+1];if(D>=k)return[];var L=p.cloneNode(!0);L.style.left=b+Math.round(D/1440*y)+"px",L.style.width=Math.round((k-D)/1440*y)+"px",i.appendChild(L),a.push(L)}}}}else{var N=n;if(this._ignores[this.locate_holder_day(n,!1)])return a;if(this._props&&this._props[this._mode]&&t.sections&&t.sections[this._mode]){var M=this._props[this._mode];N=M.order[t.sections[this._mode]],M.size&&N>M.position+M.size&&(N=0)
}i=i?i:e.locate_holder(N);for(var f=0;f<h.length;f+=2){var D=Math.max(h[f],60*s.first_hour),k=Math.min(h[f+1],60*s.last_hour);if(D>=k){if(f+2<h.length)continue;return[]}var L=e._get_block_by_config(t);L.className=c;var O=24*this.config.hour_size_px+1,S=36e5;L.style.top=Math.round((60*D*1e3-this.config.first_hour*S)*this.config.hour_size_px/S)%O+"px",L.style.lineHeight=L.style.height=Math.max(Math.round(60*(k-D)*1e3*this.config.hour_size_px/S)%O,1)+"px",i.appendChild(L),a.push(L)}}return a},e.markTimespan=function(t){var i=e._prepare_timespan_options(t);
if(i.length){for(var n=[],a=0;a<i.length;a++){var s=i[a],r=e._render_marked_timespan(s,null,null);r.length&&n.push.apply(n,r)}return n}},e.unmarkTimespan=function(e){if(e)for(var t=0;t<e.length;t++){var i=e[t];i.parentNode&&i.parentNode.removeChild(i)}},e._marked_timespans_ids={},e.addMarkedTimespan=function(t){var i=e._prepare_timespan_options(t),n="global";if(i.length){var a=i[0].id,s=e._marked_timespans,r=e._marked_timespans_ids;r[a]||(r[a]=[]);for(var d=0;d<i.length;d++){var o=i[d],l=o.days,_=(o.zones,o.css,o.sections),h=o.type;
if(o.id=a,_){for(var c in _)if(_.hasOwnProperty(c)){s[c]||(s[c]={});var u=_[c],v=s[c];v[u]||(v[u]={}),v[u][l]||(v[u][l]={}),v[u][l][h]||(v[u][l][h]=[],e._marked_timespans_types||(e._marked_timespans_types={}),e._marked_timespans_types[h]||(e._marked_timespans_types[h]=!0));var f=v[u][l][h];o._array=f,f.push(o),r[a].push(o)}}else{s[n][l]||(s[n][l]={}),s[n][l][h]||(s[n][l][h]=[]),e._marked_timespans_types||(e._marked_timespans_types={}),e._marked_timespans_types[h]||(e._marked_timespans_types[h]=!0);
var f=s[n][l][h];o._array=f,f.push(o),r[a].push(o)}}return a}},e._add_timespan_zones=function(e,t){var i=e.slice();if(t=t.slice(),!i.length)return t;for(var n=0;n<i.length;n+=2)for(var a=i[n],s=i[n+1],r=n+2==i.length,d=0;d<t.length;d+=2){var o=t[d],l=t[d+1];if(l>s&&s>=o||a>o&&l>=a)i[n]=Math.min(a,o),i[n+1]=Math.max(s,l),n-=2;else{if(!r)continue;var _=a>o?0:2;i.splice(n+_,0,o,l)}t.splice(d--,2);break}return i},e._subtract_timespan_zones=function(e,t){for(var i=e.slice(),n=0;n<i.length;n+=2)for(var a=i[n],s=i[n+1],r=0;r<t.length;r+=2){var d=t[r],o=t[r+1];
if(o>a&&s>d){var l=!1;a>=d&&o>=s&&i.splice(n,2),d>a&&(i.splice(n,2,a,d),l=!0),s>o&&i.splice(l?n+2:n,l?0:2,o,s),n-=2;break}}return i},e.invertZones=function(t){return e._subtract_timespan_zones([0,1440],t.slice())},e._delete_marked_timespan_by_id=function(t){var i=e._marked_timespans_ids[t];if(i)for(var n=0;n<i.length;n++)for(var a=i[n],s=a._array,r=0;r<s.length;r++)if(s[r]==a){s.splice(r,1);break}},e._delete_marked_timespan_by_config=function(t){var i=e._marked_timespans,n=t.sections,s=t.days,r=t.type||a,d=[];
if(n){for(var o in n)if(n.hasOwnProperty(o)&&i[o]){var l=n[o];i[o][l]&&i[o][l][s]&&i[o][l][s][r]&&(d=i[o][l][s][r])}}else i.global[s]&&i.global[s][r]&&(d=i.global[s][r]);for(var _=0;_<d.length;_++){var h=d[_],c=e._subtract_timespan_zones(h.zones,t.zones);if(c.length)h.zones=c;else{d.splice(_,1),_--;for(var u=e._marked_timespans_ids[h.id],v=0;v<u.length;v++)if(u[v]==h){u.splice(v,1);break}}}},e.deleteMarkedTimespan=function(t){if(arguments.length||(e._marked_timespans={global:{}},e._marked_timespans_ids={},e._marked_timespans_types={}),"object"!=typeof t)e._delete_marked_timespan_by_id(t);
else{t.start_date&&t.end_date||(t.days||(t.days="fullweek"),t.zones||(t.zones="fullday"));var i=[];if(t.type)i.push(t.type);else for(var n in e._marked_timespans_types)i.push(n);for(var a=e._prepare_timespan_options(t),s=0;s<a.length;s++)for(var r=a[s],d=0;d<i.length;d++){var o=e._lame_clone(r);o.type=i[d],e._delete_marked_timespan_by_config(o)}}},e._get_types_to_render=function(t,i){var n=t?e._lame_copy({},t):{};for(var a in i||{})i.hasOwnProperty(a)&&(n[a]=i[a]);return n},e._get_configs_to_render=function(e){var t=[];
for(var i in e)e.hasOwnProperty(i)&&t.push.apply(t,e[i]);return t},e.attachEvent("onScaleAdd",function(t,i){if(!e._table_view||"month"==e._mode){var n=i.getDay(),a=i.valueOf(),s=this._mode,r=e._marked_timespans,d=[];if(this._props&&this._props[s]){var o=this._props[s],l=o.options,_=e._get_unit_index(o,i),h=l[_];if(i=e.date.date_part(new Date(this._date)),n=i.getDay(),a=i.valueOf(),r[s]&&r[s][h.key]){var c=r[s][h.key],u=e._get_types_to_render(c[n],c[a]);d.push.apply(d,e._get_configs_to_render(u))}}var v=r.global,f=v[a]||v[n];
d.push.apply(d,e._get_configs_to_render(f));for(var g=0;g<d.length;g++)e._render_marked_timespan(d[g],t,i)}}),e.dblclick_dhx_marked_timespan=function(t,i){e.config.dblclick_create||e.callEvent("onScaleDblClick",[e.getActionData(t).date,i,t]),e.addEventNow(e.getActionData(t).date,null,t)}},e._temp_limit_scope()});