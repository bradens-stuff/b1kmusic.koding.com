document.body.appendChild((function(){
    canvas = document.createElement('canvas');
    canvas.width = W = 500;
    canvas.height = H = 500;
    canvas.tabIndex = 0;
    return canvas;
})());
var ctx = canvas.getContext('2d'), rand = Math.random, runtime = {}, key = [], lives, gameOver, ball_id, runtime_length;

RB32 = function(){//Random Base 32
    return Math.floor(rand()*10000).toString(32);
};

render = function(obj,fill){//renders a rectangle based on the
    ctx.save();
    ctx.fillStyle = fill||'#FFF';
    ctx.fillRect(obj.x,obj.y,obj.w,obj.h);
    ctx.restore();
};

add = function(obj){//Safely adds a Class to runtime by making sure the id is unique. Without this, one Class can overwrite another.
    var newId = RB32();
    for(var i in runtime){//checks if the generated id matches an existing id
        var a = i, b = newId;
        if(a === b){//if id exists
            add(obj);//retry
            console.log('An id '+i+' already exists in Class '+runtime[i].type+'.\nGenerating new id for Class '+obj.type+'...');//Note it
            return false;//stop function from completing execution
        }
    }
    obj.id = newId;
    runtime[obj.id] = obj;
};

remove = function(obj){
    delete runtime[obj.id];
};

collision = function(a,b){
  return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
};

Paddle = function(x,y,w,h,b){//This class creates a paddle.
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.b = b;//bullets enabled/disabled
    this.type = 'Paddle';
    this.run = function(){
        var ba = true;//bullets allowed
        if(key[37]){
            this.x-=10;
        }
        if(key[39]){
            this.x+=10;
        }
        if(key[32]){
            for(var i in runtime){
                if(runtime[i].type=='Bullet'){
                    ba = false;
                    break;
                }
            }
            if(ba&&!gameOver&&this.b){
                new Bullet(this.x+this.w/2,this.y-25);
            }
        }
        if(this.x>W-this.w){
            this.x-=10;
        }
        if(this.x<0){
            this.x+=10;
        }
        render(this);
    };
    add(this);
};

Brick = function(x,y,w,h){//This class crates a brick
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = 'Brick';
    this.run = function(){
        render(this);
    };
    add(this);
};

Ball = function(x,y,w,h,g){//This class creates a ball
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.g = g;//gravity enabled/disabled
    this.type = 'Ball';
    this.v = [rand()<0.5?-rand()*10:rand()*10,-10];
    this.run = function(){
        ball_id = this.id;
        this.x+=this.v[0];
        this.y+=this.v[1];
        if(this.g)this.v[1]+=0.5;
        if(this.x>W-this.w&&this.v[0]>0){
            this.v[0]=-this.v[0];
        }
        if(this.x<0&&this.v[0]<0){
            this.v[0]=-this.v[0];
        }
        if(this.y<0&&this.v[1]<0){
            this.v[1]=-this.v[1];
        }
        if(this.y>H-this.h&&this.v[1]>0){
            remove(this);
            if(lives){
                new Ball(W/2,H/2,10,10,this.g);
                lives--;
            }
        }
        for(var i in runtime){
            var obj = runtime[i];
            if(collision(this,obj)){
                if(obj.type=='Paddle'){
                    this.v[1] = -this.v[1];
                    if(this.x<obj.x+(obj.w/2)){
                        this.v[0]--;
                    }else{
                        this.v[0]++;
                    }
                }else if(obj.type=='Brick'){
                    remove(obj);
                    this.v[1] = -this.v[1];
                }
            }
        }
        render(this);
    };
    add(this);
};

Bullet = function(x,y){
    this.x = x;
    this.y = y;
    this.w = 5;
    this.h = 20;
    this.type = 'Bullet';
    this.run = function(){
        for(var i=0;i<4;i++){
            this.y-=10;
            for(var j in runtime){
                var obj = runtime[j];
                if(collision(this,obj)&&obj.type!=this.type){
                    remove(this);
                    if(obj.type == 'Brick'){
                        remove(obj);
                    }else if(obj.type == 'Ball'){
                        obj.v[1]-=5;
                    }
                    return false;
                }
            }
        }
        if(this.y<0){
            remove(this);
        }
        render(this);
    };
    add(this);
};

