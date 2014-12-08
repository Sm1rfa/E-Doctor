/*
dhtmlxScheduler.Net v.3.1.2 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e.load=function(e,t){var n;return"string"==typeof t&&(this._process=t,n=t,t=arguments[2]),this._load_url=e,this._after_call=t,e.$proxy?void e.load(this,"string"==typeof n?n:null):void this._load(e,this._date)},e._dp_init_backup=e._dp_init,e._dp_init=function(e){e._sendData=function(e,t){if(e){if(!this.callEvent("onBeforeDataSending",t?[t,this.getState(t),e]:[null,null,e]))return!1;if(t&&(this._in_progress[t]=(new Date).valueOf()),this.serverProcessor.$proxy){var n="POST"!=this._tMode?"get":"post",i=[];
for(var a in e)i.push({id:a,data:e[a],operation:this.getState(a)});return void this.serverProcessor._send(i,n,this)}var s=new dtmlXMLLoaderObject(this.afterUpdate,this,!0),r=this.serverProcessor+(this._user?getUrlSymbol(this.serverProcessor)+["dhx_user="+this._user,"dhx_version="+this.obj.getUserData(0,"version")].join("&"):"");"POST"!=this._tMode?s.loadXML(r+(-1!=r.indexOf("?")?"&":"?")+this.serialize(e,t)):s.loadXML(r,!0,this.serialize(e,t)),this._waitMode++}},e._updatesToParams=function(e){for(var t={},n=0;n<e.length;n++)t[e[n].id]=e[n].data;
return this.serialize(t)},e._processResult=function(e,t,n){if(200==n.status)t=new dtmlXMLLoaderObject(function(){},this,!0),t.loadXMLString(e),t.xmlDoc=n,this.afterUpdate(this,null,null,null,t);else for(var i in this._in_progress){var a=this.getState(i);this.afterUpdateCallback(i,i,a,null)}},this._dp_init_backup(e)},window.dataProcessor&&(dataProcessor.prototype.init=function(e){this.init_original(e),e._dataprocessor=this,this.setTransactionMode("POST",!0),this.serverProcessor.$proxy||(this.serverProcessor+=(-1!=this.serverProcessor.indexOf("?")?"&":"?")+"editing=true")
})});