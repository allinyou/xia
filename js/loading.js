window.onload = function(){
    var canvas = document.getElementById("loading"),
            context = canvas.getContext("2d"),
            cirX = canvas.width/ 2,
            cirY = canvas.height/ 2,
            rad = Math.PI * 2 / 100,
            n = 1,
            speed = 150,
            loadingColor = '#fa58bf';
            r = 100;

    //绘制最外层细圈
    function writeCircle(){
        context.save();         //save和restore可以保证样式属性只运用于该段canvas元素
        context.beginPath();    //开始路径
        context.strokeStyle = loadingColor;       //设置边线的颜色
        context.arc(cirX, cirY, r, 0, Math.PI * 2, false);      //画一个圆的路径
        context.stroke();       //绘制边线
        context.restore();
    }

    //绘制文本
    function writeText(n){
        context.save();
        context.strokeStyle = loadingColor;
        context.font = "40px Arial";
        context.strokeText(n.toFixed(0)+"%",cirX - 40 ,cirY +10);
        context.stroke();
        context.restore();
    }

    //绘制蓝色外圈
    function writeBlue(n){
        context.save();
        context.strokeStyle = loadingColor;
        context.lineWidth = 4;
        context.beginPath();
        context.arc(cirX, cirY, r, -Math.PI/2,-Math.PI/2+ rad*n, false);
        context.stroke();
        context.restore();
    }

    function DreamLoading(){
        //清除所有，重新绘制
        context.clearRect(0,0,canvas.width,canvas.height)

        writeCircle();
        writeText(n);
        writeBlue(n)
        if(n < 100){
            n= n+0.6;
            requestAnimationFrame(DreamLoading);
        }else {
            var loadingbox = document.querySelector('.loading-box');
            document.body.removeChild(loadingbox);
            n = 0;
        }
        //setTimeout(DreamLoading,speed);
    }
    DreamLoading();
}