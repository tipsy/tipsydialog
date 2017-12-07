"use strict";!function(){window.TipsyDialog=new function(){function n(n){null!==d(a)&&(d(a).style.borderBottomColor=n?"#007ACE":"#FA0634",d(s).style.visibility=n?"hidden":"visible")}function t(n,t){p=n,d(r).style.width=d(r).getBoundingClientRect().width,d(r).innerHTML=n?B(20,"#fff"):t}function i(){p=!1,document.removeEventListener("click",l),null!==d(o)&&(d(o).style.opacity="0",setTimeout(function(){return document.body.removeChild(d(o))},200))}var e=this,o="td-overlay",r="td-yes",a="td-input",s="td-input-error",d=function(n){return document.getElementById(n)},l=null,p=!1;this.spin=function(n){c({hideConfirm:!0,showAbort:!1,spin:!0,message:n})},this.stopSpinning=function(){i()},this.alert=function(n){c({showAbort:!1,message:n,confirmBtnTxt:"Ok"})},this.confirm=function(n){return c({showAbort:!0!==n.hideAbort,message:n.message,html:n.html,confirmBtnTxt:n.confirmBtnTxt||"Confirm",abortBtnTxt:n.abortBtnTxt||"Cancel"})},this.prompt=function(n){return c({isPrompt:!0,inputType:n.inputType||"text",promptInvalidTxt:n.promptInvalidTxt,placeholder:n.placeholder||"Enter something",showAbort:!0!==n.hideAbort,message:n.message,html:n.html,charLimit:n.charLimit,confirmBtnTxt:n.confirmBtnTxt||"Ok",abortBtnTxt:n.abortBtnTxt||"Cancel",validateCb:n.validate,processCb:n.process})};var c=function(c){if(null!==d(o))throw Error("TipsyDialog already open");var A=c.spin||!c.showAbort?w:T,k=c.spin||!c.showAbort?"padding-top: 40px":"",L=c.spin?"margin: 24px 0 16px":"";return document.body.insertAdjacentHTML("beforeEnd",'\n              <div id="'+o+'" style="'+u+'">\n                <div style="'+(f+k)+'">\n                  '+(c.message?'<div style="'+(m+A)+'">'+c.message+"</div>":c.html)+"\n                  "+(c.isPrompt?'<div style="'+h+'"><input id="'+a+'" style="'+x+'" type="'+c.inputType+'" placeholder="'+c.placeholder+'">\n                                       <div id="'+s+'" style="'+v+'">'+c.promptInvalidTxt+"</div>\n                                       "+(c.charLimit?'<span style="'+g+'"><span id="td-count">0</span>/'+c.charLimit+"</span></div>":""):"")+'\n                  <div style="'+(y+A+L)+'">\n                    '+(c.spin?B(40,"#007ACE"):"")+"\n                    "+(c.showAbort?'<div id="td-no" style="'+b+'">'+c.abortBtnTxt+"</div>":"")+"\n                    "+(c.hideConfirm?"":'<div id="'+r+'" style="'+C+'">'+c.confirmBtnTxt+"</div>")+"\n                  </div>\n                </div>\n              </div>\n            "),new Promise(function(s,u){l=function(o){if(!p){n(!0);var l=c.isPrompt?d(a).value:"";if(r===o.target.id){if("function"==typeof c.validateCb&&!c.validateCb.call(e,l))return n(!1);"function"==typeof c.processCb?(t(!0),c.processCb.call(e,l).then(function(){s(l),i()}).catch(function(){t(!1,c.confirmBtnTxt),n(!1)})):(s(l),i())}"td-no"===o.target.id&&(u(),i())}},null!==d(a)&&d(a).focus(),document.addEventListener("click",l),setTimeout(function(){return d(o).style.opacity="1"},50)})};document.addEventListener("input",function(n){n.target.id===a&&(d("td-count").innerHTML=n.target.value.length)});var u="\n            position: fixed;\n            height: 100%;\n            width: 100%;\n            top: 0;\n            left: 0;\n            z-index: 9999999999;\n            background: rgba(0,0,0,0.4);\n            opacity: 0;\n            transition: opacity .2s;\n        ",f="\n            font: 15px arial;\n            position: fixed;\n            left: 0;\n            top: 50%;\n            transform: translateY(-50%);\n            background: #fff;\n            color: #444;\n            padding: 24px;\n            margin: 0 auto;\n            left: 0;\n            right: 0;\n            width: calc(100% - 30px);\n            max-width: 400px;\n            border-radius: 3px;\n            min-height: 160px;\n            display: flex;\n            flex-direction: column;\n            justify-content: space-between;\n        ",m="\n            font: 18px arial;\n            font-weight: 700;\n        ",h="\n            position: relative;\n        ",x="\n            margin: 40px 0 8px;\n            width: 100%;\n            height: 24px;\n            border: 0;\n            border-bottom: 2px solid #007ace;\n            font: 16px arial;\n            outline: 0;\n        ",g="\n            position: absolute;\n            right: 0;\n            bottom: 0;\n            font-size: 13px;\n        ",v="\n            color: #FA0634;\n            font-size: 13px;\n            overflow: hidden;\n            white-space: nowrap;\n            text-overflow: ellipsis;\n            visibility: hidden;\n        ",y="\n            margin: 24px 0 0;\n            justify-content: flex-end;\n        ",b="\n            user-select: none;\n            border-radius: 3px;\n            font: 16px arial;\n            padding: 00 16px;\n            color: #333;\n            font-weight: 700;\n            background: #eee;\n            display: inline-block;\n            cursor: pointer;\n            margin-right: 8px;\n            min-width: 88px;\n            height: 36px;\n            display: inline-flex;\n            align-items: center;\n            justify-content: space-around;\n        ",w="\n            text-align: center;\n        ",T="\n            display: flex;\n        ",C="\n            "+b+"\n            margin-right: 0;\n            color: #fff;\n            background: #007ace;\n        ",B=function(n,t){return'\n            <?xml version="1.0" encoding="utf-8"?>\n            <svg width="'+n+'px" height="'+n+'px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">\n                <circle cx="50" cy="50" r="40" stroke="'+t+'" fill="none" stroke-width="10" stroke-linecap="round">\n                    <animate attributeName="stroke-dashoffset" dur="1.5s" repeatCount="indefinite" from="500" to="0"></animate>\n                    <animate attributeName="stroke-dasharray" dur="1.5s" repeatCount="indefinite" values="150 100;1 250;150 100"></animate>\n                </circle>\n            </svg>\n        '}}}();