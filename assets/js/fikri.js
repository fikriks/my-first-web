const cacheKey = "data";
const cacheKey1 = "user";
const button = document.querySelector('#button');
const clearbutton = document.querySelector('#clear');


function showuser(){
if(sessionStorage.getItem(cacheKey1)===null){
    const user = document.querySelector('#user');
    let namana = prompt("Siapakah nama anda?");
    sessionStorage.setItem(cacheKey1,namana);
    user.innerText = sessionStorage.getItem(cacheKey1);
}else{
    const user = document.querySelector('#user');
    user.innerText = sessionStorage.getItem(cacheKey1);
}
}

function cekStorage(){
    return typeof(Storage) !== "undefined";
}

function input(data){
    if(cekStorage()){
        let historyData = null;
        if(localStorage.getItem(cacheKey)===null){
            historyData = [];
        }else{
            historyData = JSON.parse(localStorage.getItem(cacheKey))
        }
    historyData.unshift(data);
    localStorage.setItem(cacheKey,JSON.stringify(historyData));
}
}

function tampil(){
    if(cekStorage()){
        return JSON.parse(localStorage.getItem(cacheKey)) || [];
    }else{
        return [];
    }
}

function tampilkan(){
    const historyData = tampil();
    let list = document.querySelector("#historyList");
    list.innerHTML = "";

    for(let data of historyData){
        let row = document.createElement("tr");
        row.innerHTML = "<td>" + data.nama + "</td>";
        row.innerHTML += "<td>" + data.kelas + "</td>";
        list.appendChild(row);
    }
}

button.addEventListener('click',function(event){
        const siswa = { 
        nama : document.querySelector("input[name=nama]").value,
        kelas : document.querySelector("input[name=kelas]").value
        }
        document.querySelector("input[name=nama]").value = "";
        document.querySelector("input[name=kelas]").value = "";
        input(siswa);
        tampilkan();
})

clearbutton.addEventListener('click',function(event){
    localStorage.removeItem(cacheKey);
    tampilkan();
})

tampilkan();
showuser();