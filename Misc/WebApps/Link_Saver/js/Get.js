var g = ((function(){
    var a = location.search.split('&'), b, c, d = {};
	for(c in a){
		try{
			b = RegExp('([^?&#;=]+)=([^?&#;=]+)').exec(a[c]);
			d[b[1]] = b[2];
		}catch(e){}
	}
	return d;
})());
//Provides GET functionality to get vars from URL