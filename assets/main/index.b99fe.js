window.__require=function t(e,i,n){function o(s,r){if(!i[s]){if(!e[s]){var c=s.split("/");if(c=c[c.length-1],!e[c]){var l="function"==typeof __require&&__require;if(!r&&l)return l(c,!0);if(a)return a(c,!0);throw new Error("Cannot find module '"+s+"'")}s=c}var d=i[s]={exports:{}};e[s][0].call(d.exports,function(t){return o(e[s][1][t]||t)},d,d.exports,t,e,i,n)}return i[s].exports}for(var a="function"==typeof __require&&__require,s=0;s<n.length;s++)o(n[s]);return o}({Block:[function(t,e){"use strict";cc._RF.push(e,"a44aailSTdItb6lQU2tlllu","Block"),cc.Class({extends:cc.Component,properties:{velocity:cc.v2(2e3,0),move:!0,destroytimer:3,shoudStartDestroy:!1,BlockParticles:{default:null,type:cc.Prefab}},start:function(){this.rigidBody=this.getComponent(cc.RigidBody)},update:function(t){Global.GamePause?this.rigidBody.linearVelocity=cc.v2(0,0):(this.rigidBody.linearVelocity=cc.v2(this.velocity.x,this.rigidBody.linearVelocity.y),this.PlatformFront()),1==Global.GameOver&&(this.move=!1,this.rigidBody.linearVelocity=cc.v2(0,0),this.node.destroy()),this.shoudStartDestroy&&(this.destroytimer-=t,this.destroytimer<0&&this.node.destroy())},onBeginContact:function(t,e,i){6==i.tag&&(this.InstantiateBlockParticleEffect(),this.node.destroy())},onEndContact:function(){},onPreSolve:function(){},onPostSolve:function(){},PlatformFront:function(){for(var t=this.node.parent.convertToWorldSpaceAR(this.node.getPosition()),e=this.node.parent.convertToWorldSpaceAR(this.node.getPosition().add(cc.Vec3.RIGHT.mul(40))),i=cc.director.getPhysicsManager().rayCast(t,e,cc.RayCastType.All),n=0;n<i.length;n++){var o=i[n];if(3==o.collider.tag)return this.rigidBody.linearVelocity=cc.v2(0,0),this.move=!1,void(this.shoudStartDestroy=!0);o.point,o.normal,o.fraction}},InstantiateBlockParticleEffect:function(){var t=cc.instantiate(this.BlockParticles);t.parent=this.node.parent,t.setPosition(this.node.getPosition())}}),cc._RF.pop()},{}],Bullet:[function(t,e){"use strict";cc._RF.push(e,"27d1aC3qdhMJ6ictcRO/sad","Bullet"),cc.Class({extends:cc.Component,properties:{BulletTime:2,rigidBody:null,velocity:cc.v2(400,0),ExplodeParticles:{default:null,type:cc.Prefab},plusone:{default:null,type:cc.Prefab}},onLoad:function(){this.rigidBody=this.getComponent(cc.RigidBody),this.rigidBody.linearVelocity=this.velocity},start:function(){},update:function(t){cc.isValid(this.node)&&(this.BulletTime-=t,this.BulletTime<=0&&this.node.destroy())},onBeginContact:function(t,e,i){if(3==i.tag||6==i.tag){var n=i.node.position,o=cc.instantiate(this.ExplodeParticles);o.parent=i.node.parent,o.setPosition(n);var a=cc.instantiate(this.plusone);a.parent=e.node.parent,a.setPosition(this.node.position),cc.game.emit("blockdestroyed",{blockdestroyed:1}),i.node.destroy()}e.node.destroy()}}),cc._RF.pop()},{}],CameraController:[function(t,e){"use strict";cc._RF.push(e,"7fd1dmj8IhJf6r3owKmMTP4","CameraController"),cc.Class({extends:cc.Component,properties:{velocity:cc.v2(20,0),offset:320,Player:{default:null,type:cc.Node},audioSource:{default:null,type:cc.AudioSource}},start:function(){},update:function(){this.node.setPosition(this.Player.getPosition().x+this.offset,this.node.getPosition().y)}}),cc._RF.pop()},{}],Config:[function(t,e){"use strict";cc._RF.push(e,"61b4fMmhM9CyYF6gdmigHJy","Config"),cc._RF.pop()},{}],DestroyAfterTime:[function(t,e){"use strict";cc._RF.push(e,"c38a6/Bov5MHYTCrCrO4LT6","DestroyAfterTime"),cc.Class({extends:cc.Component,properties:{destroytime:3},start:function(){},update:function(t){this.destroytime-=t,this.destroytime<=0&&this.node.destroy()}}),cc._RF.pop()},{}],EagleScript:[function(t,e){"use strict";cc._RF.push(e,"0133eqIXu9N76u+dgcPzpG3","EagleScript"),cc.Class({extends:cc.Component,properties:{},start:function(){},onBeginContact:function(t,e,i){i.tag}}),cc._RF.pop()},{}],FollowPlayer:[function(t,e){"use strict";cc._RF.push(e,"8e8b2Kdo/NGQrW7qNmAxEAz","FollowPlayer"),cc.Class({extends:cc.Component,properties:{Player:{default:null,type:cc.Node},offset:-320},start:function(){},update:function(){this.node.setPosition(this.Player.getPosition().x+this.offset,this.node.getPosition().y)}}),cc._RF.pop()},{}],GameManager:[function(t,e){"use strict";cc._RF.push(e,"373c6JdeeZAbKWN3ZG9yez4","GameManager");var i=t("MxPlayer"),n=cc.Class({extends:cc.Component,editor:{executionOrder:-1},properties:{GamePlaying:!0,GameOver:!1,config:null,defaultConfig:null,UILayer:{default:null,type:cc.Node},ExitUILayer:{default:null,type:cc.Node},Player:{default:null,type:cc.Prefab},scorecurtext:{default:null,type:cc.Label},score2xtext:{default:null,type:cc.Label}},statics:{_instance:null,Gameover:60},onLoad:function(){this.CocosPreInitialization(),n._instance=this},start:function(){this.config=i._instance.OnGameInit(),i._instance.GameStart(),i._instance.MxPlayerGameStartData(),this.defaultConfig=i._instance.GameSettings(),i._instance.ShowStickyAds(this.defaultConfig.stickyBannersEnabled),cc.game.on("screenOff",function(){this.PauseGame()},this),cc.game.on("homePressed",function(){this.PauseGame()},this),cc.game.on("pagePause",function(){this.PauseGame()},this)},update:function(){Global.GameOver?this.ShouldEnableUI(!0):this.ShouldEnableUI(!1)},ShouldEnableUI:function(t){this.UILayer.active=t,this.score2xtext.string=2*Global.UiScore,this.scorecurtext.string=Global.UiScore},CocosPreInitialization:function(){var t=cc.director.getPhysicsManager();t.enabled=!0,t.gravity=cc.v2(0,-1960)},PauseGame:function(){Global.GameOver||(Global.GamePause=!0,this.ExitUILayer.active=!0,cc.director.pause())},ResumeGame:function(){cc.director.resume(),Global.GamePause=!1,this.ExitUILayer.active=!1}});cc._RF.pop()},{MxPlayer:"MxPlayer"}],Global:[function(t,e){"use strict";cc._RF.push(e,"8841dwpmJlP14vrG2se+UgQ","Global"),window.Global={GamePlaying:!0,GameOver:!1,GamePause:!1,UiScore:0},cc._RF.pop()},{}],MxPlayer:[function(t,e){"use strict";cc._RF.push(e,"297f1mMUoBAqo2m3OTjaYby","MxPlayer");var i=cc.Class({extends:cc.Component,properties:{statictesting:!0},statics:{_instance:null},onLoad:function(){i._instance=this},start:function(){},OnGameInit:function(){try{if("undefined"!=typeof gameManager){var t=gameManager.onGameInit(),e=JSON.parse(t);return e.userId,e.gameId,e.roomId,e.highestScore,e.gameMode,e.isFirstOpen,e}}catch(i){console.log("Error Parsing Config")}},GameSettings:function(){var t={default:null,reviveScore:0,reviveEnabled:!0,reviveLives:1,reviveAdExistsDefault:!0,autoAd:!0,noDieScore:10,stickyBannersEnabled:!0,speed:300};if("undefined"==typeof gameManager)return t;try{var e=gameManager.getGameSettings();return JSON.parse(e)}catch(i){return t}},GameStart:function(){if("undefined"!=typeof gameManager)try{gameManager.onGameStart()}catch(t){gameManager.onError(t.stack.toString())}},ShowStickyAds:function(t){!0===t&&"undefined"!=typeof gameManager&&"function"==typeof gameManager.showStickyAds&&(cc.game.on("adShown",function(){console.log("showing sticky ads")}),cc.game.on("adNotShown",function(){}),gameManager.showStickyAds("bottom"))},MxPlayerGameStartData:function(){var t="first";if(null!=cc.sys.localStorage.getItem("isopen")&&(t="new"),"undefined"!=typeof gameManager)try{var e={userID:String(cc.sys.localStorage.getItem("userID")),gameID:String(cc.sys.localStorage.getItem("gameID")),roomID:String(cc.sys.localStorage.getItem("roomID")),startType:t},i=JSON.stringify(e);gameManager.onTrack("gameStart",i)}catch(n){gameManager.onError(n.stack.toString())}}});cc._RF.pop()},{}],ObstacleMovements:[function(t,e){"use strict";cc._RF.push(e,"987f7c5BzFICqSoQfY9wLSY","ObstacleMovements"),cc.Class({extends:cc.Component,properties:{platforms:{default:[],type:cc.Node},startpoints:{default:[],type:cc.Vec2},endpoints:{default:[],type:cc.Vec2},perfectNode:{default:null,type:cc.Node},time:1,curt:0,shouldmove:!1,destroytimer:7,shoudStartDestroy:!1},start:function(){this.destroytimer=5},update:function(t){this.shouldmove&&(this.curt+=t*(1/this.time),this.MovePlatforms()),this.shoudStartDestroy&&0==Global.GamePause&&(this.destroytimer-=t,this.destroytimer<0&&(console.log("destroying"),this.node.parent.destroy()))},MovePlatforms:function(){this.curt>1&&(this.shouldmove=!1,this.curt=1);for(var t=0;t<this.platforms.length;t++){var e=this.lerp(this.startpoints[t].y,this.endpoints[t].y,this.curt),i=this.lerp(this.startpoints[t].x,this.endpoints[t].x,this.curt);cc.isValid(this.platforms[t])&&(this.platforms[t].setPosition(i,e,0),this.SyncAllChildren(this.platforms[t]))}},SyncAllChildren:function(t){for(var e=0;e<t.children.length;e++){var i=t.children[e].getComponent(cc.RigidBody);null!=i&&i.syncPosition(),this.SyncAllChildren(t.children[e])}},onBeginContact:function(){this.shouldmove=!0,this.shoudStartDestroy=!0},lerp:function(t,e,i){return(1-i)*t+i*e},ActivatePerfectNode:function(){null!=this.perfectNode&&(this.perfectNode.active=!0)}}),cc._RF.pop()},{}],PerfectAnimation:[function(t,e){"use strict";cc._RF.push(e,"9d793C5zLtKKKfQ1RVnSULF","PerfectAnimation"),cc.Class({extends:cc.Component,properties:{animationtime:1,upwardmovementspeed:2,startPosition:cc.v2(0,0),shouldanimate:!1,timer:0,count:0,audioSource:{type:cc.AudioSource,default:null}},start:function(){this.node.active=!1,this.startPosition=this.node.position},update:function(t){this.shouldanimate&&(this.node.y+=t*this.upwardmovementspeed,this.timer-=t),this.timer<0&&(this.shouldanimate=!1,this.node.active=!1,this.timer=0)},StartAnimation:function(){this.node.active=!0,this.shouldanimate=!0,this.timer=this.animationtime,this.node.y=470,this.audioSource.play(),this.count+=1,this.node.getComponent(cc.RichText).string="SHOOT MODE",window.navigator&&window.navigator.vibrate&&window.navigator.vibrate(350)},Noadanimation:function(){this.node.active=!0,this.shouldanimate=!0,this.timer=5,this.node.y=300,this.node.getComponent(cc.RichText).string="N0 Ad Exists"}}),cc._RF.pop()},{}],PhysicsRelated:[function(t,e){"use strict";cc._RF.push(e,"1096edwZuVFBZH6fwFCKatQ","PhysicsRelated"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){var t=cc.director.getPhysicsManager();t.enabled=!0,t.gravity=cc.v2(0,-320)},start:function(){}}),cc._RF.pop()},{}],PlayerController:[function(t,e){"use strict";cc._RF.push(e,"17f36fN7N1DGrTcEatsYANU","PlayerController");var i=t("GameManager"),n=t("encryption_1");cc.Class({extends:cc.Component,properties:{gamePlayTime:0,audioSource:{default:null,type:cc.AudioSource},bgm:{default:null,type:cc.AudioSource},block:{default:null,type:cc.Prefab},bullet:{default:null,type:cc.Prefab},shootPoint:{default:null,type:cc.Node},shooterAnimationsprite:{default:null,type:cc.Node},tutorialcard:{default:null,type:cc.Node},perfectnode:{default:null,type:cc.Node},scoreDisplay:{default:null,type:cc.Label},trail:cc.MotionStreak,score:0,canvas:cc.Node,velocity:cc.v2(2e3,0),rigidBody:null,move:!0,shootbullets:!1,firerate:.1,fireTimer:.1,perfect:0,shootBulletsTime:5,bulletsTimer:0,NotAssigned:!1,newhighScore:0,adtype:1,PowerupUi:{default:null,type:cc.Node},playmenu:{default:null,type:cc.Node},ingameUi:{default:null,type:cc.Node},bulletpowerupicon:{default:null,type:cc.Node},pauseicon:{default:null,type:cc.Node},distancescore:0,canShowAd:!1,playicon:{default:null,type:cc.Node},cantrackpauseevent:!1,currenttime:0,adclaimed:0,adGameStartClaimed:0,adGameEndClaimed:0,adGameStartShown:0,adGameEndShown:0},statics:{_instance:null},onLoad:function(){this.score=0},start:function(){this.rigidBody=this.getComponent(cc.RigidBody),cc.game.on("rewardAdsExist",this.onRewardedAdsCheck,this),cc.game.on("onAdPlayed",this.adPlayed,this),cc.game.on("blockdestroyed",this.incrementscoreby1,this),this.velocity.x=370;var t=cc.sys.localStorage.getItem("isopen");this.MxplayerCheckForRewardeVideos(),null==t?(cc.sys.localStorage.setItem("isopen",!1),this.tutorialcard.active=!0,this.PauseGame()):(this.playmenu.active=!0,this.PauseGame()),this.playicon.active=!1},update:function(t){if(this.move?(this.gamePlayTime+=t,this.rigidBody.linearVelocity=cc.v2(this.velocity.x,this.rigidBody.linearVelocity.y),this.GainScore(),this.PlatformFront()):1==Global.GamePause&&(this.currenttime+=t),this.shootbullets){if(this.fireTimer-=t,this.bulletsTimer-=t,this.ShootTimerAnimation(),this.bulletsTimer<0)return void(this.shootbullets=!1);this.fireTimer<=0&&(this.fireTimer=this.firerate,this.ShootBullet())}},UpdateTrailPosition:function(){this.trail.node.x=this.node.x,this.trail.node.y=this.node.y,console.log(this.trail.node.x)},onBeginContact:function(t,e,i){5==i.tag?(i.node.active=!1,this.shootbullets||(this.perfect++,this.perfectnode.getComponent("PerfectAnimation").StartAnimation()),1==this.perfect&&(this.bulletsTimer=this.shootBulletsTime,this.perfect=0,this.shootbullets=!0)):6==i.tag&&this.GameOver()},ShootBullet:function(){var t=this.node.getPosition().add(cc.v2(50,0)),e=cc.instantiate(this.bullet);e.parent=this.canvas,e.setPosition(t)},PlatformFront:function(){var t,e=this.node.parent.convertToWorldSpaceAR(this.node.getPosition()),i=this.node.parent.convertToWorldSpaceAR(this.node.getPosition().add(cc.Vec3.RIGHT.mul(52)));null!=cc.director.getPhysicsManager()&&(t=cc.director.getPhysicsManager().rayCast(e,i,cc.RayCastType.All));for(var n=0;n<t.length;n++){var o=t[n],a=o.collider;if(3==a.tag||6==a.tag)return void this.GameOver();o.point,o.normal,o.fraction}},ShootTimerAnimation:function(){var t=this.bulletsTimer/this.shootBulletsTime;t<0&&(t=0),this.shooterAnimationsprite.scaleX=t},GameOver:function(){Global.UiScore=this.score,this.play(),this.shooterAnimationsprite.scaleX=0,window.navigator&&window.navigator.vibrate&&window.navigator.vibrate(450),Global.GamePause=!0,this.ingameUi.active=!1,this.rigidBody.linearVelocity=cc.v2(0,0),this.shootbullets=!1,this.move=!1,0==this.canShowAd&&this.MxPlayerGameOver(),Global.GameOver=!0},PauseGame:function(){this.pauseicon.active=!1,this.playicon.active=!0,Global.GamePause=!0,this.rigidBody.linearVelocity=cc.v2(0,0),this.shootbullets=!1,this.move=!1},SendPuaseEventData:function(){if("undefined"!=typeof gameManager)try{var t={userID:String(cc.sys.localStorage.getItem("userID")),gameID:String(cc.sys.localStorage.getItem("gameID")),roomID:String(cc.sys.localStorage.getItem("roomID")),currentTime:Math.floor(this.currenttime)},e=JSON.stringify(t);gameManager.onTrack("gamePause",e)}catch(i){gameManager.onError(i.stack.toString())}},TogglePlayPauseicon:function(){this.pauseicon.active=!this.pauseicon,this.playicon.active=!this.playicon},Restart:function(){0==this.cantrackpauseevent?this.cantrackpauseevent=!0:this.SendPuaseEventData(),this.currenttime=0,this.pauseicon.active=!0,this.playicon.active=!1,this.bgm.play(),Global.GamePause=!1,this.move=!0,this.bulletsTimer>0&&(this.shootbullets=!0),this.rigidBody.linearVelocity=cc.v2(370,0),this.tutorialcard.active=!1},GainScore:function(){this.distancescore<Math.round(this.node.getPosition().x/900)&&(this.distancescore=Math.round(this.node.getPosition().x/900),this.score+=1),this.scoreDisplay.string=this.score},incrementscoreby1:function(t){1==t.blockdestroyed&&(this.score+=1,this.scoreDisplay.string=this.score)},MxplayerCheckForRewardeVideos:function(){if("undefined"!=typeof gameManager&&"function"==typeof gameManager.onCheckRewardedVideoAds)try{gameManager.onCheckRewardedVideoAds("rewardAdsExist")}catch(t){gameManager.onError(t.stack.toString())}},OnPowerUpButtonClicked:function(){Global.GameOver||(this.bulletsTimer=this.shootBulletsTime,this.perfect=0,this.shootbullets=!0,this.bulletpowerupicon.active=!1)},onShowRewardedVideoAdsStart:function(){if(this.MxPlayerGameadclicked("start"),this.adtype=0,this.adGameStartShown=1,this.MxPlayerGameadshown("start"),"undefined"!=typeof gameManager&&"function"==typeof gameManager.onShowRewardedVideoAds)try{gameManager.onShowRewardedVideoAds("onAdPlayed",null)}catch(t){gameManager.onError(t.stack.toString())}},onShowRewardedVideoAdsEnd:function(){if(this.MxPlayerGameadclicked("end"),this.adtype=1,this.adGameEndShown=1,this.MxPlayerGameadshown("end"),"undefined"!=typeof gameManager&&"function"==typeof gameManager.onShowRewardedVideoAds)try{gameManager.onShowRewardedVideoAds("onAdPlayed",null)}catch(t){gameManager.onError(t.stack.toString())}},onRewardedAdsCheck:function(t){0===t.status?this.canShowAd=!0:this.canShowAd=!1},MxPlayerGameOver:function(){if(this.GetNewHighScore(),this.MxPlayerGameEndData(),"undefined"!=typeof gameManager){var t={userID:String(cc.sys.localStorage.getItem("userID")),gameID:String(cc.sys.localStorage.getItem("gameID")),roomID:String(cc.sys.localStorage.getItem("roomID")),score:this.score,highScore:this.newhighScore,info:n.getInfo(this.score,Math.round(this.gamePlayTime),0)};try{var e=JSON.stringify(t);gameManager.onGameOver(e)}catch(i){gameManager.onError(i.stack.toString())}}},MxPlayerGameEndData:function(){if(console.log("called game end event"),"undefined"!=typeof gameManager)try{var t={userID:String(cc.sys.localStorage.getItem("userID")),gameID:String(cc.sys.localStorage.getItem("gameID")),roomID:String(cc.sys.localStorage.getItem("roomID")),currentScore:this.score,highScore:this.newhighScore,playTime:Math.floor(this.gamePlayTime),adGameStartOpportunity:1,adGameStartShown:this.adGameStartShown,adGameStartClaimed:this.adGameStartClaimed,adGameEndOpportunity:1,adGameEndShown:this.adGameEndShown,adGameEndClaimed:this.adGameEndClaimed,adGamePowerupClaimed:0},e=JSON.stringify(t);gameManager.onTrack("gameExit",e)}catch(i){gameManager.onError(i.stack.toString())}},MxPlayerGameadclaimed:function(t){if(console.log("called game end event"),"undefined"!=typeof gameManager)try{var e={userID:String(cc.sys.localStorage.getItem("userID")),gameID:String(cc.sys.localStorage.getItem("gameID")),roomID:String(cc.sys.localStorage.getItem("roomID")),autoPlayed:0,position:t},i=JSON.stringify(e);gameManager.onTrack("gameAdClaimed",i)}catch(n){gameManager.onError(n.stack.toString())}},MxPlayerGameadclicked:function(t){if(console.log("called game end event"),"undefined"!=typeof gameManager)try{var e={userID:String(cc.sys.localStorage.getItem("userID")),gameID:String(cc.sys.localStorage.getItem("gameID")),roomID:String(cc.sys.localStorage.getItem("roomID")),autoPlayed:0,position:t},i=JSON.stringify(e);gameManager.onTrack("gameAdClicked",i)}catch(n){gameManager.onError(n.stack.toString())}},MxPlayerGameadshown:function(t){if(console.log("called game end event"),"undefined"!=typeof gameManager)try{var e={userID:String(cc.sys.localStorage.getItem("userID")),gameID:String(cc.sys.localStorage.getItem("gameID")),roomID:String(cc.sys.localStorage.getItem("roomID")),position:t},i=JSON.stringify(e);gameManager.onTrack("gameAdShown",i)}catch(n){gameManager.onError(n.stack.toString())}},adPlayed:function(t){var e="start";1==this.adtype&&(e="end"),this.MxPlayerGameadclaimed(e),this.canShowAd=!1,this.MxplayerCheckForRewardeVideos(),0===t.status?1==this.adtype?(this.score*=2,this.adGameEndClaimed=1,this.MxPlayerGameOver()):(console.log("bullet power added"),this.adGameStartClaimed=1,this.bulletpowerupicon.active=!0,this.deactivatePowerupUi()):1==this.adtype?this.MxPlayerGameOver():this.deactivatePowerupUi()},deactivatePowerupUi:function(){this.playmenu.active=!1,this.PowerupUi.active=!1,this.ingameUi.active=!0,this.Restart()},GetNewHighScore:function(){this.newhighScore=i._instance.config.highestScore,this.score>this.newhighScore&&(this.newhighScore=this.score)},play:function(){this.audioSource.play()},pause:function(){this.audioSource.pause()},skipTutorialCard:function(){this.tutorialcard.active=!1,this.PowerupUi.active=!0},playmenuclicked:function(){this.canShowAd?(this.playmenu.active=!1,this.PowerupUi.active=!0):this.deactivatePowerupUi()}}),cc._RF.pop()},{GameManager:"GameManager",encryption_1:"encryption_1"}],SpawnManager:[function(t,e){"use strict";cc._RF.push(e,"4e371rs8XlDxqwuTf+8H73h","SpawnManager"),cc.Class({extends:cc.Component,properties:{platformsArray:{default:[],type:cc.Node},items:[],obstacles:{default:[],type:cc.Prefab},hard:{default:[],type:cc.Prefab},distance:3,distanceBetweenPrefabs:864,eachSurfaceSize:576,previous:0,obstacleCount:1},start:function(){},update:function(){this.SpawnPlatforms(),this.SpawnObstacles()},SpawnPlatforms:function(){if(this.node.getPosition().x-this.platformsArray[0].getPosition().x>2*this.eachSurfaceSize){var t=this.platformsArray[0];t.setPosition(this.distance*this.eachSurfaceSize,this.node.position.y),this.SyncAllChildren(t),this.platformsArray.shift(),this.platformsArray.push(t),this.distance++}},SyncAllChildren:function(t){for(var e=0;e<t.children.length;e++){var i=t.children[e].getComponent(cc.RigidBody);null!=i&&i.syncPosition(),this.SyncAllChildren(t.children[e])}},SpawnObstacles:function(){var t=this.node.getPosition().x;if(t>this.previous+this.distanceBetweenPrefabs){var e=Math.floor(t/this.distanceBetweenPrefabs),i=Math.round(this.GetRandom(0,11)),n=cc.instantiate(this.obstacles[i]);this.obstacleCount+=1,this.obstacleCount,n.parent=this.node.parent,n.setPosition((e+2)*this.distanceBetweenPrefabs,this.node.position.y),this.SyncAllChildren(n),this.previous+=this.distanceBetweenPrefabs}},SpawnHardObstacles:function(){var t=this.node.getPosition().x;if(t>this.previous+this.distanceBetweenPrefabs){var e=Math.floor(t/this.distanceBetweenPrefabs),i=Math.round(this.GetRandom(0,this.hard.length-1)),n=cc.instantiate(this.hard[i]);n.parent=this.node.parent,n.setPosition((e+2)*this.distanceBetweenPrefabs,this.node.position.y),this.SyncAllChildren(n),this.previous+=this.distanceBetweenPrefabs}},GetRandom:function(t,e){return Math.random()*(e-t)+t}}),cc._RF.pop()},{}],TochHandler:[function(t,e){"use strict";cc._RF.push(e,"c7256ckVABFvpUcTGpeWtHV","TochHandler"),t("GameManager"),cc.Class({extends:cc.Component,properties:{block:{default:null,type:cc.Prefab},canvas:cc.Node,Player:{default:null,type:cc.Node},offset:192,ok:40,audioSource:{default:null,type:cc.AudioSource}},onLoad:function(){this.node.on(cc.Node.EventType.TOUCH_START,function(t){t.getTouches()[0].getLocation(),this.NoPlatformAboveBird()&&0==Global.GameOver&&this.GenerateNewBlock()},this)},start:function(){},update:function(){this.node.setPosition(this.Player.getPosition().x+this.offset,this.node.getPosition().y)},GenerateNewBlock:function(){if(1!=Global.GameOver&&1!=Global.GamePause){var t=this.Player.getPosition().add(cc.v3(0,10,0));this.Player.position=this.Player.position.add(cc.v3(0,this.Player.height/2+10,0));var e=cc.instantiate(this.block);e.parent=this.canvas,e.setPosition(t),this.play()}},NoPlatformAboveBird:function(){for(var t=this.Player.parent.convertToWorldSpaceAR(this.Player.getPosition()),e=this.Player.parent.convertToWorldSpaceAR(this.Player.getPosition().add(cc.Vec3.UP.mul(64))),i=cc.director.getPhysicsManager().rayCast(t,e,cc.RayCastType.All),n=0;n<i.length;n++){var o=i[n];if(3==o.collider.tag)return!1;o.point,o.normal,o.fraction}return!0},play:function(){this.audioSource.play()},pause:function(){this.audioSource.pause()}}),cc._RF.pop()},{GameManager:"GameManager"}],encryption_1:[function(t,e){"use strict";cc._RF.push(e,"6a5c8ttgtVH4JdW3bieYiNo","encryption_1");var i={jkldjs:[],hgsdg:[],outyou:function(t){return t+100},hiosdhfoe:function(t){return t+79156},dsafger:function(t){return 2*t},eryewry:function(t){return t-50},d:function(t){return 4*t},eijwuioewj:function(t){return t+3681},kryr:function(t){return t+2},rqewrqwe:function(t){return t-3},mnkdshfo:function(t){return t-46218},sedryerw:function(t){return 2*t},kuyto:function(t){return t+15},dsgwer:function(t){return t-6},j:function(t){return t-9},iuyi567:function(t){return t-100},ioeks:function(t){return t+91},qoiwhdksh:function(t){return t-7613},wqterwt:function(t){return t+1575},klilot:function(t){return t-325},ewtrey5er:function(t){return t-3481},utertyur:function(t){return t+6848},sdfyery:function(t){return t-45},ikuyiyt:function(t){return t+26},euwhsdn:function(t){return t-81},sdrfyer:function(t){return 3*t},hduy:function(t){return t+5},jghity:function(t){return t-6515},getInfo:function(t,e,i){this.dfdsfds();var n=this.fdsfdsfnb(t),o=this.lkdsjgd();this.dfdsfds();var a=this.fdsfdsfnb(e),s=this.lkdsjgd();return{number_0:1,number_1:n,number_2:a,number_3:this.fdsfdsfnb(i),number_4:o,number_5:s,number_6:this.lkdsjgd()}},yrw6yery:function(t){return t+1231},kghty:function(t){return t-45356},dsgreger:function(t){return t+35648},uertdfh:function(t){return t-3549},hjkdnfds:function(t){return t-985},beryerw:function(t){return t+8481},ijlhfew:function(t){return t+874},gdfsr3t:function(t){return t-9895},greger:function(t){return 2*t},kgigi:function(t){return t+17},khdfkjsdhfk:function(t){return t+28},dfdsfew:function(t){return t+17},dfger:function(t){return t+14},thrthfgh:function(t){return t+8},etygdg:function(t){return t+13},sdfdsgd:function(){var t=this.kgigi(0);return t=this.khdfkjsdhfk(t),t=this.dfdsfew(t),t=this.dfger(t),t=this.thrthfgh(t),this.etygdg(t)},fdsjfhw:function(t,e){var i=e-t,n=Math.random();return t+Math.round(n*i)},ehfjkeshfkds:function(t,e){return 1==e?this.hduy(t):2==e?this.ioeks(t):3==e?this.ijlhfew(t):4==e?this.eijwuioewj(t):5==e?this.hiosdhfoe(t):6==e?this.euwhsdn(t):7==e?this.hjkdnfds(t):8==e?this.qoiwhdksh(t):9==e?this.mnkdshfo(t):void 0},sdhkas:function(){this.jkldjs.push({}),this.jkldjs.push(hduy),this.jkldjs.push(ioeks),this.jkldjs.push(ijlhfew),this.jkldjs.push(eijwuioewj),this.jkldjs.push(hiosdhfoe),this.jkldjs.push(euwhsdn),this.jkldjs.push(hjkdnfds),this.jkldjs.push(qoiwhdksh),this.jkldjs.push(mnkdshfo)},dfdsfds:function(){this.hgsdg=[],this.hgsdg.push("1");for(var t=1;t<10;t++){var e=this.fdsjfhw(1,9);this.hgsdg.push(e+"")}},encryption:function(t){return t},fdsfdsfnb:function(t){for(var e=1;e<10;e++){var i=parseInt(this.hgsdg[e]);t=this.ehfjkeshfkds(t,i)}return t*this.sdfdsgd()},lkdsjgd:function(){for(var t="",e=9;e>0;e--)t+=this.hgsdg[e];return parseInt(t)}};e.exports=i,cc._RF.pop()},{}],"mx-game-emulator":[function(t,e){"use strict";cc._RF.push(e,"04b1eyxAxZGNLkjSfXhKSuV","mx-game-emulator"),cc._RF.pop()},{}],particlestest:[function(t,e){"use strict";cc._RF.push(e,"190a8fDt0lHiZwvpXC67wYU","particlestest"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){},start:function(){}}),cc._RF.pop()},{}],plusoneanimation:[function(t,e){"use strict";cc._RF.push(e,"3cb6fgkQ65CwoG164r1edcu","plusoneanimation"),cc.Class({extends:cc.Component,properties:{animationtime:1,upwardmovementspeed:2,sidespeed:370,startPosition:cc.v2(0,0),shouldanimate:!0,timer:0},start:function(){this.timer=this.animationtime},update:function(t){this.shouldanimate&&(this.node.y+=t*this.upwardmovementspeed,this.timer-=t),this.timer<0&&(this.shouldanimate=!1,this.timer=0,this.node.destroy())}}),cc._RF.pop()},{}]},{},["Block","Bullet","CameraController","Config","DestroyAfterTime","EagleScript","FollowPlayer","GameManager","Global","MxPlayer","ObstacleMovements","PerfectAnimation","PhysicsRelated","PlayerController","SpawnManager","TochHandler","encryption_1","mx-game-emulator","particlestest","plusoneanimation"]);