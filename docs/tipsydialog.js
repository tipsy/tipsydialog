"use strict";!function(){window.TipsyDialog=new function(){function n(n){null!==d(a)&&(d(a).style.borderBottomColor=n?"#007ACE":"#FA0634",d(s).style.visibility=n?"hidden":"visible")}function t(n,t){c=n,d(r).style.width=d(r).getBoundingClientRect().width,d(r).innerHTML=n?B(20,"#fff"):t}function i(){c=!1,document.removeEventListener("click",l),null!==d(o)&&(d(o).style.opacity="0",setTimeout(function(){return document.body.removeChild(d(o))},200))}var e=this,o="td-overlay",r="td-yes",a="td-input",s="td-input-error",d=function(n){return document.getElementById(n)},l=null,c=!1;this.spin=function(n){p({hideConfirm:!0,showAbort:!1,spin:!0,message:n})},this.stopSpinning=function(){i()},this.alert=function(n){p({showAbort:!1,message:n,confirmBtnTxt:"Ok"})},this.confirm=function(n){return p({showAbort:!0!==n.hideAbort,message:n.message,html:n.html,confirmBtnTxt:n.confirmBtnTxt||"Confirm",abortBtnTxt:n.abortBtnTxt||"Cancel"})},this.prompt=function(n){return p({isPrompt:!0,inputType:n.inputType||"text",promptInvalidTxt:n.promptInvalidTxt,placeholder:n.placeholder||"Enter something",showAbort:!0!==n.hideAbort,message:n.message,charLimit:n.charLimit,confirmBtnTxt:n.confirmBtnTxt||"Ok",abortBtnTxt:n.abortBtnTxt||"Cancel",validateCb:n.validate,processCb:n.process})};var p=function(p){if(null!==d(o))throw Error("TipsyDialog already open");var A=p.spin||!p.showAbort?w:T,k=p.spin||!p.showAbort?"padding-top: 40px":"",L=p.spin?"margin: 24px 0 16px":"";return document.body.insertAdjacentHTML("beforeEnd",'\n              <div id="'+o+'" style="'+u+'">\n                <div style="'+(f+k)+'">\n                  '+(p.message?'<div style="'+(m+A)+'">'+p.message+"</div>":"<div>"+p.html+"</div>")+"\n                  "+(p.isPrompt?'<div style="'+h+'"><input id="'+a+'" style="'+x+'" type="'+p.inputType+'" placeholder="'+p.placeholder+'">\n                                       <div id="'+s+'" style="'+v+'">'+p.promptInvalidTxt+"</div>\n                                       "+(p.charLimit?'<span style="'+g+'"><span id="td-count">0</span>/'+p.charLimit+"</span></div>":""):"")+'\n                  <div style="'+(y+A+L)+'">\n                    '+(p.spin?B(40,"#007ACE"):"")+"\n                    "+(p.showAbort?'<div id="td-no" style="'+b+'">'+p.abortBtnTxt+"</div>":"")+"\n                    "+(p.hideConfirm?"":'<div id="'+r+'" style="'+C+'">'+p.confirmBtnTxt+"</div>")+"\n                  </div>\n                </div>\n              </div>\n            "),new Promise(function(s,u){l=function(o){if(!c){n(!0);var l=p.isPrompt?d(a).value:"";if(r===o.target.id){if("function"==typeof p.validateCb&&!p.validateCb.call(e,l))return n(!1);"function"==typeof p.processCb?(t(!0),p.processCb.call(e,l).then(function(){s(l),i()}).catch(function(){t(!1,p.confirmBtnTxt),n(!1)})):(s(l),i())}"td-no"===o.target.id&&(u(),i())}},null!==d(a)&&d(a).focus(),document.addEventListener("click",l),setTimeout(function(){return d(o).style.opacity="1"},50)})};document.addEventListener("input",function(n){n.target.id===a&&null!==d("td-count")&&(d("td-count").innerHTML=n.target.value.length)});var u="\n            position: fixed;\n            height: 100%;\n            width: 100%;\n            top: 0;\n            left: 0;\n            z-index: 9999999999;\n            background: rgba(0,0,0,0.4);\n            opacity: 0;\n            transition: opacity .2s;\n        ",f="\n            font: 15px arial;\n            position: fixed;\n            left: 0;\n            top: 50%;\n            transform: translateY(-50%);\n            background: #fff;\n            color: #444;\n            padding: 24px;\n            margin: 0 auto;\n            left: 0;\n            right: 0;\n            width: calc(100% - 30px);\n            max-width: 400px;\n            border-radius: 3px;\n            min-height: 160px;\n            display: flex;\n            flex-direction: column;\n            justify-content: space-between;\n        ",m="\n            font: 18px arial;\n            font-weight: 700;\n        ",h="\n            position: relative;\n        ",x="\n            margin: 40px 0 8px;\n            width: 100%;\n            height: 24px;\n            border: 0;\n            border-bottom: 2px solid #007ace;\n            font: 16px arial;\n            outline: 0;\n        ",g="\n            position: absolute;\n            right: 0;\n            bottom: 0;\n            font-size: 13px;\n        ",v="\n            color: #FA0634;\n            font-size: 13px;\n            overflow: hidden;\n            white-space: nowrap;\n            text-overflow: ellipsis;\n            visibility: hidden;\n        ",y="\n            margin: 24px 0 0;\n            justify-content: flex-end;\n        ",b="\n            user-select: none;\n            border-radius: 3px;\n            font: 16px arial;\n            padding: 00 16px;\n            color: #333;\n            font-weight: 700;\n            background: #eee;\n            display: inline-block;\n            cursor: pointer;\n            margin-right: 8px;\n            min-width: 88px;\n            height: 36px;\n            display: inline-flex;\n            align-items: center;\n            justify-content: space-around;\n        ",w="\n            text-align: center;\n        ",T="\n            display: flex;\n        ",C="\n            "+b+"\n            margin-right: 0;\n            color: #fff;\n            background: #007ace;\n        ",B=function(n,t){return'\n            <?xml version="1.0" encoding="utf-8"?>\n            <svg width="'+n+'px" height="'+n+'px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">\n                <circle cx="50" cy="50" r="40" stroke="'+t+'" fill="none" stroke-width="10" stroke-linecap="round">\n                    <animate attributeName="stroke-dashoffset" dur="1.5s" repeatCount="indefinite" from="500" to="0"></animate>\n                    <animate attributeName="stroke-dasharray" dur="1.5s" repeatCount="indefinite" values="150 100;1 250;150 100"></animate>\n                </circle>\n            </svg>\n        '}}}();