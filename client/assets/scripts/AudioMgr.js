cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        bgmVolume:1.0,
        sfxVolume:1.0,
        
        bgmAudioID:-1,
    },
    
    // use this for initialization
    init: function () {
        // var t = cc.sys.localStorage.getItem("bgmVolume");
        // if(t != null){
        //     this.bgmVolume = parseFloat(t);    
        // }
        
        // var t = cc.sys.localStorage.getItem("sfxVolume");
        // if(t != null){
        //     this.sfxVolume = parseFloat(t);    
        // }
        
        cc.game.on(cc.game.EVENT_HIDE, function () {
            console.log("cc.audioEngine.pauseAll");
            cc.audioEngine.pauseAll();
        });
        cc.game.on(cc.game.EVENT_SHOW, function () {
            console.log("cc.audioEngine.resumeAll");
            cc.audioEngine.resumeAll();
        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    
    getUrl:function(url){
        return ("sounds/" + url).replace(".mp3", "");
    },
    
    playBGM(url){
        var audioUrl = this.getUrl(url);
        console.log("playBGM audio:", audioUrl);
        cc.resources.load(audioUrl, cc.AudioClip, null, (function (err, clip) {
            console.log("load playBGM audio", err, this.bgmVolume)
            if(this.bgmAudioID >= 0){
                cc.audioEngine.stop(this.bgmAudioID);
            }
            this.bgmAudioID = cc.audioEngine.play(clip,true,this.bgmVolume);
        }).bind(this));        
    },
    
    playSFX(url){
        var audioUrl = this.getUrl(url);
        console.log("playSFX audio:", audioUrl);
        debugger
        cc.resources.load(audioUrl, cc.AudioClip, null, (function (err, clip) {
            console.log("load playSFX audio", err, this.sfxVolume)
            if(this.sfxVolume > 0){
                var audioId = cc.audioEngine.play(clip,false,this.sfxVolume);    
            }
        }).bind(this));        
    },
    
    setSFXVolume:function(v){
        console.log("setSFXVolume:", v)
        if(this.sfxVolume != v){
            cc.sys.localStorage.setItem("sfxVolume",v);
            this.sfxVolume = v;
        }
    },
    
    setBGMVolume:function(v,force){
        console.log("setBGMVolume:", v)
        if(this.bgmAudioID >= 0){
            if(v > 0){
                cc.audioEngine.resume(this.bgmAudioID);
            }
            else{
                cc.audioEngine.pause(this.bgmAudioID);
            }
            //cc.audioEngine.setVolume(this.bgmAudioID,this.bgmVolume);
        }
        if(this.bgmVolume != v || force){
            cc.sys.localStorage.setItem("bgmVolume",v);
            this.bgmVolume = v;
            cc.audioEngine.setVolume(this.bgmAudioID,v);
        }
    },
    
    pauseAll:function(){
        cc.audioEngine.pauseAll();
    },
    
    resumeAll:function(){
        cc.audioEngine.resumeAll();
    }
});
