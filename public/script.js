var login = document.getElementById('login');

login.addEventListener('click', function(){
    window.location.href = '/admin';
});

var stageWrap = document.getElementById('petal-stage-wrap');
var stage = document.getElementById('petal-stage');
var stageWidth  = stageWrap.clientWidth;
var stageHeight = stageWrap.clientHeight;
var petalNum = 30;
var petalObjArr = [];
var g = 0.00004;
var w = 0;
var wDeg = 0;
var fps = 60;
var frameTime = 1000 / fps;

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getDegree = function(radian) {
  return radian / Math.PI * 180;
};

var getRadian = function(degrees) {
  return degrees * Math.PI / 180;
};

var petal = function(num) {
  this.elm  = document.createElement('div');
  this.size = 's';
  this.t    = 0;
  this.x    = 0;
  this.vx   = 0;
  this.py   = 0;
  this.y    = 0;
  this.rotateY = 0;
  this.rotateYUnit = getRandomInt(30, 80) / frameTime;
  this.rotateZ = getRandomInt(-45, 45);

  if (num % 3 == 1) this.size = 'm';
  if (num % 3 == 2) this.size = 'l';

  this.elm.id = 'petal-' + num;
  this.elm.className = 'petal-model petal-model-' + this.size;
  this.elm.innerHTML = '<img src="https://cloud.githubusercontent.com/assets/2573931/13498798/54546bc0-e153-11e5-8948-d953ca128cc9.png" alt="" />';
};

petal.prototype.init = function() {
  var deg = getRandomInt(0, 90);
  this.t  = 0;
  this.x  = getRandomInt(100, 1000) * -1;
  this.vx = getRandomInt(1, 5);
  this.py = getRandomInt(-100, stageHeight / 2);
};

petal.prototype.build = function() {
  stage.appendChild(this.elm);
  this.init();
};

petal.prototype.move = function() {
  this.t += frameTime;
  this.x += this.vx + w;
  this.y = 1 / 2 * g * this.t * this.t + this.py;
  this.elm.style.top = this.y + 'px';
  this.elm.style.left = this.x + 'px';
};

petal.prototype.rotate = function() {
  this.rotateY += this.rotateYUnit;
  this.elm.style.transform = 'rotateZ(' + this.rotateZ + 'deg) rotateY(' + this.rotateY + 'deg)';
};

petal.prototype.reset = function() {
  if (this.x < stageWidth && this.y < stageHeight) return;
  this.init();
};

var petalObjRender = function() {
  for (var i = 0; i < petalObjArr.length; i++) {
    petalObjArr[i].move();
    petalObjArr[i].rotate();
    petalObjArr[i].reset();
  }
};

var blowWind = function() {
  wDeg += 0.2;
  w = Math.pow(Math.sin(getRadian(wDeg)) + 1, 2);
};

var init = function() {
  for (var i = 0; i < petalNum; i++) {
    petalObjArr[i] = new petal(i);
    petalObjArr[i].build();
  }

  setInterval(function() {
    petalObjRender();
    blowWind();
  }, frameTime);
};

init();
