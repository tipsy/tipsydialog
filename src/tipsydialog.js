(function () {

    function TipsyDialog() {

        const overlayId = "td-overlay";
        const confirmId = "td-yes";
        const abortId = "td-no";
        const inputId = "td-input";
        const inputErrorId = "td-input-error";

        const id = id => document.getElementById(id);

        let clickListener = null;
        let confirmSpinning = false;

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
            return createDialog({
                showAbort: config.hideAbort !== true,
                message: config.message,
                html: config.html,
                confirmBtnTxt: config.confirmBtnTxt || "Confirm",
                abortBtnTxt: config.abortBtnTxt || "Cancel",
            });
        };

        this.prompt = function (config) {
            return createDialog({
                isPrompt: true,
                inputType: config.inputType || "text",
                promptInvalidTxt: config.promptInvalidTxt,
                placeholder: config.placeholder || "Enter something",
                showAbort: config.hideAbort !== true,
                message: config.message,
                html: config.html,
                confirmBtnTxt: config.confirmBtnTxt || "Ok",
                abortBtnTxt: config.abortBtnTxt || "Cancel",
                validateCb: config.validate,
                processCb: config.process,
            });
        };

        let createDialog = c => {
            if (id(overlayId) !== null) {
                throw Error("TipsyDialog already open");
            }
            const centerOrFlex = (c.spin || !c.showAbort) ? centerCss : flexCss;
            const padding = (c.spin || !c.showAbort) ? "padding-top: 40px" : "";
            const spinMargin = c.spin ? "margin: 24px 0 16px" : "";
            document.body.insertAdjacentHTML("beforeEnd", `
              <div id="${overlayId}" style="${overlayCss}">
                <div style="${dialogCss + padding}">
                  ${c.message ? `<div style="${messageCss + centerOrFlex}">${c.message}</div>` : c.html }
                  ${c.isPrompt ? `<input id="${inputId}" style="${inputCss}" type="${c.inputType}" placeholder="${c.placeholder}">
                                       <div id="${inputErrorId}" style="${inputErrorCss}">${c.promptInvalidTxt}</div>` : "" }
                  <div style="${containerCss + centerOrFlex + spinMargin}">
                    ${c.spin ? spinner(40, "#007ACE") : ""}
                    ${c.showAbort ? `<div id="${abortId}" style="${defaultBtnCss}">${c.abortBtnTxt}</div>` : ""}
                    ${!c.hideConfirm ? `<div id="${confirmId}" style="${confirmBtnCss}">${c.confirmBtnTxt}</div>` : ""}
                  </div>
                </div>
              </div>
            `);
            return new Promise((resolve, reject) => {
                clickListener = e => {
                    if (confirmSpinning) {
                        return;
                    }
                    setInputValid(true);
                    const val = c.isPrompt ? id(inputId).value : "";
                    if (confirmId === e.target.id) {
                        if (typeof c.validateCb === "function" && !c.validateCb.call(this, val)) {
                            return setInputValid(false);
                        }
                        if (typeof c.processCb === "function") {
                            setBtnSpinState(true);
                            c.processCb.call(this, val).then(() => {
                                resolve(val);
                                closeDialog();
                            }).catch(() => {
                                setBtnSpinState(false, c.confirmBtnTxt);
                                setInputValid(false);
                            });
                        } else {
                            resolve(val);
                            closeDialog();
                        }
                    }
                    if (abortId === e.target.id) {
                        reject();
                        closeDialog();
                    }
                };
                openDialog();
            });
        };

        function setInputValid(valid) {
            if (id(inputId) !== null) {
                id(inputId).style.borderBottomColor = valid ? "#007ACE" : "#FA0634";
                id(inputErrorId).style.visibility = valid ? "hidden" : "visible";
            }
        }

        function setBtnSpinState(spin, text) {
            confirmSpinning = spin;
            id(confirmId).style.width = id(confirmId).getBoundingClientRect().width; // maintain width
            id(confirmId).innerHTML = spin ? spinner(20, "#fff") : text;
        }

        function openDialog() {
            if (id(inputId) !== null) {
                id(inputId).focus();
            }
            document.addEventListener("click", clickListener);
            setTimeout(() => id(overlayId).style.opacity = "1", 50);
        }

        function closeDialog() {
            confirmSpinning = false;
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
            user-select: none;
            border-radius: 3px;
            font: 16px arial;
            padding: 00 16px;
            color: #333;
            font-weight: 700;
            background: #eee;
            display: inline-block;
            cursor: pointer;
            margin-right: 8px;
            min-width: 88px;
            height: 36px;
            display: inline-flex;
            align-items: center;
            justify-content: space-around;
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

        const spinner = (size, color) => `
            <?xml version="1.0" encoding="utf-8"?>
            <svg width="${size}px" height="${size}px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" r="40" stroke="${color}" fill="none" stroke-width="10" stroke-linecap="round">
                    <animate attributeName="stroke-dashoffset" dur="1.5s" repeatCount="indefinite" from="500" to="0"></animate>
                    <animate attributeName="stroke-dasharray" dur="1.5s" repeatCount="indefinite" values="150 100;1 250;150 100"></animate>
                </circle>
            </svg>
        `;

    }

    window.TipsyDialog = new TipsyDialog();

})();
