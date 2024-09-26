import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove,update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://test1-48a69-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const messagesDb= ref(database, "messages")

const publishEl = document.getElementById("publish")
const inputEl = document.getElementById("enter")
const ulEl = document.getElementById("messages")
const fromEl = document.getElementById("from")
const toEl = document.getElementById("to")




publishEl.addEventListener("click",function(){ 

    let inputValue = {
        from: fromEl.value,
        to: toEl.value,
        message: inputEl.value,
        likes:0
    }
    
    push(messagesDb, inputValue)
    
    clearFieldEl(fromEl)
    clearFieldEl(toEl)
    clearFieldEl(inputEl)

})



function  clearFieldEl(El) {
    El.value = ""
}

onValue(messagesDb,function(snapshot){
    if (snapshot.val()) {
    let items = Object.values(snapshot.val())
    let ids = Object.keys(snapshot.val())
    const buttons = []
    clearUlel()
    
        for (let i=0; i<items.length ; i++) {
            appendMessageslist(items[i],ids[i])
        }
    
        for (let i=0; i<items.length ; i++) {
            let button = document.getElementById(ids[i])
            button.addEventListener("click", function() {
             
                const messageRef = ref(database, `messages/${ids[i]}`)
                update(messageRef, { likes: items[i].likes + 1 })
            }
            )
    
        }
       
    }
   

 

   
})

function appendMessageslist(item,id){

    let m = `<li> 
     <p style="font-weight:bold"> from ${item.from}</p> 
     <p>${item.message} </p>
     <div id="footer">
     <p style="font-weight:bold">to ${item.to}</p>
     <button class="likebtn" id="${id}"><i class="fa fa-heart" style="font-size:12px;"></i> ${item.likes}</button>
   
    </div>
    </li>`
    ulEl.innerHTML+= m
    



}





function clearUlel(){

    ulEl.innerHTML= ""


}


