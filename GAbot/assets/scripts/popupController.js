var popupController = cc.Class({
    extends: cc.Component,

    properties: {
        base: cc.Node,
        level: cc.Node,
        design: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onEnable () {
        this.base.active = true;
        this.level.active = false;
        this.design.active = false;
    },

    // Open popup, if another is opened this one will be automatically closed
    openPopup(property){
        this.closePopup();
        this[property].active = true;
        this.current = this[property];
        this.base.active = false;
    },

    openPopupByButton(event,property){
        this.openPopup(property);
    },

    // this popup won't be closed if another is open
    openPermanentPopup(property){
        this.closePopup();
        this[property].active = true;
        this.base.active = false;
    },

    //close current popup
    closePopup(){
        if (this.hasOwnProperty("current")) this.current.active = false;
        this.base.active = true;
    },

    //close specific popup
    closePopupByName(property){
        this[property].active = false;
        this.base.active = true;
    },

    //close specific popup through button
    closePopupByButton(event, property){
        this.closePopupByName(property);
        this.base.active = true;
    },

    // verifies if any popup is open
    isAnyOpen(){
        if (! this.hasOwnProperty("current")) return false;
        return this.current.active;
    },


    // update (dt) {},
});

module.exports = popupController;