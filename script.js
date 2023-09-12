const canvas= document.getElementById('canvas');

console.log('r/place');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

let mouse = {
    x : undefined,
    y: undefined

}

let maxRadius = 60;
//let minRadius = 2;
let colorArray = ['#03254c','#660000','#939393','#78AED3'];

window.addEventListener('mousemove', function(event){
    console.log(event);
    mouse.x = event.x;
    mouse.y = event.y;
    console.log('mouse');
})

window.addEventListener('resize', ()=>{
    
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
} )

function Circles(x, y,dx, dy , radius ){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.minRadius = radius;
    this.radius = radius;
    this.color =  colorArray[Math.floor(Math.random()*colorArray.length)] ;
    
    

    this.draw = function(){
        c.beginPath()
        c.arc( this.x, this.y , this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    };

    this.update = function(){
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
          this.dx = -this.dx;
        };
    
        if(this.y + this.radius > innerHeight ||this.y - this.radius < 0){
            this.dy = -this.dy;
        };
    
        this.x += this.dx;
        this.y += this.dy;
 
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 &&  mouse.y - this.y > -50){
           if(this.radius < maxRadius){
                     this.radius += 1;
           }
        }else if(this.radius > this.minRadius){
            this.radius -= 1;
        }

        this.draw();

    }
}



let circleArray = [];

for(let i= 0; i < 800; i++){
     let radius = Math.random() * 3 + 1 ;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight -radius * 2) + radius; 
    let dx = (Math.random() - 0.5) * 8;
    let dy = (Math.random() - 0.5) * 8;
   
    circleArray.push(new Circles(x,y, dx,dy,radius));
}




const animate = () =>{
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth, innerHeight);
    
    for(let i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }

    

}

animate();
