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
            })
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
            var oContext=this._owner.createEntry(`${sPath}/${tablePath}`,{
                groupId:"create",
                properties:{
                    SiteCode:oBj.SiteCode
                }
            });
            this._openFragment(path).then((oFrag)=>{
                oFrag.setBindingContext(oContext);
                oFrag.open();})
        },
        _onAddTab1(oEvent,path){
            var sPath=oEvent.getSource().getBindingContext().getPath();
            var tablePath=oEvent.getSource().getParent().getParent().getTableBindingPath();
            var oBj=oEvent.getSource().getBindingContext().getObject();
            var oContext=this._owner.createEntry(`${sPath}/${tablePath}`,{
                groupId:"create",
                properties:{
                    Sitecode:oBj.SiteCode
                }
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
        onAddTab1(oEvent){
            this._onAddTab(oEvent,"rbx.107.clinicalresearcher.fragments.facilitiesAdd");
        },
        onClose(oEvent){
            this._onClose(oEvent)
        },
        onSave1(oEvent){
            this._onSubmit(oEvent);
        },
        onAddTab2(oEvent){
            this._onAddTab(oEvent,"rbx.107.clinicalresearcher.fragments.educationAdd")
        },
        onClose2(oEvent){
            this._onClose(oEvent);
        },
        onSave2(oEvent){
            this._onSubmit(oEvent);
        },
        onAddTab3(oEvent){
            this._onAddTab(oEvent,"rbx.107.clinicalresearcher.fragments.licenseAdd")
        },
        onClose3(oEvent){
            this._onClose(oEvent);
        },
        onSave3(oEvent){
            this._onSubmit(oEvent);
        },
        onAddTab4(oEvent){
            this._onAddTab(oEvent,"rbx.107.clinicalresearcher.fragments.enseAdd")
        },
        onClose4(oEvent){
            this._onClose(oEvent);
        },
        onSave4(oEvent){
            this._onSubmit(oEvent);
        },
        onAddTab5(oEvent){
            this._onAddTab(oEvent,"rbx.107.clinicalresearcher.fragments.gcpAdd")
        },
        onClose5(oEvent){
            this._onClose(oEvent);
        },
        onSave5(oEvent){
            this._onSubmit(oEvent);
        },
        onAddTab6(oEvent){
            this._onAddTab1(oEvent,"rbx.107.clinicalresearcher.fragments.spciaAdd")
        },
        onClose6(oEvent){
            this._onClose(oEvent);
        },
        onSave6(oEvent){
            this._onSubmit(oEvent);
        },
        onAddTab7(oEvent){
            this._onAddTab(oEvent,"rbx.107.clinicalresearcher.fragments.totalAdd")
        },
        onClose7(oEvent){
            this._onClose(oEvent);
        },
        onSave7(oEvent){
            this._onSubmit(oEvent);
        },
        onAddTab8(oEvent){
            this._onAddTab1(oEvent,"rbx.107.clinicalresearcher.fragments.regulatoryAdd")
        },
        onClose8(oEvent){
            this._onClose(oEvent);
        },
        onSave8(oEvent){
            this._onSubmit(oEvent);
        }
    });
});