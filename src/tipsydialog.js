(function () {

    function TipsyDialog() {

        const overlayId = "td-overlay";
        const confirmId = "td-yes";
        const abortId = "td-no";
        const inputId = "td-input";
        const inputErrorId = "td-input-error";

        const id = id => document.getElementById(id);
        const noop = () => {
        };

        let clickListener = null;

        this.spin = function (message) {
            createDialog({
                hideConfirm: true,
                showAbort: false,
                spin: true,
                message: message
            });
        };

        this.stopSpinning = function () {
            closeDialog();
        };

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
                rightAlignBtns: true,
                isPrompt: true,
                promptInvalidTxt: config.promptInvalidTxt,
                placeholder: config.placeholder,
                showAbort: config.hideAbort !== true,
                message: config.message,
                html: config.html,
                confirmBtnTxt: config.confirmBtnTxt,
                abortBtnTxt: config.abortBtnTxt,
                validateCb: config.validate,
                processCb: config.process,
                confirmCb: config.confirm,
                abortCb: config.abort,
            });
        };

        let createDialog = config => {
            if (id(overlayId) !== null) {
                throw Error("TipsyDialog already open");
            }
            const centerOrFlex = (config.spin || !config.showAbort) ? centerCss : flexCss;
            const padding = (config.spin || !config.showAbort) ? "padding-top: 40px" : "";
            const spinMargin = config.spin ? "margin: 24px 0 16px" : "";
            document.body.insertAdjacentHTML("beforeEnd", `
              <div id="${overlayId}" style="${overlayCss}">
                <div style="${dialogCss + padding}">
                  ${config.message ? `<div style="${messageCss + centerOrFlex}">${config.message}</div>` : config.html }
                  ${config.isPrompt ? `<input id="${inputId}" style="${inputCss}" type="text" placeholder="${config.placeholder || "Enter something"}">` : "" }
                  ${config.isPrompt ? `<div id="${inputErrorId}" style="${inputErrorCss}">${config.promptInvalidTxt}</div>` : ""}
                  <div style="${containerCss + centerOrFlex + spinMargin}">
                    ${config.spin ? spinner : ""}
                    ${config.showAbort ? `<div id="${abortId}" style="${defaultBtnCss}">${config.abortBtnTxt || "Cancel"}</div>` : ""}
                    ${!config.hideConfirm ? `<div id="${confirmId}" style="${confirmBtnCss}">${config.confirmBtnTxt || "Ok"}</div>` : ""}
                  </div>
                </div>
              </div>
            `);
            clickListener = e => {
                if (config.isPrompt) {
                    setInputValid(true);
                }
                const val = config.isPrompt ? id(inputId).value : "";
                if (confirmId === e.target.id) {
                    if (typeof config.validateCb === "function") {
                        if (!config.validateCb.call(this, val)) {
                            return setInputValid(false);
                        }
                    }
                    if (typeof config.processCb === "function") {
                        return config.processCb.call(this, val, processCallback)
                    }
                    (config.confirmCb || noop).call(this, val);
                    closeDialog();
                }
                if (abortId === e.target.id) {
                    (config.abortCb || noop).call();
                    closeDialog();
                }

                function processCallback(success) {
                    if (!success) {
                        return setInputValid(false);
                    }
                    (config.confirmCb || noop).call(this, val);
                    closeDialog();
                }
            };
            openDialog();
        };

        function setInputValid(valid) {
            id(inputId).style.borderBottomColor = valid ? "#007ACE" : "#FA0634";
            id(inputErrorId).style.visibility = valid ? "hidden" : "visible";
        }

        function openDialog() {
            if (id(inputId) !== null) {
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
            font: 15px arial;
            position: fixed;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            background: #fff;
            color: #444;
            padding: 24px;
            margin: 0 auto;
            left: 0;
            right: 0;
            width: calc(100% - 30px);
            max-width: 400px;
            border-radius: 3px;
            min-height: 160px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        `;

        const messageCss = `
            font: 18px arial;
            font-weight: 700;
        `;

        const inputCss = `
            margin: 40px 0 8px;
            width: 100%;
            height: 24px;
            border: 0;
            border-bottom: 2px solid #007ace;
            font: 16px arial;
            outline: 0;
        `;

        const inputErrorCss = `
            color: #FA0634;
            font-size: 13px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            visibility: hidden;
        `;

        const containerCss = `
            margin: 24px 0 0;
            justify-content: flex-end;
        `;

        const defaultBtnCss = `
            border-radius: 3px;
            font: 16px arial;
            padding: 9px 16px;
            color: #333;
            font-weight: 700;
            background: #eee;
            display: inline-block;
            cursor: pointer;
            margin-right: 8px;
            min-width: 88px;
            text-align: center;
        `;

        const centerCss = `
            text-align: center;
        `;

        const flexCss = `
            display: flex;
        `;

        const confirmBtnCss = `
            ${defaultBtnCss}
            margin-right: 0;
            color: #fff;
            background: #007ace;
        `;

        const spinner = `
            <?xml version="1.0" encoding="utf-8"?>
            <svg width="40px" height="40px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" r="40" stroke="#007ace" fill="none" stroke-width="7" stroke-linecap="round">
                    <animate attributeName="stroke-dashoffset" dur="1.5s" repeatCount="indefinite" from="502" to="0"></animate>
                    <animate attributeName="stroke-dasharray" dur="1.5s" repeatCount="indefinite" values="150.6 100.4;1 250;150.6 100.4"></animate>
                </circle>
            </svg>
        `;

    }

    window.TipsyDialog = new TipsyDialog();

})();
