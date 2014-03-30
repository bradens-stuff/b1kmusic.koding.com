((function checkDate(){
    if(localStorage[Storage_Key]){
        var a = storage.Config.lastSave,b = JSON.parse(localStorage[Storage_Key]).Config.lastSave;
        if(a != b){
            window.close();//assumes popout window
        }
    }
    if(localStorage.update){
        localStorage.removeItem('update');
        location.reload();
    }
    setTimeout(checkDate,1000);
})());
//Syncs App to Data