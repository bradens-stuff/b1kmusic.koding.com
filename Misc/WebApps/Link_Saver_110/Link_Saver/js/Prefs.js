((function(){
    try{
        document.body.style.background = '#'+storage.Config.background || '#CCC';
    }catch(e){
        console.error('Error trying to apply background from storage.Config:\n\n'+e);
        document.body.style.background = '#FFF';
    }
})());
//Handles items in storage.Config other than perPage and lastSave
//Note: This must be put below the body since it references something that isn't available until after the HTML is rendered