/*MENU LOGIC*/
var _MENU_ACTIVE_FLAG = false;
menu_click = function(e){//clear classNames of all but selected
    _MENU_ACTIVE_FLAG = !_MENU_ACTIVE_FLAG;
	menu.className = _MENU_ACTIVE_FLAG?'active':'';
};
var clicked = false;
for(var i in item_title){//lockout after opening menu. Because of stupid layering glitch
	item_title[i].onclick = function(e){
		if(clicked){
			return false;
		}else{
			clicked = true;
			menu_click(e);
		}
	};//apply function to all menu items
}
/*MENU LOGIC*/