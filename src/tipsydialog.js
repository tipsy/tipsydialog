(function () {

    function TipsyDialog() {

        const overlayId = "td-overlay";
        const confirmId = "td-yes";
        const abortId = "td-no";
        const inputId = "td-input";

        const id = id => document.getElementById(id);
        const noop = () => {
        };

        let clickListener = null;

        this.alert = function (message) {
            createDialog({
                showAbort: false,
                message: message,
                confirmBtnTxt: "Ok",
            });
        };

        this.confirm = function (config) {
            createDialog({
                showAbort: config.hideAbort !== true,
                message: config.message,
                html: config.html,
                confirmBtnTxt: config.confirmBtnTxt,
                abortBtnTxt: config.abortBtnTxt,
                confirmCb: config.confirm,
                abortCb: config.abort,
            });
        };

        this.prompt = function (config) {
            createDialog({
                isPrompt: true,
                placeholder: config.placeholder,
                showAbort: config.hideAbort !== true,
                message: config.message,
                html: config.html,
                confirmBtnTxt: config.confirmBtnTxt,
                abortBtnTxt: config.abortBtnTxt,
                confirmCb: config.confirm,
                abortCb: config.abort,
            });
        };

        let createDialog = config => {
            if (id(overlayId) !== null) {
                throw Error("TipsyDialog already open");
            }
            document.body.insertAdjacentHTML("beforeEnd", `
              <div id="${overlayId}" style="${overlayCss}">
                <div style="${dialogCss}">
                  ${config.message ? `<div style="${messageCss}">${config.message}</div>` : config.html }
                  ${config.isPrompt ? `<input id="${inputId}" style="${inputCss}" type="text" placeholder="${config.placeholder || "Enter something"}">` : "" }
                  <div style="${buttonWrapCss}">
                    ${config.showAbort ? `<div id="${abortId}" style="${defaultBtnCss}">${config.abortBtnTxt || "No"}</div>` : ''}
                    <div id="${confirmId}" style="${confirmBtnCss}">${config.confirmBtnTxt || "Yes"}</div>
                  </div>
                </div>
              </div>
            `);
            clickListener = e => {
                const val = config.isPrompt ? id(inputId).value : "";
                if (confirmId === e.target.id) {
                    (config.confirmCb || noop).call(this, val);
                    closeDialog();
                }
                if (abortId === e.target.id) {
                    (config.abortCb || noop).call();
                    closeDialog();
                }
            };
            openDialog()
        };

        function openDialog() {
            if(id(inputId) !== null) {
                id(inputId).focus();
            }
            document.addEventListener("click", clickListener);
            setTimeout(() => id(overlayId).style.opacity = "1", 50);
        }

        function closeDialog() {
            document.removeEventListener("click", clickListener);
            if (id(overlayId) !== null) {
                id(overlayId).style.opacity = "0";
                setTimeout(() => document.body.removeChild(id(overlayId)), 200);
            }
        }

        const overlayCss = `
            position: fixed;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            z-index: 9999999999;
            background: rgba(0,0,0,0.4);
            opacity: 0;
            transition: opacity .2s;
        `;

        const dialogCss = `
            box-sizing: border-box;
            font: 15px arial;
            position: fixed;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            background: #fff;
            color: #444;
            padding: 20px;
            margin: 0 auto;
            left: 0;
            right: 0;
            width: calc(100% - 30px);
            max-width: 400px;
            border-radius: 3px;
        `;

        const messageCss = `
            box-sizing: border-box;
            font: 18px arial;
            font-weight: 700;
            text-align: center;
            margin: 25px 2%;
        `;

        const inputCss = `
            box-sizing: border-box;
            width: 96%;
            height: 40px;
            border: 0;
            border-bottom: 2px solid #007ace;
            margin: 0 2% 20px;
            font: 16px arial;
            outline: 0;
        `;

        const buttonWrapCss = `
            box-sizing: border-box;
            text-align: center;
            margin: 15px 0;
        `;

        const defaultBtnCss = `
            box-sizing: border-box;
            border-radius: 3px;
            font: 16px arial;
            padding: 10px 15px;
            color: #fff;
            font-weight: 700;
            background: #999;
            width: 45%;
            margin: 0 2%;
            display: inline-block;
            text-align: center;
            cursor: pointer;
        `;

        const confirmBtnCss = `
            ${defaultBtnCss}
            background: #007ace;
        `;

    }

    window.TipsyDialog = new TipsyDialog();

})();
