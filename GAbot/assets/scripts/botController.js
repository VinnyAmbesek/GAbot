const Analytics = require("analytics");
const PopupController = require("popupController");
const LevelController = require("levelController");
const DesignController = require("designController");

var botController = cc.Class({
    extends: cc.Component,

    properties: {
        analytics: Analytics,
        popupController: PopupController,
        levelController: LevelController,
        designController: DesignController,
        login: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        if (!this.analytics.Analytics_Ready()) {
            this.node.active = false;
            this.login.active = true;
        }
    },

    endSession(){
        this.pause();
        this.analytics.End_Analytics_Session();
        this.login.active = true;
        this.node.active = false;
    },

    init (){
        this.levelController.runTimer();
        this.designController.runTimer();
    },

    pause (){
        this.levelController.running = false;
        this.designController.running = false;
    },

    // update (dt) {},
});

module.exports = botController;