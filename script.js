let songIndex = 0;
let audio = new Audio('./songs/01 - Sadi Gali - Tanu Weds Manu.mp3');
let masterplay = document.getElementById("masterplay");
let myprogressbar = document.getElementById("myprogressbar");
let gif = document.getElementById("gif");
let songdiv = Array.from(document.getElementsByClassName("songdiv"));
// let songdur = document.getElementsByClassName("songdur");
let gananame = '01 - Sadi Gali - Tanu Weds Manu';
let gifsongname = document.getElementsByClassName("gifsongname");
var elee;
let temp = -1;
let songitemplay = document.getElementsByClassName('songitemplay');

let songs = [
    { songName: "01 - Sadi Gali - Tanu Weds Manu", filePath: './songs/01 - Sadi Gali - Tanu Weds Manu.mp3', coverPath: './covers/01 - Sadi Gali - Tanu Weds Manu.jpeg'},
    { songName: "8 Parche - Baani Sandhu", filePath: './songs/8 Parche - Baani Sandhu.mp3', coverPath: './covers/8 Parche - Baani Sandhu.jpeg'},
    { songName: "Arjan Vailly - ANIMAL", filePath: './songs/Arjan Vailly - ANIMAL.mp3', coverPath: './covers/Arjan Vailly - ANIMAL.jpeg'},
    { songName: "Cheques Slowed and Reverb", filePath: './songs/Cheques Slowed and Reverb.mp3', coverPath: './covers/Cheques Slowed and Reverb.jpeg'},
    { songName: "Excuses - Ap Dhillon", filePath: './songs/Excuses - Ap Dhillon.mp3', coverPath: './covers/Excuses - Ap Dhillon.jpeg'},
    { songName: "Hauli Hauli - Khel Khel Mein", filePath: './songs/Hauli Hauli - Khel Khel Mein.mp3', coverPath: './covers/Hauli Hauli - Khel Khel Mein.jpeg'},
    { songName: "Illegal Weapon 2 - Street Dancer 3D", filePath: './songs/Illegal Weapon 2 - Street Dancer 3D.mp3', coverPath: './covers/Illegal Weapon 2 - Street Dancer 3D.jpeg'},
    { songName: "Kabootar - Renuka Panwar", filePath: './songs/Kabootar - Renuka Panwar.mp3', coverPath: './covers/Kabootar - Renuka Panwar.jpeg'},
    { songName: "Kya Baat Ay - Harrdy Sandhu", filePath: './songs/Kya Baat Ay - Harrdy Sandhu.mp3', coverPath: './covers/Kya Baat Ay - Harrdy Sandhu.jpeg'},
    { songName: "Mummy Nu Pasand - Jai Mummy Di", filePath: './songs/Mummy Nu Pasand - Jai Mummy Di.mp3', coverPath: './covers/Mummy Nu Pasand - Jai Mummy Di.jpeg'}
]

masterplay.addEventListener('click', () => {
    if (audio.paused || audio.currentTime <= 0) {
        audio.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.visibility = 'visible';
        
        if(elee != undefined){
            gif.nextElementSibling.innerText = gananame;
            elee.target.classList.remove('fa-circle-play');
            elee.target.classList.add('fa-circle-pause');   
        }
        else{
            if(songitemplay[songIndex].id == 0){
                gif.nextElementSibling.innerText = gananame;
                songitemplay[0].classList.remove('fa-circle-play');
                songitemplay[0].classList.add('fa-circle-pause');
            }
            else{
                songdiv[songIndex].getElementsByTagName('i')[0].classList.remove('fa-circle-play');
                songdiv[songIndex].getElementsByTagName('i')[0].classList.add('fa-circle-pause');
            }    
        }
        temp = songitemplay[0].id;
    }
    else {
        audio.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.visibility = 'hidden';
        if(elee != undefined){
            elee.target.classList.remove('fa-circle-pause');
            elee.target.classList.add('fa-circle-play');
        }
        else{
            songitemplay[0].classList.remove('fa-circle-pause');
            songitemplay[0].classList.add('fa-circle-play');
            songdiv[songIndex].getElementsByTagName('i')[0].classList.remove('fa-circle-pause');
            songdiv[songIndex].getElementsByTagName('i')[0].classList.add('fa-circle-play');
        }   
    }
})

audio.addEventListener('timeupdate', () => {
    var progress = parseInt((audio.currentTime / audio.duration) * 100);
    myprogressbar.value = progress;
    if(myprogressbar.value == 100){
        next();
    }
})

myprogressbar.addEventListener('change', () => {
    audio.currentTime = (myprogressbar.value * audio.duration) / 100;
})

songdiv.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByTagName('p')[0].innerText = songs[i].songName;
    
})
const makeAllPlay =()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((ele)=>{
        ele.classList.remove('fa-circle-pause');
        ele.classList.add('fa-circle-play');
    })
}

songpausetime = myprogressbar.value;

Array.from(document.getElementsByClassName('songitemplay')).forEach((ele)=>{
    ele.addEventListener('click',(ele)=>{
        elee = ele;
        console.log(elee);
        makeAllPlay();
        songIndex = parseInt(ele.target.id);
        
        if(temp != songIndex){
            gananame = songdiv[songIndex].getElementsByTagName('p')[0].innerText;
            gif.nextElementSibling.innerText = gananame;
            ele.target.classList.remove('fa-circle-play');
            ele.target.classList.add('fa-circle-pause');
            // audio.currentTime = (myprogressbar.value * audio.duration) / 100;
            audio.src = `songs/${gananame}.mp3`;
            audio.play();
            masterplay.classList.remove('fa-circle-play');
            masterplay.classList.add('fa-circle-pause');
            gif.style.visibility = 'visible';
            temp = songIndex;
        
        }
        else{
            ele.target.classList.remove('fa-circle-pause');
            ele.target.classList.add('fa-circle-play');
            audio.pause();
            masterplay.classList.remove('fa-circle-pause');
            masterplay.classList.add('fa-circle-play');
            temp = -1;
            makeAllPlay();
            songpausetime = audio.currentTime;
            gif.style.visibility = 'hidden';
        }    
    })
})

function next(){
    if(songIndex >= 9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audio.currentTime = 0;
    gananame = songdiv[songIndex].getElementsByTagName('p')[0].innerText;
    audio.src = `songs/${gananame}.mp3`;
    gif.nextElementSibling.innerText = gananame;
    audio.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    makeAllPlay();
    songdiv[songIndex].getElementsByTagName('i')[0].classList.remove('fa-circle-play');
    songdiv[songIndex].getElementsByTagName('i')[0].classList.add('fa-circle-pause');
    console.log(songdiv[songIndex].getElementsByTagName('i')[0]);
    gif.style.visibility = 'visible';
}

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <= 0){
        songIndex = 9;
    }
    else{
        songIndex -= 1;
    }
    audio.currentTime = 0;
    gananame = songdiv[songIndex].getElementsByTagName('p')[0].innerText;
    audio.src = `songs/${gananame}.mp3`;
    gif.nextElementSibling.innerText = gananame;
    audio.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    makeAllPlay();
    songdiv[songIndex].getElementsByTagName('i')[0].classList.remove('fa-circle-play');
    songdiv[songIndex].getElementsByTagName('i')[0].classList.add('fa-circle-pause');
    gif.style.visibility = 'visible';
})


