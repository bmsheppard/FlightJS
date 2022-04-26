(()=>{"use strict";class t{constructor(t,i){this.name="xBoost",this.x=t,this.y=i,this.width=80,this.height=20,this.color="#8AC926"}}class i{constructor(t,i){this.name="fullBounce",this.x=t,this.y=i,this.width=40,this.height=40,this.color="#FCF300"}}class h{constructor(t,i){this.name="halfBounce",this.x=t,this.y=i,this.width=40,this.height=40,this.color="#F9627D"}}function s(t,i){return t=Math.ceil(t),i=Math.floor(i),Math.floor(Math.random()*(i-t)+t)}class e{constructor(t,i,h,s){this.x=t,this.startY=i,this.y=i,this.width=h,this.height=s,this.color="#F7F4EA"}}var o=document.getElementById("gameWindow"),a=o.getContext("2d");const n=o.height/2,d=o.width/8,l=o.width/2,c=-10*o.height,r=o.height-20;var g=new class{constructor(t,i){this.size=20,this.x=t,this.vx=0,this.ax=0,this.y=i,this.vy=0,this.ay=0,this.maxVel=40,this.lost=!1,this.dt=.5}draw(){var t=document.getElementById("gameWindow"),i=t.getContext("2d");let h=t.height/2,s=t.width/8;i.beginPath(),i.arc(this.x,this.y,this.size,0,2*Math.PI),i.fillStyle="#FF9505",i.fill(),i.closePath(),i.restore(),this.vx>0?this.vx-=this.ax*this.dt:this.vx=0,this.x+=this.vx,i.translate(-this.vx,0),this.vy!==this.maxVel&&(this.vy+=this.ay*this.dt),this.y<t.height-this.size||this.vy<0?(this.y+=this.vy*this.dt,this.y<h?i.translate(0,-this.vy*this.dt):(i.setTransform(1,0,0,1,0,0),i.translate(s-this.x,0))):0!==this.bounceType?(this.vy=-this.bounceType*this.vy,this.bounceType=0):(this.vy=0,this.lost=!0)}reset(t,i){this.x=t,this.vx=0,this.ax=0,this.y=i,this.vy=0,this.ay=0,this.lost=!1}flap(){if(0===this.vx&&0===this.vy)return this.vx=15,this.ax=.1,this.vy=-10,void(this.ay=1);this.vy=-15,this.vx+=.1}applyItem(t){"xBoost"===t?this.giveBoost():"fullBounce"===t?this.giveBounce(1.5):"halfBounce"===t&&this.giveBounce(.75)}giveBounce(t){this.bounceType=t}giveBoost(){this.vx+=10}giveLastChance(){console.log("Does nothing right now")}}(d,n),u=new class{constructor(){this.items=[]}drawItems(t,i,h){var s="",e=document.getElementById("gameWindow").getContext("2d");this.items.length>0&&this.items[0].width+this.items[0].x<t&&this.items.shift();for(let o of this.items){let a=10,n=o.x-a,d=o.x+o.width+a,l=o.y-a,c=o.y+o.height+a;i<d&&i>n&&h<c&&h>l&&(s=o.name,o.x=t-o.width),e.beginPath(),e.rect(o.x,o.y,o.width,o.height),e.fillStyle=o.color,e.fill(),e.closePath()}return s}},y=new class{constructor(t,i){this.groundObjs=[0,t,2*t],this.y=i,this.heigth=50,this.canvas=document.getElementById("gameWindow")}draw(t){var i=this.canvas.getContext("2d");this.groundObjs[0]+this.canvas.width<t&&(this.groundObjs.shift(),this.groundObjs.push(this.groundObjs[this.groundObjs.length-1]+this.canvas.width));for(const t of this.groundObjs){let h=10*t/this.canvas.width;i.beginPath(),i.rect(t,this.canvas.height-20,this.canvas.width,50),i.rect(t,this.canvas.height-40,10,60),i.font="20px Roboto",i.fillStyle="#4A5899",i.fillText(h+"m",t,this.canvas.height-50),i.fill(),i.closePath()}}addHorizontalMarkers(t,i,h){var s=this.canvas.getContext("2d");for(let e=1;e<50;++e){let o=this.canvas.height-e*i,a=5*e;Math.abs(h-o)<this.canvas.height&&(s.beginPath(),s.rect(t,o,this.canvas.width,2),s.fillStyle="#090809",s.font="20px Roboto",s.fillText(a+"m",t,o-2),s.fill(),s.closePath())}}addObj(t){this.groundObjs.push(t)}}(o.width,r),v=new class{constructor(){this.clouds=[],this.addCloud=this.addCloud.bind(this)}addCloud(t,i,h){let o=s(h=Math.min(h,0),i-300+h),a=new e(t,o,300,100);console.log(h,o,i),this.clouds.push(a)}draw(t,i,h){var s=document.getElementById("gameWindow"),e=s.getContext("2d");for(let t of this.clouds)t.x=t.x+.8*i,t.y=t.y+.2*h,e.beginPath(),e.rect(t.x,t.y,t.width,t.height),e.fillStyle=t.color,e.fill(),e.closePath();0!=this.clouds.length&&this.clouds[0].x<t-this.clouds[0].width&&(this.addCloud(t+s.width,s.height,this.clouds[0].y-this.clouds[0].startY),this.clouds.shift())}};v.addCloud(s(0,o.width/4),o.height,0),v.addCloud(s(o.width/2,o.width),o.height,0),o.width,o.width;var w=!1;!function e(){var x=g.x-d,m=g.y-n;if(w){let e=s(0,100),a=x+o.width,n=Math.max(m-2*o.height,c),d=s(Math.min(m+2*o.height,r-100),n);e<3?u.items.push(new t(a,d)):e<6?u.items.push(new i(a,d)):e<9&&u.items.push(new h(a,d))}a.clearRect(x,m-o.height,o.width,2*o.height),y.draw(x),g.y>=o.height/2?v.draw(x,g.vx,0):v.draw(x,g.vx,g.vy),function(t){y.addHorizontalMarkers(t,l,g.y)}(x);let f=u.drawItems(x,g.x,g.y);""!==f&&g.applyItem(f),g.draw(),g.lost&&(alert("Game over!"),g.reset(d,n),w=!1,u.items=[],y.groundObjs=[0,o.width,2*o.width]),requestAnimationFrame(e)}(),document.addEventListener("keydown",(function(t){32===t.keyCode&&(g.flap(),w=!0)})),document.addEventListener("keydown",(function(t){65===t.keyCode?g.giveBounce():83===t.keyCode||68===t.keyCode?g.giveBoost():70===t.keyCode&&g.giveLastChance()}))})();