/*
dhtmlxScheduler.Net v.3.1.2 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e.form_blocks.multiselect={render:function(e){for(var t="<div class='dhx_multi_select_"+e.name+"' style='overflow: auto; height: "+e.height+"px; position: relative;' >",a=0;a<e.options.length;a++)t+="<label><input type='checkbox' value='"+e.options[a].key+"'/>"+e.options[a].label+"</label>",convertStringToBoolean(e.vertical)&&(t+="<br/>");return t+="</div>"},set_value:function(t,a,n,i){function s(e){for(var a=t.getElementsByTagName("input"),n=0;n<a.length;n++)a[n].checked=!!e[a[n].value]
}for(var r=t.getElementsByTagName("input"),d=0;d<r.length;d++)r[d].checked=!1;var o=[];if(n[i.map_to]){for(var _=(n[i.map_to]+"").split(","),d=0;d<_.length;d++)o[_[d]]=!0;s(o)}else{if(e._new_event||!i.script_url)return;var l=document.createElement("div");l.className="dhx_loading",l.style.cssText="position: absolute; top: 40%; left: 40%;",t.appendChild(l),dhtmlxAjax.get(i.script_url+"?dhx_crosslink_"+i.map_to+"="+n.id+"&uid="+e.uid(),function(e){for(var a=e.doXPath("//data/item"),n=[],r=0;r<a.length;r++)n[a[r].getAttribute(i.map_to)]=!0;
s(n),t.removeChild(l)})}},get_value:function(e){for(var t=[],a=e.getElementsByTagName("input"),n=0;n<a.length;n++)a[n].checked&&t.push(a[n].value);return t.join(",")},focus:function(){}}});