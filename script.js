/* =====================================
   IELTS 8.5 MASTER PLANNER
   SCRIPT.JS
   Version 1.0
======================================*/

const STORAGE_KEY = "ieltsMasterPlanner";

/* --------------------------
   Default Data
-------------------------- */

const defaultData = {

    currentDay: 1,

    totalDays: 72,

    studyHoursToday: 0,

    studyGoal: 3,

    streak: 1,

    currentBand: 6.5,

    targetBand: 8.5,

    completedTasks: []

};

/* --------------------------
   Load Data
-------------------------- */

let planner = JSON.parse(localStorage.getItem(STORAGE_KEY));

if (!planner) {

    planner = defaultData;

    saveData();

}

function saveData() {

    localStorage.setItem(STORAGE_KEY, JSON.stringify(planner));

}

/* --------------------------
   Elements
-------------------------- */

const checkboxes = document.querySelectorAll("input[type='checkbox']");

const progressBars = document.querySelectorAll(".progress-bar");

const progressTexts = document.querySelectorAll(".progress-card span");

const cards = document.querySelectorAll(".card");

const modules = document.querySelectorAll(".module");

const startButton = document.querySelector(".start-btn");

const themeBtn = document.getElementById("themeBtn");

/* --------------------------
   Restore Checkbox State
-------------------------- */

checkboxes.forEach((box, index) => {

    if (planner.completedTasks.includes(index)) {

        box.checked = true;

    }

});

/* --------------------------
   Update Progress
-------------------------- */

function updateProgress() {

    let completed = 0;

    checkboxes.forEach(box => {

        if (box.checked)

            completed++;

    });

    let percentage = Math.round(

        (completed / checkboxes.length) * 100

    );

    progressBars[0].style.width = percentage + "%";

    progressTexts[0].textContent = percentage + "%";

    let hours = (completed / checkboxes.length) * planner.studyGoal;

    hours = hours.toFixed(1);

    progressBars[1].style.width = (hours / planner.studyGoal) * 100 + "%";

    progressTexts[1].textContent =

        hours + " / " + planner.studyGoal + " Hours";

}

/* --------------------------
   Checkbox Save
-------------------------- */

checkboxes.forEach((box, index) => {

    box.addEventListener("change", () => {

        if (box.checked) {

            if (!planner.completedTasks.includes(index)) {

                planner.completedTasks.push(index);

            }

        }

        else {

            planner.completedTasks = planner.completedTasks.filter(

                item => item !== index

            );

        }

        saveData();

        updateProgress();

    });

});

/* --------------------------
   Fill Dashboard
-------------------------- */

cards[0].querySelector("h1").innerText = planner.currentBand;

cards[1].querySelector("h1").innerText = planner.targetBand;

cards[2].querySelector("h1").innerText = planner.studyGoal + " hrs";

cards[3].querySelector("h1").innerText =

planner.totalDays - planner.currentDay + 1;

/* --------------------------
   Module Animation
-------------------------- */

modules.forEach(module=>{

module.addEventListener("mouseenter",()=>{

module.style.transform="translateY(-10px) scale(1.02)";

});

module.addEventListener("mouseleave",()=>{

module.style.transform="translateY(0px)";

});

});

/* --------------------------
   Start Study Button
-------------------------- */

startButton.addEventListener("click",()=>{

alert(

"🎯 Study Session Started!\n\nStay focused for the next 3 hours.\n\nRemember:\nConsistency beats motivation."

);

});

/* --------------------------
   Theme Toggle
-------------------------- */

let darkMode=true;

themeBtn.addEventListener("click",()=>{

if(darkMode){

document.documentElement.style.setProperty("--bg","#f5f7fb");

document.documentElement.style.setProperty("--sidebar","#ffffff");

document.documentElement.style.setProperty("--card","#ffffff");

document.documentElement.style.setProperty("--card2","#ffffff");

document.documentElement.style.setProperty("--text","#111827");

document.documentElement.style.setProperty("--gray","#64748b");

document.body.style.background="#eef2ff";

themeBtn.innerHTML="☀️ Light Mode";

}

else{

document.documentElement.style.setProperty("--bg","#0f172a");

document.documentElement.style.setProperty("--sidebar","#111827");

document.documentElement.style.setProperty("--card","rgba(255,255,255,.08)");

document.documentElement.style.setProperty("--card2","#1e293b");

document.documentElement.style.setProperty("--text","#ffffff");

document.documentElement.style.setProperty("--gray","#94a3b8");

document.body.style.background="linear-gradient(135deg,#020617,#0f172a,#111827)";

themeBtn.innerHTML="🌙 Dark Mode";

}

darkMode=!darkMode;

});

/* --------------------------
   Daily Motivation Quotes
-------------------------- */

const quotes=[

"Small improvements every day lead to remarkable results.",

"Discipline will take you where motivation can't.",

"Your IELTS score is earned one study session at a time.",

"Focus on progress, not perfection.",

"Dream big. Study smart. Stay consistent.",

"Every mock test makes the real exam easier.",

"The future you is depending on today's effort."

];

const quote=document.querySelector("blockquote");

const random=Math.floor(Math.random()*quotes.length);

quote.innerText=quotes[random];

/* --------------------------
   Progress Animation
-------------------------- */

window.onload=()=>{

updateProgress();

};

/* --------------------------
   Keyboard Shortcut
-------------------------- */

document.addEventListener("keydown",(e)=>{

if(e.key==="s" && e.ctrlKey){

e.preventDefault();

saveData();

alert("Progress Saved!");

}

});

/* --------------------------
   Console Message
-------------------------- */

console.log(

"%cIELTS 8.5 MASTER PLANNER",

"color:#3b82f6;font-size:22px;font-weight:bold"

);

console.log(

"%cDeveloped for your 72-Day Journey 🚀",

"color:#22c55e;font-size:14px"

);
