(function () {

    function TipsyDialog() {

        this.alert = function (message) {
            createDialog({
                showAbort: false,
                message: message,
                confirmBtm: "Ok",
            });
        };

        this.confirm = function (config) {
            createDialog({
                showAbort: config.hideAbort !== true,
                message: config.message,
                confirmBtm: config.confirmBtm,
                abortBtn: config.abortBtn,
                confirm: config.confirm,
                abort: config.abort,
            });
        };

        let createDialog = config => {

            if (document.getElementById("td-overlay") !== null) {
                throw Error("TipsyDialog already open");
            }

            document.body.insertAdjacentHTML("beforeEnd", `
              <div id="td-overlay" style="${overlayCss}">
                <div style="${dialogCss}">
                  <div style="${messageCss}">${config.message}</div>
                  <div style="${buttonWrapCss}">
                    ${config.showAbort ? `<div id="td-no" style="${defaultBtnCss}">${config.abortBtn || "No"}</div>` : ''}
                    <div id="td-yes" style="${confirmBtnCss}">${config.confirmBtm || "Yes"}</div>
                  </div>
                </div>
              </div>
            `);

            setTimeout(() => document.getElementById("td-overlay").style.opacity = "1", 50);
            document.getElementById("td-yes").addEventListener("click", () => {
                closeDialog();
                if (config.confirm) {
                    config.confirm();
                }
            });

            if (config.showAbort) {
                document.getElementById("td-no").addEventListener("click", () => {
                    closeDialog();
                    if (config.abort) {
                        config.abort();
                    }
                });
            }

            function closeDialog() {
                if (document.getElementById("td-overlay") !== null) {
                    document.getElementById("td-overlay").style.opacity = "0";
                    setTimeout(() => document.body.removeChild(document.getElementById("td-overlay")), 200);
                }
            }

        };

        let overlayCss = `
            box-sizing: border-box;
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

        let dialogCss = `
            box-sizing: border-box;
            font: 15px arial;
            position: fixed;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            background: #fff;
            color: #444;
            padding: 10px;
            margin: 0 auto;
            left: 0;
            right: 0;
            width: calc(100% - 30px);
            max-width: 400px;
            border-radius: 3px;
        `;

        let messageCss = `
            box-sizing: border-box;
            font: 18px arial;
            font-weight: 700;
            text-align: center;
            margin: 25px 2%;
        `;

        let buttonWrapCss = `
            box-sizing: border-box;
            text-align: center;
        `;

        let defaultBtnCss = `
            box-sizing: border-box;
            border-radius: 3px;
            font: 16px arial;
            padding: 10px 15px;
            color: #fff;
            font-weight: 700;
            background: #999;
            width: 45%;
            margin: 0px 2% 15px;
            display: inline-block;
            text-align: center;
            cursor: pointer;
        `;

        let confirmBtnCss = `
            ${defaultBtnCss}
            background: #007ace;
        `;

    }

    window.TipsyDialog = new TipsyDialog();

})();
