'use strict'

let nombre = document.getElementById('name');
let apellido = document.getElementById('apellido')
let telefono = document.getElementById('phone');
let email = document.getElementById('email');
let mensaje = document.getElementById('message');
let button = document.getElementById('btnenviar');

let dataForm= [];

button.addEventListener('click', (e)=>{
    e.preventDefault();
    dataForm[0] = nombre.value;
    dataForm[1] = apellido.value;
    dataForm[2] = telefono.value;
    dataForm[3] = email.value;
    dataForm[4] = mensaje.value;

    let blob = new Blob([dataForm], {type:'text/plain;charset=utf-8'});

    saveAs(blob, 'contacto.txt');
})

