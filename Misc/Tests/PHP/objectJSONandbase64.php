<?php

class Object{}

$obj = new Object();
    $obj->prop1 = 'Hello';
	$obj->prop2 = 'World';
	$obj->prop3 = 'Yes';
	$obj->prop4 = 'No';
	$obj->prop5 = 'Maybe';
	$obj->prop6 = 'So';

$whoa = base64_encode(json_encode($obj));

echo $whoa;
echo '<br><br>the alert boxes that popped up are from that garbled mess above. Decrypted and sent from PHP to javascript
<script>
var obj = '.(base64_decode($whoa)).';
for(var i in obj){
	alert(obj[i]);
}
</script>';
echo '<hr>and now for the quine:<br>';
echo '

<textarea style = "width:100%;height:400px;">
class Object{}

$obj = new Object();
	$obj->prop1 = \'Hello\';
	$obj->prop2 = \'World\';
	$obj->prop3 = \'Yes\';
	$obj->prop4 = \'No\';
	$obj->prop5 = \'Maybe\';
	$obj->prop6 = \'So\';

$whoa = base64_encode(json_encode($obj));

echo $whoa;
echo \'<br><br>the alert boxes that popped up are from that garbled mess above. Decrypted and sent from PHP to javascript
<script>
var obj = \'.(base64_decode($whoa)).\';
for(var i in obj){
	alert(obj[i]);
}
</script>\';


</textarea>';

?>