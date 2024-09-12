sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/core/Fragment", "sap/m/MessageToast", "sap/ui/model/Filter"
],
    function (Controller, Fragment, MessageToast, Filter) {
        "use strict";

        return Controller.extend("rbx.107.clinicalresearcher.controller.View1", {
            onInit: function () {
                this._owner = this.getOwnerComponent().getModel();
                this._owner.setDeferredGroups(this._owner.getDeferredGroups().concat("create"))
                this._route = this.getOwnerComponent().getRouter();
                this.mDialog = {}
            },
            onFragmentLoad(path) {
                var oDialog = this.mDialog[path]
                if (!oDialog) {
                    return Fragment.load({
                        id: path,
                        name: path,
                        controller: this
                    }).then((oFrag) => {
                        this.getView().addDependent(oFrag);
                        this.mDialog[path] = oFrag
                        return oFrag
                    })
                } else {
                    return Promise.resolve(oDialog);
                }
            },
            onAdd() {
                var oContext = this._owner.createEntry("/CRGendata", { groupId: "create" })
                var sDialog = "add"
                var oDialog = this.mDialog[sDialog];
                if (!oDialog) {
                    this.onFragmentLoad("rbx.107.clinicalresearcher.fragments.add").then((oFrag) => {
                        oFrag.setBindingContext(oContext)
                        this.mDialog[sDialog] = oFrag
                        oFrag.open();
                    })
                } else {
                    oDialog.setBindingContext(oContext)
                    oDialog.open();
                }
            },
            onAdding(oEvent) {
                this._owner.submitChanges({
                    success: (oData) => {
                        MessageToast.show("Data Added successfully")
                        oEvent.getSource().getParent().getParent().close()
                    },
                    error: (oError) => {
                        MessageToast.show("Error", oError)
                    }
                })
            },
            onCancel(oEvent) {
                this._owner.resetChanges()
                oEvent.getSource().getParent().getParent().close();
            },
            onColumnListItemPress(oEvent) {
                this._route.navTo("RouteView2", {
                    path: window.encodeURIComponent(oEvent.getSource().getBindingContext())
                })
            },
            onDelete() {
                var oSmart = this.byId("smarttable");
                var oTable = oSmart.getTable();
                var oSelected = oTable.getSelectedItems();
                oSelected.forEach((oEle) => {
                    var oBinding = oEle.getBindingContext().getPath();
                    this._owner.remove(oBinding, {
                        success: (oData) => {
                            MessageToast.show("Data Deleted successfully")
                        },
                        error: (oError) => {
                            MessageToast.show("Error", oError);
                        }
                    })
                })
            },
            onSearch(oEvent) {
                var sQuery = oEvent.getParameter("query")
                var oSmart = this.byId("smarttable");
                var oBinding = oSmart.getTable().getBinding("items");
                var oFill = new Filter({
                    filters: [new Filter("SiteCode", "Contains", sQuery),
                    new Filter("SiteName", "Contains", sQuery),
                    new Filter("CRCode", "Contains", sQuery),
                    new Filter("CRName", "Contains", sQuery),
                    new Filter("Specialities", "Contains", sQuery),
                    new Filter("CVAvailable", "Contains", sQuery),
                    new Filter("Status", "Contains", sQuery)
                    ],
                    and: false
                })
                oBinding.filter(oFill);
            }
        });
    });