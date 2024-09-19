/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "rbx/107/clinicalresearcher/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("rbx.107.clinicalresearcher.Component", {
            metadata: {
                manifest: "json",
                config:{
                fullWidth:true,
                fullHeight:true
            }
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
                // sap.ui.getCore().applyTheme("sap_belize_plus")
            }
        });
    }
);