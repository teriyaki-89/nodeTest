const socket = io();

socket.on("countUpdated", (count) => {
    console.log(`the count has been updated ${count}`);
});


document.querySelector('#inc').addEventListener('click',()=>{
    //console.log('print')
    socket.emit('increment')
})