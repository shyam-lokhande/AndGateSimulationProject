namespace Geometry{
    export class Point{
        public x:number;
        public y:number;
        constructor(x:number,y:number){
            this.x=x;
            this.y=y;
        }
    }
    export class Circle{
        public center:Point;
        public radius:number;
        public colour:string;
        private count:number=0;
        private context:CanvasRenderingContext2D;
    
        constructor(center:Point,radius:number,colour:string,context:CanvasRenderingContext2D){
            this.center=center;
            this.radius=radius;
            this.colour=colour;
            this.context=context;
        }
    
        draw(){
            this.context.beginPath();
            this.context.arc(this.center.x,this.center.y,this.radius,0,2*Math.PI,false);
            this.context.fillStyle=this.colour;
            this.context.lineWidth=1;
            this.context.strokeStyle="black";
            this.context.fill();
            this.context.stroke();
        }

        isinside(pt:Point){
            var dist= Math.sqrt(Math.pow(pt.x-this.center.x,2)+Math.pow(pt.y-this.center.y,2));
            if(this.radius>=dist){
                return true;
            }
            else{
                return false;
            }
        }

        Rotate(RotateCenter:Point,RotateRadius:number){
            this.count++;
            this.center.x = RotateCenter.x + (RotateRadius - this.radius) * Math.cos(this.count * Math.PI/180);
            this.center.y = RotateCenter.y + (RotateRadius - this.radius) * Math.sin(this.count * Math.PI/180);
            context.clearRect(0,0,canvas.width,canvas.height);
            redraw();
            if(this.count>=360){
                this.count=0;
            }
        }
    }
    
    export class Rectangle{
        private point:Point;
        private length:number;
        private height:number;
        private context:CanvasRenderingContext2D;
    
        constructor(point:Point,length:number,height:number,context:CanvasRenderingContext2D){
            this.point=point;
            this.length=length;
            this.height=height;
            this.context=context;
        }
    
        draw(){
            this.context.beginPath();
            this.context.rect(this.point.x-(this.length/2),this.point.y-(this.length/2),this.length,this.height);
            this.context.fillStyle="blue";
            this.context.strokeStyle="black";
            this.context.lineWidth=2;
            this.context.fill();
            this.context.stroke();
        }
    }

    export class line{
        private context:CanvasRenderingContext2D;
        public from_x:number;
        public to_x:number;
        public from_y:number;
        public to_y:number;
        private ang1:number=0;
        private ang2:number=135;
        private _length:number;
        
        constructor(from_x:number,from_y:number, to_x:number,to_y:number,context:CanvasRenderingContext2D){
           this.from_x=from_x;
           this.to_x=to_x;
           this.from_y=from_y;
           this.to_y=to_y;
            this.context=context;
            this._length=this.length;
        }

        private get length(){
            var len = Math.sqrt(Math.pow(this.from_x-this.to_x,2)+Math.pow(this.from_y-this.to_y,2))
            return len
        }
        
        draw(){
            this.context.beginPath();
            this.context.moveTo(this.from_x,this.from_y);
            this.context.lineTo(this.to_x,this.to_y);
            this.context.strokeStyle="yellow";
            this.context.lineWidth=3;
            this.context.stroke();this.context.restore();
        }

        SwiperSetOn(){
            if(this.ang1>=-45 && this.ang1<=46){
                this.to_x = this.from_x + this._length * Math.cos(this.ang1 * Math.PI/180);
                this.to_y = this.from_y + this._length * Math.sin(this.ang1 * Math.PI/180);
                if(this.ang1>45){
                    this.ang2=45;
                }
                this.ang1++;
            }
            else if(this.ang2>=45 && this.ang2<=136 && this.ang1>45){
                this.to_x = this.from_x + this._length * Math.sin((this.ang2) * Math.PI/180);
                this.to_y = this.from_y + this._length * Math.cos((this.ang2) * Math.PI/180);
                if(this.ang2>135){
                    this.ang1=-45;
                }
                this.ang2++;
            }
            context.clearRect(0,0,canvas.width,canvas.height);
            redraw();
        }
    }

    export class AndGate{
        private _location_of_gate:Point;
        private context:CanvasRenderingContext2D;
        private _radius:number;

        constructor(location_of_gate:Point,radius:number,context:CanvasRenderingContext2D){
            this._location_of_gate=location_of_gate;
            this._radius=radius;
            this.context=context;
        }

        draw(){
            this.context.beginPath();
            this.context.arc(this._location_of_gate.x,this._location_of_gate.y,this._radius,Math.PI*3/2,Math.PI/2,false);
            //upward horizontal line of gate
            this.context.moveTo(this._location_of_gate.x,this._location_of_gate.y-this._radius);
            this.context.lineTo(this._location_of_gate.x-2*this._radius,this._location_of_gate.y-this._radius);
            //downwrd horizontal line at middle path
            this.context.moveTo(this._location_of_gate.x,this._location_of_gate.y+this._radius);
            this.context.lineTo(this._location_of_gate.x-2*this._radius,this._location_of_gate.y+this._radius);
            //vertical line of gate
            this.context.moveTo(this._location_of_gate.x-2*this._radius,this._location_of_gate.y-this._radius);
            this.context.lineTo(this._location_of_gate.x-2*this._radius,this._location_of_gate.y+this._radius);
            this.context.lineWidth=2;
            this.context.strokeStyle="black";
            this.context.stroke();
        }
    }

    export class connect{
        private _start_pt_x:number;
        private _start_pt_y:number;
        private _end_pt_x:number;
        private _end_pt_y:number;
        public colour:string;
        private context:CanvasRenderingContext2D;

        constructor(start_pt_x:number,start_pt_y:number,end_pt_x:number,end_pt_y:number,colour:string,context:CanvasRenderingContext2D){
            this._start_pt_x=start_pt_x;
            this._end_pt_x=end_pt_x;
            this._start_pt_y=start_pt_y;
            this._end_pt_y=end_pt_y;
            this.colour=colour;
            this.context=context;
        }

        draw(){
            this.context.beginPath();
            //start to middle upper line
            this.context.moveTo(this._start_pt_x,this._start_pt_y);
            this.context.lineTo((this._end_pt_x+this._start_pt_x)/2,this._start_pt_y);
            //vertical line at middle of path
            this.context.moveTo((this._end_pt_x+this._start_pt_x)/2,this._start_pt_y);
            this.context.lineTo((this._end_pt_x+this._start_pt_x)/2,this._end_pt_y);
            //again middle to end line
            this.context.moveTo((this._end_pt_x+this._start_pt_x)/2,this._end_pt_y);
            this.context.lineTo(this._end_pt_x,this._end_pt_y);
            this.context.lineWidth=3;
            this.context.strokeStyle=this.colour;
            this.context.stroke();
        }
    }

    export class Text{
        public text:string;
        private X:number;
        private Y:number;
        constructor(Text:string,x:number,y:number){
            this.text = Text;
            this.X = x;
            this.Y = y;
        }
        Draw(){
            context.font= '16pt Calibri';
            context.fillStyle= 'Black';
            context.fillText(this.text,this.X,this.Y);
        }
    }
}