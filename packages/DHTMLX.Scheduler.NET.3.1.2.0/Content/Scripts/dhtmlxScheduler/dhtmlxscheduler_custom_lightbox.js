/*
dhtmlxScheduler.Net v.3.1.2 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e.initCustomLightbox=function(t,i,n){function s(){if(!i._lightbox){var e=i._getLightbox(),n=e.childNodes[1];e.className.indexOf("dhx_cal_light_wide")>=0?n.lastChild.firstChild.style.display="none":n.firstChild.style.display="none",n.style.height=n.style.height.replace("px","")-25+"px",e.style.height=e.style.height.replace("px","")-50+"px",e.style.width=+t.width+10+"px",n.style.width=t.width+"px"}return i._lightbox}var a={initial:0,load_data:1,save_data:2},r=n+"_here_iframe_";
i.config.buttons_left=[],i.config.buttons_right=[],i._getLightbox=i.getLightbox,i.config.lightbox.sections=[{type:"frame",name:"box"}],i._cust_string_to_date=function(e){return i.templates.xml_date(e)},i._cust_date_to_str=function(e){return i.templates.xml_format(e)},i._deep_copy=function(t){if("object"==typeof t){if("[object Date]"==Object.prototype.toString.call(t))var i=new Date(t);else if("[object Array]"==Object.prototype.toString.call(t))var i=new Array;else var i=new Object;for(var n in t)i[n]=e._deep_copy(t[n])
}else var i=t;return i},"external"==t.type?(i.attachEvent("onBeforeLightbox",function(){return i._custom_box_stage=0,!0}),i.getLightbox=s,i._setLightboxValues=function(e,n){var e=document.getElementById(r);try{switch(i._custom_box_stage){case a.initial:if(!i.dataProcessor){var s=i.dataProcessor=new DataProcessor;s.init(i)}var s=i.dataProcessor||s,d=s._getRowData(n),o=-1===(t.view||"").indexOf("?")?"?":"&",l="<form action='/"+t.view+o+"id="+encodeURIComponent(n)+"' method='POST'>";for(var _ in d)l+="<input type='hidden' name='"+_+"'/>";
if(l+="</form>",e.Document)var h=e.Document.body;else var h=e.contentDocument.body;h.innerHTML=l;var c=0;for(var _ in d)h.firstChild.childNodes[c++].value=d[_];h.firstChild.submit();break;case a.load_data:if(!e.contentWindow.lightbox){{e.contentWindow}e.contentWindow.lightbox={close:function(){i._remove_customBox()}}}i.callEvent("onLightbox",[n]);break;case a.save_data:if(!e)return;var u=e.contentWindow;if(!u||!u.response_data)return;i._doLAction(u.response_data),i._remove_customBox()}}catch(f){i._remove_customBox(),window.console&&console.log(f)
}i._custom_box_stage++},i._remove_customBox=function(){i._lightbox?i.endLightbox(!1,i._lightbox):i.endLightbox(!1),i.callEvent("onAfterLightbox",[])},i._doLAction=function(e){try{if(!e)return;var t=e.data;t.start_date&&t.end_date&&(t.start_date=i._cust_string_to_date(e.data.start_date),t.end_date=i._cust_string_to_date(e.data.end_date));var n=e.action;switch(e.action){case"insert":i._loading=!0,i.addEvent(t),i._loading=!1,n="inserted";break;case"update":var s=i.getEvent(e.sid);for(var a in t)s[a]=t[a];
i.event_updated(s),i.updateEvent(e.sid),n="updated";break;case"delete":i.deleteEvent(e.sid,!0),n="deleted"}i.dataProcessor.callEvent("onAfterUpdate",[e.sid,n,e.id,e])}catch(r){}},i.form_blocks.frame={onload:function(e,t,i){i._setLightboxValues(e,t)},render:function(){return"<div style='display:inline-block; height:"+t.height+"px'></div>"},set_value:function(e,s,a){i._last_id=a.id;var d='<iframe id="'+r+'" frameborder="0" onload="'+n+".form_blocks.frame.onload(this, "+n+"._last_id, "+n+');" src=""';
return(t.width||t.height)&&(d+=" style='"),t.width&&(d+="width:"+t.width+"px;",e.style.width=t.width+"px"),t.height&&(d+="height:"+t.height+"px;",e.style.height=t.height+"px"),(t.width||t.height)&&(d+=" '"),d+="><html></html></iframe>",e.innerHTML=d,t.className&&(e.className=t.className),!0},get_value:function(){return!0},focus:function(){return!0}}):(i.form_blocks.frame={render:function(){var e='<iframe  id="'+n+"_here_iframe_\" onload='"+n+"._addLightboxInterface(this)' frameborder='0' src='"+t.view+"'";
return(t.width||t.height)&&(e+=" style='"),t.width&&(e+="width:"+t.width+"px;"),t.height&&(e+="height:"+t.height+"px;"),(t.width||t.height)&&(e+=" '"),e+=" ></iframe>"},set_value:function(e,t,i){if(e.contentWindow&&e.contentWindow.setValues){if(1==e.contentWindow.document.getElementsByTagName("form").length)e.contentWindow.document.getElementsByTagName("form")[0].reset();else{var i=e.contentWindow.getValues();for(var n in i)i[n]="";e.contentWindow.setValues(i)}e.contentWindow.setValues(i)}},get_value:function(e){return i._deep_copy(e.contentWindow.getValues())
},focus:function(){return!0}},i.getLightbox=s,i._addLightboxInterface=function(e){if(e.contentWindow.lightbox||(e.contentWindow.lightbox={}),e.contentWindow.lightbox.save=function(){var t=i.getEvent(i.getState().lightbox_id),n=e.contentWindow.getValues();for(var s in n)t[s]=n[s];i.endLightbox(!0,i._lightbox)},e.contentWindow.lightbox.close=function(){i.endLightbox(!1,i._lightbox)},e.contentWindow.lightbox.remove=function(){var e=i.locale.labels.confirm_deleting;(!e||confirm(e))&&(i.deleteEvent(i._lightbox_id),i._new_event=null),i.endLightbox(!0,i._lightbox)
},1==e.contentWindow.document.getElementsByTagName("form").length)e.contentWindow.document.getElementsByTagName("form")[0].reset();else if(e.contentWindow.getValues&&e.contentWindow.setValues){var t=e.contentWindow.getValues();for(var n in t)t[n]="";e.contentWindow.setValues(t)}e.contentWindow.setValues&&e.contentWindow.setValues(i.getEvent(i._lightbox_id)),i.callEvent("onLightbox",[i._lightbox_id])})}});