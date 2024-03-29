let alarm_btn = document.querySelector('#check');
let full_time = document.querySelector('.full-time');
let ampm = document.querySelector('.ampm');
let timer = document.querySelector('.blur');
let err = document.getElementById('err');
let alarm = new Audio("alarm.mp3");
let hr_remain = document.querySelector('.hr-remain');
let min_remain = document.querySelector('.min-remain');
let set_btn = document.getElementById('btn');
let selectData = document.getElementsByTagName('select');
let hr, min, time, hr_, min_, ampm_;
let on = false;

function viewport() {
    document.documentElement.style.setProperty('--viewport-height', window.innerHeight + 'px');
}
console.log(window.innerHeight);
viewport();
// Update height on window resize
window.addEventListener('resize', viewport);

alarm_btn.addEventListener('change', () => {
    if (alarm_btn.checked) {
        timer.style.display = 'block';
    } else {
        alarm.pause();
        alarm.currentTime = 0;
        on = false;
    }
})
set_btn.addEventListener('click', () => {
    hr = selectData[0].value;
    min = selectData[1].value;
    let ampm = selectData[2].value;
    if (hr >= hr_ && min >= min_ && ampm == ampm_) {
        timer.style.display = 'none';
        on = true;
    } else { err.style.display = 'block'; }
})

for (let index = 12; index >= 1; index--) {
    if (index < 10) {
        index = `0${index}`;
    } else {
        index = index
    }
    let option = `<option value = "${index}">${index}</option>`;
    selectData[0].firstElementChild.insertAdjacentHTML("afterend", option)
}

for (let index = 59; index >= 1; index--) {
    if (index < 10) {
        index = `0${index}`;
    } else {
        index = index
    }
    let option = `<option value = "${index}">${index}</option>`;
    selectData[1].firstElementChild.insertAdjacentHTML("afterend", option)
}

for (let index = 0; index < 2; index++) {
    let ampm;
    if (index == 1) {
        ampm = "AM"
    } else {
        ampm = "PM"
    }
    let option = `<option value = "${ampm}">${ampm}</option>`;
    selectData[2].firstElementChild.insertAdjacentHTML("afterend", option)
}

function time_remain(user_H, user_M, H, M) {
    if (user_H != null || user_M != null) {
        hr_remain.innerHTML = (user_H - H);
        min_remain.innerHTML = (user_M - M);
    }
}
setInterval(() => {
    let a = new Date();
    // time = a.toLocaleTimeString();
    hr_ = a.getHours();
    min_ = a.getMinutes();
    let sec_ = a.getSeconds();
    ampn_ = "AM"
    if (hr_ > 12) {
        hr_ = hr_ - 12
        ampm_ = "PM"
    } else if (hr_ == 12 && min_ > 0) {
        ampm_ = "PM"
    }
    if (hr_ < 10) {
        hr_ = `0${hr_}`;
    }
    if (min_ < 10) {
        min_ = `0${min_}`
    }

    full_time.innerHTML = `${hr_}:${min_}:${sec_}`;
    ampm.innerHTML = ampm_;
    time_remain(hr, min, hr_, min_);
    if (hr == hr_ && min == min_ && on == true) {
        alarm.play();
    }

}, 1000);

