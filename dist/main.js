(()=>{"use strict";class t{constructor(t,i){this.name="xBoost",this.x=t,this.y=i,this.width=80,this.height=20,this.color="#8AC926"}}class i{constructor(t,i){this.name="yBoost",this.x=t,this.y=i-100,this.width=40,this.height=120,this.color="#CDE7B0"}}class s{constructor(t,i){this.name="fullBounce",this.x=t,this.y=i,this.width=40,this.height=40,this.color="#FCF300"}}class h{constructor(t,i){this.name="halfBounce",this.x=t,this.y=i,this.width=40,this.height=40,this.color="#F9627D"}}class e{constructor(t,i){this.name="fullEnergy",this.x=t,this.y=i,this.width=40,this.height=40,this.color="purple"}}class a{constructor(t,i){this.name="lastChance",this.x=t,this.y=i-40,this.width=80,this.height=40,this.color="#FFBA08"}}const n=196,o=new Image,r=new Image;function d(t,i){return t=Math.ceil(t),i=Math.floor(i),Math.floor(Math.random()*(i-t)+t)}class l{constructor(t,i,s,h){this.startY=i,this.x=t,this.y=i,this.width=s,this.height=h,this.color="#F7F4EA"}}var g=document.getElementById("gameWindow"),c=g.getContext("2d");const y=g.height+30,w=g.width/8,u=g.width/2,m=-10*g.height,v=g.height-60;var x=new class{constructor(t,i,s){this.size=40,this.x=t,this.vx=0,this.ax=0,this.y=i,this.vy=0,this.ay=0,this.maxVelY=40,this.energyY=20,this.energyX=n,this.arrowEndX=t+30,this.arrowEndY=i-30,this.dir="grow",this.groundHeight=s,this.lost=!1,this.dt=.5,this.bounceType=0,this.color="#FF9505",o.src="../images/Fish.png",r.src="../images/Wing.png",this.flapAngle=0,this.flapDir=0,this.drawEnergy=this.drawEnergy.bind(this),this.shouldSkip=this.shouldSkip.bind(this),this.giveLastChance=this.giveLastChance.bind(this),this.startGame=this.startGame.bind(this)}draw(t=!1){var i=document.getElementById("gameWindow"),s=i.getContext("2d");let h=i.height/2,e=i.width/8;if(t)return s.beginPath(),s.drawImage(o,this.x-36+4,this.y-20,72,40),s.drawImage(r,this.x-10,this.y+6,20,12),s.closePath(),this.x,i.height,this.size,"shrink"===this.dir?(this.arrowEndY+=1,this.arrowEndX-=1,this.arrowEndY>i.height-this.size-30&&(this.dir="grow")):"grow"===this.dir&&(this.arrowEndY-=1,this.arrowEndX+=1,this.arrowEndY<i.height-this.size-90&&(this.dir="shrink")),void s.setTransform(1,0,0,1,0,0);{s.beginPath(),s.save(),s.arc(this.x,this.y,this.size,0,2*Math.PI),s.translate(this.x,this.y);let t=Math.atan(this.vy/this.vx)+Math.PI/16;s.rotate(t),s.translate(-this.x,-this.y),s.drawImage(o,this.x-36,this.y-20,72,40),s.restore(),s.save(),s.translate(this.x,this.y),s.rotate(t),s.translate(-this.x,-this.y),s.translate(this.x+10,this.y+6),this.flapDir?-24===this.flapAngle?this.flapDir=0:this.flapAngle-=8:24===this.flapAngle?this.flapDir=1:this.flapAngle+=8,s.rotate(this.flapAngle*Math.PI/180),s.translate(-this.x-10,-this.y-6),s.drawImage(r,this.x-10,this.y+6,20,12),s.restore(),this.bounceType&&this.giveShield(),s.closePath(),this.drawEnergy(i)}this.vx>0?this.vx-=this.ax*this.dt:this.vx=0,this.x+=this.vx,s.translate(-this.vx,0),this.vy!==this.maxVelY&&(this.vy+=this.ay*this.dt),this.y<this.groundHeight||this.vy<0?(this.y+=this.vy*this.dt,this.y<h?(s.translate(0,-this.vy*this.dt),this.energyY+=this.vy*this.dt):(s.setTransform(1,0,0,1,0,0),s.translate(e-this.x,0),this.energyY=20)):0!==this.bounceType?(this.vy=-this.bounceType*this.vy,this.bounceType=0,this.color="#FF9505"):this.shouldSkip()?this.vy=-1*Math.abs(this.vy):(this.vy=0,this.x=0,this.lost=!0)}drawEnergy(t){this.lost||(this.energyX=Math.min(n,this.energyX+.4));var i=t.getContext("2d");i.beginPath(),i.rect(this.x+t.width-350,this.energyY,200,20),i.fillStyle="#090809",i.fill(),i.closePath(),i.beginPath(),i.rect(this.x+t.width-348,this.energyY+2,this.energyX,16),i.fillStyle="#D7263D",i.fill(),i.closePath(),i.beginPath(),i.rect(this.x+t.width-348+25,this.energyY-2,2,20),i.fillStyle="#FF9505",i.fill(),i.closePath()}shouldSkip(){return console.log(this.vx,Math.atan(this.vy/this.vx)),Math.atan(this.vy/this.vx)<.52&&this.vx>10}reset(t,i){this.x=t,this.vx=0,this.ax=0,this.y=i,this.vy=0,this.ay=0,this.lost=!1,this.energyX=n}flap(){0!==this.vx||0!==this.vy?this.energyX>=25&&(this.energyX=Math.max(this.energyX-25,0),this.vy=Math.max(this.vy-15,-20),this.vx=Math.min(this.vx+3,35)):this.startGame()}startGame(){this.energyX=n,this.ax=.2,this.vx=30,this.vy=-40,this.ay=1}applyItem(t){"xBoost"===t?this.giveBoost():"fullBounce"===t?(this.giveBounce(1.5),this.color="#FCF300"):"halfBounce"===t?(this.giveBounce(.75),this.color="#F9627D"):"fullEnergy"===t?this.energyX=n:"yBoost"==t?(this.vy-=5,this.vx=Math.max(this.vx,5)):"lastChance"==t&&this.giveLastChance()}giveBounce(t){this.bounceType=t}giveBoost(){this.vx=Math.min(this.vx+20,35)}giveLastChance(){this.vx=Math.max(30,this.vx+10),this.vy=-35}giveShield(){var t=document.getElementById("gameWindow").getContext("2d");t.save(),t.arc(this.x,this.y,this.size,0,2*Math.PI),t.globalAlpha=.6,t.fillStyle=this.color,t.fill(),t.restore()}}(w,y,v),f=new class{constructor(){this.items=[],this.notSpecialItem=this.notSpecialItem.bind(this)}drawItems(t,i,s){var h="",e=document.getElementById("gameWindow").getContext("2d");this.items.length>0&&this.items[0].width+this.items[0].x<t&&this.items.shift();for(let a of this.items){let n=10,o=a.x-n,r=a.x+a.width+n,d=a.y-n,l=a.y+a.height+n;i<r&&i>o&&s<l&&s>d&&(h=a.name,this.notSpecialItem(a.name)&&(a.x=t-a.width)),e.beginPath(),e.rect(a.x,a.y,a.width,a.height),e.fillStyle=a.color,e.fill(),e.closePath()}return h}notSpecialItem(t){return"yBoost"!==t}},p=new class{constructor(t,i){this.groundObjs=[0,t,2*t],this.y=i,this.heigth=100,this.canvas=document.getElementById("gameWindow"),this.wave1=new Image,this.w1Height=5,this.w1Dir=0,this.wave2=new Image,this.w2Height=0,this.w2Dir=0,this.wave3=new Image,this.w3Height=-5,this.w3Dir=1}draw(t){var i=this.canvas.getContext("2d");this.groundObjs[0]+this.canvas.width<t&&(this.groundObjs.shift(),this.groundObjs.push(this.groundObjs[this.groundObjs.length-1]+this.canvas.width));for(const t of this.groundObjs)i.beginPath(),this.wave1.src="../images/wave3.png",this.w1Dir?this.w1Height>8?this.w1Dir=0:this.w1Height+=.05:this.w1Height<-10?this.w1Dir=1:this.w1Height-=.05,this.wave2.src="../images/wave2.png",this.w2Dir?this.w2Height>8?this.w2Dir=0:this.w2Height+=.03:this.w2Height<-10?this.w2Dir=1:this.w2Height-=.03,this.wave3.src="../images/wave1.png",this.w3Dir?this.w3Height>8?this.w3Dir=0:this.w3Height+=.05:this.w3Height<-10?this.w3Dir=1:this.w3Height-=.05,i.drawImage(this.wave3,t,this.y+this.w3Height-15,this.canvas.width,80),i.drawImage(this.wave2,t,this.y+this.w2Height-10,this.canvas.width,80),i.drawImage(this.wave1,t,this.y+this.w1Height-5,this.canvas.width,80),i.closePath()}addHorizontalMarkers(t,i,s){var h=this.canvas.getContext("2d");for(let e=1;e<50;++e){let a=this.canvas.height-e*i,n=5*e;Math.abs(s-a)<this.canvas.height&&(h.beginPath(),h.rect(t,a,this.canvas.width,2),h.fillStyle="#090809",h.font="16px Pusab",h.fillText(n+"m",t,a-2),h.fill(),h.closePath())}}addObj(t){this.groundObjs.push(t)}}(g.width,v),b=new class{constructor(){this.clouds=[],this.addCloud=this.addCloud.bind(this)}addCloud(t,i,s){let h=d(s=Math.min(s,0),i-300+s),e=new l(t,h,300,100);this.clouds.push(e)}resetClouds(){this.clouds[0].x=d(10,this.clouds[0].width);for(let t=1;t<this.clouds.length;++t)this.clouds[t].x=this.clouds[t-1].x+d(this.clouds[t-1].width+100,this.clouds[t-1].width+600)}draw(t,i,s){var h=document.getElementById("gameWindow"),e=h.getContext("2d");e.save(),e.globalCompositeOperation="destination-over",e.globalAlpha=.8;for(let t of this.clouds)t.x=t.x+.8*i,t.y=t.y+.2*s,e.beginPath(),e.rect(t.x,t.y,t.width,t.height),e.fillStyle=t.color,e.fill(),e.closePath();if(e.restore(),0!=this.clouds.length&&this.clouds[0].x<t-this.clouds[0].width){let i=d(h.width,h.width+100);this.addCloud(t+i,h.height,this.clouds[0].y-this.clouds[0].startY),this.clouds.shift()}}};b.addCloud(d(0,g.width/4),g.height,0),b.addCloud(d(g.width/2,g.width),g.height,0),g.width,g.width;var I=!1;function B(){var n=x.x-w,o=x.y-g.height/2;if(I){document.getElementById("score").innerText=parseInt(n/10),c.clearRect(n,o-g.height,g.width+100,2*g.height);let r=d(0,100+500/x.vx),l=n+g.width,B=Math.max(o-2*g.height,m),E=d(Math.min(o+2*g.height,v-100),B);r<3?f.items.push(new t(l,E)):r<4?f.items.push(new s(l,E)):r<6?f.items.push(new h(l,E)):r<8?f.items.push(new e(l,E)):r<18?f.items.push(new i(l,E)):r<19&&f.items.push(new a(l,v)),p.draw(n),function(t){p.addHorizontalMarkers(t,u,x.y)}(n);let C=f.drawItems(n,x.x,x.y);if(""!==C&&x.applyItem(C),x.draw(),x.y>=g.height/2?b.draw(n,x.vx,0):b.draw(n,x.vx,x.vy),x.lost)return x.reset(w,y),document.getElementById("scoreMenu").style.display="flex",document.getElementById("finalScore").innerText=document.getElementById("score").innerText,document.getElementById("score").innerText="Press spacebar to start!",I=!1,f.items=[],p.groundObjs=[0,g.width,2*g.width],void b.resetClouds()}else c.clearRect(0,o-g.height,g.width+100,2*g.height),p.draw(n),x.draw(!0),b.draw(n,-1,0);requestAnimationFrame(B)}function E(){document.getElementById("score").style.display="none",document.body.insertAdjacentHTML("afterbegin",'\n    <div id="gameMenu">\n      <button id="playButton">Play</button>\n      <button id="instructionButton">How to Play</button>\n    </div>\n  ')}E?E():B();let C=document.getElementById("playButton"),M=(document.getElementById("instructionButton"),document.getElementById("replayButton"));C.addEventListener("click",(()=>{document.addEventListener("keydown",(function(t){32===t.keyCode?(x.flap(),I=!0):27===t.keyCode||80===t.keyCode?pauseGame():65===t.keyCode?x.giveLastChance():83===t.keyCode&&x.giveBoost()})),B(),document.getElementById("score").style.display="flex",document.getElementById("gameMenu").outerHTML=""})),M.addEventListener("click",(()=>{document.getElementById("scoreMenu").style.display="none",B()}))})();