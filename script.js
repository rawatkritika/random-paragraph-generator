const inputNum = document.getElementById('num-input')
const inputOpt = document.getElementById("opt-input")
const genbtn = document.getElementById("gen-btn")
const copyBtn = document.getElementById("copy-btn")

const genContent = document.querySelector(".gen-content")

let count = 5, Options = "paras"
let tempCount = 0

genbtn.addEventListener("click" , ()=>{
    getValues()
})

function getValues(){
   count =  inputNum.value
   Options = inputOpt.value

   validateVlaue()

//    console.log(count , Options) ;
let url =`https://baconipsum.com/api/?
type=meat-and-filler&${Options}=${count}&
start-with-lorem=1`

fetchContent(url)
}

 async function fetchContent(url){
  let response   = await fetch(url)

  if(response.status === 200){
    let data = await response.json()
    displayGenContent(data)
    // console.log(data);
    
  } else {
      alert("An error occurred ")
  }
}

function displayGenContent(data){
    let texts = ""
    texts = data.join("<br><br>")

    genContent.innerHTML = texts
}

function validateVlaue(){
   tempCount = ""
    if(count > 100){
        invalidInput()
        count = 100 
        inputNum.value = "100"
    } else if(count < 1 || isNaN(count)){
    invalidInput()
    count = 5
    inputNum.value = "5"
 }
}

function invalidInput(){
    inputNum.style.borderColor = "#ff6a67"

    setTimeout(() =>{
        inputNum.style.borderColor = "#d3deb4"
    }, 1000) ;
}


copyBtn.addEventListener("click" ,() =>{
    let copyText = genContent.textContent
    navigator.clipboard.writeText(copyText)
})
