let btn = document.querySelector('.btn');
let user_time;
let hour_box = document.querySelector('.hour');
let min_box = document.querySelector('.min');
let sec_box = document.querySelector('.sec');
let ampm = document.querySelector('.ampm');
let time_box = document.querySelector('.time');
let timer = document.querySelector('.form');
let err = document.getElementById('err');
let alarm = new Audio("alarm.mp3");
let hr_remain = document.querySelector('.hr-remain');
let min_remain = document.querySelector('.min-remain');

btn.addEventListener('click',()=>{
    user_time = document.getElementById('time').value;
    let userhour = user_time.slice(0,2);
    let usermin = user_time.slice(3,5);
    if(user_time == ''){
        err.style.display = 'block'
    }else{
        timer.style.display = 'none';
        time(userhour, usermin);
        time_box.style.display = 'block';
    }
});

function time_remain(user_H,user_M,H,M){
    hr_remain.innerHTML = (user_H-H);
    min_remain.innerHTML = (user_M - M);
}

function time(user_H, user_M){
    setInterval(() => {
        let a = new Date();
        let hour = a.getHours();
        let min = a.getMinutes();
        let sec = a.getSeconds();
        let time ;
        let hour_12 = hour;
        if(hour>12){
            hour_12 = hour - 12;
            time = 'PM';
        }else if (hour == 12 && min > 0){
            time = 'PM';
        }else{
            time = 'AM';
        }
        hour_box.innerHTML = hour_12;
        if(min<10){
            min_box.innerHTML = `0${min}`;
        }else{
            min_box.innerHTML = min;
        }if(sec<10){
            sec_box.innerHTML = `0${sec}`;
        }else{
            sec_box.innerHTML = sec;
        }
        ampm.innerHTML = time;

        time_remain(user_H,user_M,hour,min);
        if(user_H == hour && user_M == min){
            alarm.play();
        }

    }, 1000);
}

