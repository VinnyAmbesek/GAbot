//require("gameanalytics");
var ga = require('gameanalytics');

var analytics = cc.Class({
    extends: cc.Component,

    properties: {

        Info_Log:true,

        Analytics_Enabled:true,

        Analytics_Initialized:{
            default:false,
            visible:false,
        },

        gameKey: cc.EditBox,
        secretKey: cc.EditBox,
        login: cc.Node,
        bot: cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    start () {
        // Init on start (make sure you have internet connection)
        //this.Init_Analytics();
    },

    Init_Analytics(){// Force it if you're sure that you need
    if (this.gameKey.string == null || this.gameKey.string == "") return;
    if (this.secretKey.string == null || this.secretKey.string == "") return;

        if(!this.Analytics_Initialized){

            if(this.Info_Log){
                ga.GameAnalytics.setEnabledInfoLog(true);
            }

            if(!this.Analytics_Enabled){
                ga.GameAnalytics.setEnabledEventSubmission(false);
            }

            ga.GameAnalytics.configureBuild("0.1.0");
            ga.GameAnalytics.initialize(this.gameKey.string, this.secretKey.string);

            this.Analytics_Initialized = true;
            this.login.active = false;
            this.bot.active = true;
            cc.log("Analytics is on");
        }

        window.analytics = this;
    },

    // GameAnalytics SDK initialized and ready
    Analytics_Ready(){
        return ga.GameAnalytics.isSdkReady(true, false);
    },

    Start_Analytics_Session(){
        ga.GameAnalytics.startSession(); // Start session on game start
    },

    End_Analytics_Session(){
        ga.GameAnalytics.endSession(); // End session on game end or went to background
        this.Analytics_Initialized = false;
    },

    Get_User_ID(){
        return ga.GameAnalytics.Get_User_ID();
    },

    // Sample Game Events

    Level_Start(world="World", stage="Stage", level="Level", score=0){
        if(this.Analytics_Ready()){
            ga.GameAnalytics.addProgressionEvent( ga.EGAProgressionStatus.Start, world, stage, level, score);
        }
        
    },

    Level_Fail(world="World", stage="Stage", level="Level", score=0){
        if(this.Analytics_Ready()){
            ga.GameAnalytics.addProgressionEvent( ga.EGAProgressionStatus.Fail, world, stage, level, score);
        }
    },

    Level_Complete(world="World", stage="Stage", level="Level", score=0){
        if(this.Analytics_Ready()){
            ga.GameAnalytics.addProgressionEvent( ga.EGAProgressionStatus.Complete, world, stage, level, score);
        }
    },

    Design_event(event_detail, value){

        if (!value) value = -1;

        if(this.Analytics_Ready()){
            ga.GameAnalytics.addDesignEvent(event_detail, value);
        }
    },

});

module.exports = analytics;