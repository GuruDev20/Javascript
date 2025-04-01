const listItems=document.querySelectorAll("#draggable_list li");

listItems.forEach((item)=>{
    item.addEventListener("dragstart",()=>{
        item.classList.add("dragging");
    });

    item.addEventListener("dragend",()=>{
        item.classList.remove("dragging");
    });

    item.addEventListener("dragover",(e)=>{
        e.preventDefault();
        const draggingItem=document.querySelector(".dragging");
        const parent=draggingItem.parentNode;
        parent.insertBefore(draggingItem,item.nextSibling);
    });
});
