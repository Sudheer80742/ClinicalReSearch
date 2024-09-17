sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function (
    Controller,
    MessageToast,
    Fragment
) {
    "use strict";

    return Controller.extend("rbx.107.clinicalresearcher.controller.View2", {
        onInit() {
            this._owner = this.getOwnerComponent().getModel();
            this._route = this.getOwnerComponent().getRouter();
            this._route.getRoute("RouteView2").attachPatternMatched(this._oRoutes, this);
            this._owner.setDeferredGroups(this._owner.getDeferredGroups().concat(["create","update"]));
            this.mDialog={}
        },
        _openFragment(path){
            var sDialog = path
            var oDialog = this.mDialog[sDialog]
            if(!oDialog){
                return Fragment.load({
                    id:path,
                    name:path,
                    controller:this
                }).then((oFrag)=>{
                    this.getView().addDependent(oFrag);
                    this.mDialog[sDialog]=oFrag;
                    return oFrag
                })
            }else{
                return Promise.resolve(oDialog);
            }
        },
        _oRoutes(oEvent) {
            var sPath = window.decodeURIComponent(oEvent.getParameter("arguments").path);
            this.getView().bindElement({ path: sPath })
            this._onEditChange(false)
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
            },{groupId:"update"})
        },
        onCan(oEvent) {
            this._onEditChange(false)
        },
        onDiscard() {
            this._owner.resetChanges()
        },
        _onAddTab(oEvent,path){
            var sPath=oEvent.getSource().getBindingContext().getPath();
            var tablePath=oEvent.getSource().getParent().getParent().getTableBindingPath();
            var oBj=oEvent.getSource().getBindingContext().getObject();
            var sc;
            if(path==="rbx.107.clinicalresearcher.fragments.spciaAdd" || path==="rbx.107.clinicalresearcher.fragments.regulatoryAdd"){
                sc={
                    Sitecode:oBj.SiteCode
                }
            }else{
                sc={
                    SiteCode:oBj.SiteCode
                }
            }
            var oContext=this._owner.createEntry(`${sPath}/${tablePath}`,{
                groupId:"create",
                properties:sc
            });
            this._openFragment(path).then((oFrag)=>{
                oFrag.setBindingContext(oContext);
                oFrag.open();})
        },
        _onClose(oEvent){
            this._owner.resetChanges()
            oEvent.getSource().getParent().getParent().close();
        },
        _onSubmit(oEvent){
            this._owner.submitChanges({
                success: (oData) =>{
                    MessageToast.show("Data Added successfully")
                    oEvent.getSource().getParent().getParent().close();
                },
                error: (oError) => {
                    MessageToast.show("Error", oError)
                }
        })
    },
        _onDelete(oEvent){
            var oSmart=oEvent.getSource().getParent().getParent();
            var oTable=oSmart.getTable();
            var oSelect=oTable.getSelectedIndices();
            if(oSelect.length==0){
                MessageToast.show("please Select a row to delete")
                return;
            }
            oSelect.forEach((oele)=>{
            var oBinding = oTable.getContextByIndex(oele).getPath();
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
        ondel1(oev){
            this._onDelete(oev)
        },
        onAddTab1(oEvent){
            this._onAddTab(oEvent,"rbx.107.clinicalresearcher.fragments.facilitiesAdd");
        },
        onClose1(oEvent){
            this._onClose(oEvent)
        },
        onSave1(oEvent){
            this._onSubmit(oEvent);
        },
        onAddTab2(oEvent){
            this._onAddTab(oEvent,"rbx.107.clinicalresearcher.fragments.educationAdd")
        },
        onAddTab3(oEvent){
            this._onAddTab(oEvent,"rbx.107.clinicalresearcher.fragments.licenseAdd")
        },
        onAddTab4(oEvent){
            this._onAddTab(oEvent,"rbx.107.clinicalresearcher.fragments.enseAdd")
        },
        onAddTab5(oEvent){
            this._onAddTab(oEvent,"rbx.107.clinicalresearcher.fragments.gcpAdd")
        },
        onAddTab6(oEvent){
            this._onAddTab(oEvent,"rbx.107.clinicalresearcher.fragments.spciaAdd")
        },
        onAddTab7(oEvent){
            this._onAddTab(oEvent,"rbx.107.clinicalresearcher.fragments.totalAdd")
        },
        onAddTab8(oEvent){
            this._onAddTab(oEvent,"rbx.107.clinicalresearcher.fragments.regulatoryAdd")
        }
    });
});