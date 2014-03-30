((function checkDate(){
    if(localStorage[Storage_Key]){
        var a = storage.Config.lastSave,b = JSON.parse(localStorage[Storage_Key]).Config.lastSave;
        if(a != b){
            if(!(/Link\_Saver\.html/.test(location.href))){
                window.close();
            }else{
                location.reload();
            }
        }
    }
    if(localStorage.update){
        localStorage.removeItem('update');
        location.reload();
    }
    setTimeout(checkDate,1000);
})());
//Syncs App to Data