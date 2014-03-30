<?php

$query = $_GET['q'];

class Object{}

$obj = new Object();

if($query!=''){
    $obj->text = 'Successful AJAX request. Text recieved: '.$query;
}else{
    $obj->text = 'Nothing Typed';
}

echo json_encode($obj);

?>