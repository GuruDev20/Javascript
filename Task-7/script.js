const sendMessageButton=document.getElementById("send_btn");

sendMessageButton.addEventListener("click",()=>{
    const userMessage=document.getElementById("chat_input");
    const message=userMessage.value.trim();
    if(userMessage===""){
        alert("Please enter a message.");
        return;
    }

    sendMessage("You",message,"user_msg","user_label");
    userMessage.value="";
    setTimeout(()=>{
        sendMessage("Bot",message,"bot_msg","bot_label");
    },1000);
})

function sendMessage(sender,message,className,labelName){
    const chatBox=document.getElementById("chat");
    const msgContainer=document.createElement("div");
    msgContainer.classList.add("msg_container");

    const label=document.createElement("p");
    label.textContent=sender;
    label.classList.add("msg_label",labelName);

    const msg=document.createElement("h3");
    msg.textContent=message;
    msg.classList.add("msg",className);

    msgContainer.appendChild(label);
    msgContainer.appendChild(msg);
    chatBox.appendChild(msgContainer);
    chatBox.scrollTop=chatBox.scrollHeight;
}