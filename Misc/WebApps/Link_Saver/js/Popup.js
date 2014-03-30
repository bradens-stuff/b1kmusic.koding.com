var Popup = function(url,w,h){
    var height = h||250, width = w||300;
    window.open('./Link_Saver/Forms/'+url,'','width='+width+',height='+height+',top=100,left=0,location=no,menubar=no,status=no,titlebar=no,toolbar=no');
};
//Provides functionality to open windows