sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",

], function (
    Controller,
    MessageToast
) {
    "use strict";

    return Controller.extend("rbx.107.clinicalresearcher.controller.View2", {
        onInit() {
            this._owner = this.getOwnerComponent().getModel();
            this._route = this.getOwnerComponent().getRouter();
            this._route.getRoute("RouteView2").attachPatternMatched(this._oRoutes, this);
        },
        _oRoutes(oEvent) {
            var sPath = window.decodeURIComponent(oEvent.getParameter("arguments").path);
            this.getView().bindElement({ path: sPath })
        },
        _onEditChange(id) {
            this.byId("save").setVisible(id)
            this.byId("can").setVisible(id)
            this.byId("dis").setVisible(id)
            this.byId("smartform").setEditable(id)
            this.byId("smartform1").setEditable(id)
            this.byId("smartform2").setEditable(id)
            this.byId("smartform3").setEditable(id)
            this.byId("smartform4").setEditable(id)
        },
        onEdit(oEvent) {
            this._onEditChange(true);
        },
        onSave(oEvent) {
            this._owner.submitChanges({
                success: (oData) => {
                    this._route.navTo("RouteView1")
                    MessageToast.show("Data Updated successfully")
                    this._onEditChange(false)
                },
                error: (oError) => {
                    MessageToast.show("Error", oError)
                }
            })
        },
        onCan(oEvent) {
            this._onEditChange(false)
        },
        onDiscard() {
            this._owner.resetChanges()
        }
    });
});