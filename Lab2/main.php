<?php

include("SendMessage.class.php");
include("DomParser.class.php");

/*const LOGIN         =   "revconps31";
const PASSWORD      =   "revconps31";
*/
const URL           =   "http://kinoprosmotr.net/8016-pervyy-mstitel-protivostoyanie-10-05-2016.html";
const NODE_XPATH	= 	"/html/body/div[3]/div/div[2]/div[3]/div/div/div[2]/div[1]/div[2]/ul/li[2]/dt";
const POST_COMMENT_STR_PREFIX	= "post_id=8016&comments=";
const POST_COMMENT_STR_SUFFIX	= "&name=revconps31&mail=&editor_mode=&skin=kino2
&sec_code=&question_answer=&recaptcha_response_field=&recaptcha_challenge_field=&allow_subscribe=0";
const COMMENTS_URL  =   "http://kinoprosmotr.net/engine/ajax/addcomments.php";


$login 		=$_GET['login_name'];
$password 	=$_GET['login_password'];

$send = new SendMessage($login, $password, URL, COMMENTS_URL);
$send->login();
$parser = new DomParser();
$filmName = $parser->getNodeValueByXpath(URL, NODE_XPATH);
$mes = POST_COMMENT_STR_PREFIX . $filmName . ". I liked the movie, but not more than 10/10. Expected more." . POST_COMMENT_STR_SUFFIX;
$send->sendMessage($mes);
echo "<br>THE WORK DONE!<br>";
