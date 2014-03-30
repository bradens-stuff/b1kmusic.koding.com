<?php 

$name = "Automated Email"; //senders name 
$email = "noreply"; //senders e-mail adress 
$recipient = "bradentbest@gmail.com"; //recipient 
$recipient2 = '5056920947@vtext.com';//recipient
$mail_body = "You are receiving this because I said so.\n\nDeal with it."; //mail body 
$subject = "Auto-Email from b1kmusic.koding.com"; //subject 
$header = "From: " . $name . " <" . $email . ">\r\n"; //optional headerfields 

if(date(i) == 0){//i = minutes. Only emails if time is 1:00, 2:00, 3:00, etc
    mail($recipient, $subject, $mail_body, $header);
    mail($recipient2, $subject, $mail_body, $header);
    echo 'Email sent successfully :)';
}else{
    mail($recipient, $subject, $mail_body."\n\nThis was not sent at an hour interval", $header);
    mail($recipient2, $subject, $mail_body, $header);
    echo 'it\'s not time yet. Here\'s a random number '.rand();
}

?>
<script>

</script>