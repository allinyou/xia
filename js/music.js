 //音频
 var audio = new Audio();
 var musicState = true;
 var index = 1;
 var songs = ['assets/audio/Friendships.mp3','https://6d61-magic-d13079-1255581239.tcb.qcloud.la/xia/routine.mp3?sign=88f708e5335a21b10a6d466340dfea9e&t=1556588394','assets/audio/C400001N8e5Q4Gjxda.mp3','assets/audio/lost.mp3'];
 audio.src = songs[index];   // songs[index]
 audio.autoplay = true;
 
 $('.music-btn').click(function(){
     if (musicState) {
         $(this).removeClass('rotates')
         $('.music-btn .pause-sign').show();
         audio.pause();
     } else {
         $(this).addClass('rotates')
         $('.music-btn .pause-sign').hide();
         audio.play();
     }
     musicState = !musicState;
 })
 var colors = ['red', 'orange', 'cyan']; // , 'purple' 'blue', 'green', 
 var randomIndex1 = Math.floor(Math.random() * 3);
 var randomIndex2 = Math.floor(Math.random() * 3);
 color1 = colors[randomIndex1];
 color2 = colors[randomIndex2];
 function drawFreq() {
     var canvas1 = document.getElementById('canvas1');
     var cxt1 = canvas1.getContext('2d');
     var canvas2 = document.getElementById('canvas2');
     var cxt2 = canvas2.getContext('2d');
     var AudioContext = window.AudioContext || window.webkitAudioContext;
     var context = new AudioContext();
     // 创建节点
     var source = context.createMediaElementSource(audio);
     var analyser = context.createAnalyser();
     // 连接：source → analyser → destination
     source.connect(analyser);
     analyser.connect(context.destination);
     var output = new Uint8Array(4);
     (function drawFreqs() {
         analyser.getByteFrequencyData(output);
         cxt1.clearRect(0, 0, canvas1.width, canvas1.height);
         cxt2.clearRect(0, 0, canvas2.width, canvas2.height);
         var distance = 150;
         for (let i = 0; i < 4; i++) {
             var value1 = output[i] / 1.5; // <===获取数据 
             var value2 = output[3 - i] / 1.5;
             // 左边音轨
             cxt1.beginPath();
             cxt1.lineWidth = 50;
             var y = i * distance + 30;
             cxt1.moveTo(0, y);
             cxt1.lineTo(value1, y);
             cxt1.closePath();
             cxt1.strokeStyle = color1;
             cxt1.stroke();

             // 右边音轨
             cxt2.beginPath();
             cxt2.lineWidth = 50;
             cxt2.moveTo(canvas2.width, y);
             cxt2.lineTo(canvas2.width - value2, y);
             cxt2.closePath();
             cxt2.strokeStyle = color2;
             cxt2.stroke();
         };
         requestAnimationFrame(drawFreqs);
     })();
 }
 drawFreq(); 