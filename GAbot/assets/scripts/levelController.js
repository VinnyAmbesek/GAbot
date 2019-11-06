var levelController = cc.Class({
    extends: cc.Component,

    properties: {
        minLevel: [cc.EditBox],
        maxLevel: [cc.EditBox],
        sucess: cc.EditBox,
        timer: cc.EditBox,
        running:false,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onEnable () {
    },


    runTimer(){
        this.resetProgression();

        this._timer = parseInt(this.timer.string);
        if (isNaN(this._timer)) this._timer = 60.0;
        this.cron = this._timer;
        this._sucess = parseInt(this.sucess.string);
        if (isNaN(this._sucess)) this._sucess = 75;
        this.running = true;

        window.analytics.Level_Start("world" + this.currentLevel[0], "stage" + this.currentLevel[1], "level" + this.currentLevel[2], 0);
    },

    resetProgression(){
        this._minLevel = [parseInt(this.minLevel[0].string), parseInt(this.minLevel[1].string), parseInt(this.minLevel[2].string)];
        this._maxLevel = [parseInt(this.maxLevel[0].string), parseInt(this.maxLevel[1].string), parseInt(this.maxLevel[2].string)];
        for(var i = 0; i < 3; i++){
            if (isNaN(this._minLevel[i])) this._minLevel[i] = 1;
            if (isNaN(this._maxLevel[i])) this._maxLevel[i] = 1;
        }
        this.currentLevel = [this._minLevel[0],this._minLevel[1],this._minLevel[2]];
    },

    nextLevel(id = 2){
        this.currentLevel[id]++;
        if (this.currentLevel[id] > this._maxLevel[id]){
            this.currentLevel[id] = this._minLevel[id];
            if (id > 0) this.nextLevel(id-1);
        }
    },

    update (dt) {
        if (!this.running) return;
        this.cron -= dt;

        if (this.cron > 0) return;
        this.cron = this._timer;

        let dice = Math.floor(Math.random() * 100);
        let passed = dice < this._sucess;
        let score = Math.floor(Math.random() * 1000);

        if (passed){
            score += 10000;
            window.analytics.Level_Complete("world" + this.currentLevel[0], "stage" + this.currentLevel[1], "level" + this.currentLevel[2], score);
            this.nextLevel();
        } else {
            window.analytics.Level_Fail("world" + this.currentLevel[0], "stage" + this.currentLevel[1], "level" + this.currentLevel[2], score);
        }
        window.analytics.Level_Start("world" + this.currentLevel[0], "stage" + this.currentLevel[1], "level" + this.currentLevel[2], 0);
    },
});

module.exports = levelController;