var designController = cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        item: cc.Prefab,
        timer: cc.EditBox,

        running:false,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onEnable () {
    },

    addEvent(){
        let event = cc.instantiate(this.item);
        event.parent = this.content;
    },

    runTimer(){
        this.prepareEvents();

        this._timer = parseInt(this.timer.string);
        if (isNaN(this._timer)) this._timer = 5.0;
        this.cron = this._timer;

        this.running = this._events.length > 0;
    },

    prepareEvents(){
        let kids = this.content.children;
        this._events = new Array(kids.length);
        this._minValue = new Array(kids.length);
        this._maxValue = new Array(kids.length);
        this._weight = new Array(kids.length);
        this._weightCumulative = new Array(kids.length);
        this._weightSum = 0;

        for (var i = 0; i < kids.length; i++) {
            this._events[i] = kids[i].getChildByName("Name").getComponent(cc.EditBox).string;
            if (this._events[i] == "") this._events[i] = "event";

            this._minValue[i] = parseInt(kids[i].getChildByName("Value").getComponent(cc.EditBox).string);
            if (isNaN(this._minValue[i])) this._minValue[i] = 0;
            this._maxValue[i] = parseInt(kids[i].getChildByName("MaxValue").getComponent(cc.EditBox).string);
            if (isNaN(this._maxValue[i])) this._maxValue[i] = 0;

            this._weight[i] = parseInt(kids[i].getChildByName("Weight").getComponent(cc.EditBox).string);
            if (isNaN(this._weight[i]) || this._weight[i] < 1) this._weight[i] = 1;
            if (i == 0){
                this._weightCumulative[i] = this._weight[i];
            } else {
                this._weightCumulative[i] = this._weight[i] + this._weightCumulative[i-1];
            }
            this._weightSum += this._weight[i];
        }
    },

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    },

    getEventId(){
        let rng = Math.floor(Math.random() * this._weightSum);
        let id = 0;
        for (var i = 0; i < this._events.length; i++) {
            if (rng < this._weightCumulative[i]){
                id = i;
                i = this._events.length;
            }
        }
        return id;
    },

    update (dt) {
        if (!this.running) return;
        this.cron -= dt;

        if (this.cron > 0) return;
        this.cron = this._timer;

        let id = this.getEventId();
        cc.log("EventId: " + id);
        let val = this.getRndInteger(this._minValue[id], this._maxValue[id]);

        window.analytics.Design_event(this._events[id], val);
    },
});

module.exports = designController;