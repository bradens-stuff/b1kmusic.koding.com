((function(){
    try{
        Storage_Key = 'Link Saver';
        if(localStorage[Storage_Key]){
            storage = JSON.parse(localStorage[Storage_Key]);
        }else{
            storage = {
                Config:{
                    lastSave:(new Date()).toString(),
                    perPage:10
                },
                Link:{
                    links:0
                },
                Paradigm:{
                    key:'Link',
                    list:{
                        'Link':'Link'
                    }
                }
            };
        }
        save = function(){
            storage.Config.lastSave = (new Date()).toString();
            localStorage[Storage_Key] = JSON.stringify(storage);
        };
        clearStorage = function(){
            localStorage.removeItem(Storage_Key);
            localStorage.update = 'true';
        };
        console.log('Data has been successfully loaded.');
    }catch(e){
        console.error('Something has prevented the Data from loading. Try refreshing.');
    }
})());
//Initializes Data