Info = function(x,y,l){//This class draws any information relevant to the game on the top of the screen
    lives = l;
    gameOver = false;
    this.x = x;
    this.y = y;
    this.type = 'Info';
    this.run = function(){
        var infotxt = '';
        infotxt+='LIVES: '+lives;//Lives
        if(runtime_length==4||runtime_length==3){//if runtime contains Paddle, Info, Control, Ball; or just Paddle, Info, Control
            infotxt+=' | YOU WON';
            gameOver = true;
            lives = 0;
        }else if(!(ball_id in runtime)){//There are bricks, but no ball.
            infotxt+=' | GAME OVER';
            gameOver = true;
        }else{
            gameOver = false;
        }
        infotxt+=' | PRESS R TO RESTART | PRESS M TO RETURN TO MENU';
        ctx.save();
        ctx.fillStyle='#fff';
        ctx.font='bold 12px monospace';
        ctx.fillText(infotxt,this.x,this.y);
        ctx.restore();
    };
    add(this);
};

Control = function(){//This class creates the keyboard interactivity and handles broad actions unspecific to a certain class
    this.type = 'Control';
    this.run = function(){
        var R = 'R'.charCodeAt(0), M = 'M'.charCodeAt(0);
        if(key[R]){
            game();
        }
        if(key[M]){
            menu();
        }
        canvas.onkeydown = canvas.onkeyup = function(e){
            key[e.keyCode] = e.type=='keydown';
            return false;
        };
    };
    add(this);
};

Menu = function(){//This Class handles the main menu
    mouse = {x:0,y:0,down:false};
    this.type = 'Menu';
    this.run = function(){
        for(var i in runtime){
            var obj = runtime[i];
            if(obj.type=='Menu_item'){
                ctx.save();
                ctx.fillStyle = '#ccc';
                ctx.beginPath();
                ctx.rect(obj.x,obj.y,obj.w,obj.h);
                if(ctx.isPointInPath(mouse.x,mouse.y)){
                    ctx.fillStyle = '#fff';
                    if(mouse.down){
                        if(obj.o == 'Game 1'){
                            game(1);
                            return false;
                        }else if(obj.o == 'Game 2'){
                            game(2);
                            return false;
                        }
                    }
                }
                ctx.fill();
                ctx.closePath();
                ctx.fillStyle = '#000';
                ctx.font = 'bold 16px Monospace';
                ctx.textAlign = 'center';
                ctx.fillText(obj.t,obj.x+obj.w/2,obj.y+obj.h-1);
                ctx.restore();
            }
        }
        canvas.onmousedown = function(){
            mouse.down = true;
        };
        canvas.onmouseup = function(){
            mouse.down = false;
        };
        canvas.onmousemove = function(e){
            mouse.x = (e.pageX||e.clientX||e.offsetX)-canvas.offsetLeft;
            mouse.y = (e.pageY||e.clientY||e.offsetY)-canvas.offsetTop;
            return false;
        };
    };
    add(this);
};

Menu_item = function(x,y,w,h,t,o){//This Class handles menu items. It is a subclass of Menu
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.t = t;//text
    this.o = o;//option
    this.type = 'Menu_item';
    this.run = function(){};
    add(this);
};

game = function(mode){//initialize game
    var gravity,bullets,lives;
    if(mode==1){gravity = bullets = false;lives = 5;}else if(mode==2){gravity = bullets = true;lives = 2;}
    runtime = {};
    new Paddle(W/2,H-20,100,10,bullets);
    new Ball(W/2,H/2,10,10,gravity);
    for(var i=12;i<112;i+=10){//10 rows
        for(var j=0;j<W;j+=50){//10 columns
            new Brick(j,i,48,8);
        }
    }
    new Info(0,10,lives);
    new Control();
};

menu = function(){//initialize menu
    runtime = {};
    new Menu();
    new Menu_item(W/2-100,H/2-20,200,16,'ORIGINAL - NO LASERS','Game 1');
    new Menu_item(W/2-100,H/2,200,16,'GRAVITY - LASERS','Game 2');
};

setInterval(function(){//Main Loop
    var a,b;
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0,W,H);
    //ctx.clearRect(0,0,W,H);
    runtime_length = 0;
    for(a in runtime){
        runtime_length++;
    }
    for(a in runtime){
        try{runtime[a].run();}catch(e){}
    }
    ctx.beginPath();for(b=0.5; b<H; b+=2){ctx.moveTo(0,b);ctx.lineTo(W,b);}ctx.stroke();ctx.closePath();//Scanlines
},1000/24);

menu();//Start up the menu
