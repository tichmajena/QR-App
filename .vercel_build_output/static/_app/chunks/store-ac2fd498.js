import{D as a}from"./vendor-0da5386f.js";const c=a(JSON.parse(localStorage.getItem("contact"))||[]);c.subscribe(t=>{localStorage.setItem("contact",JSON.stringify(t))});export{c};
