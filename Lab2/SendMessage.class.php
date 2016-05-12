<?php


class SendMessage
{
    const COOKIE_FILE   =   'cookie.txt';
    
    private $login_name     = "";
    private $pass           = "";
    private $url           = "";
    private $commentsURL    = "";       

    public function __construct($login, $pass, $url, $comUrl)
    {    
        $this->login_name  = $login;        
        $this->pass = $pass;
        $this->url = $url;
        $this->commentsURL = $comUrl;
    }

    public function login()
    {
        $sendStr = "login=submit&login_name=".$this->login_name."&login_password=".$this->pass;
        $this->sendWithCookie($this->url, $sendStr);
    }  


    public function sendMessage($data)
    {
        $this->sendWithCookie($this->commentsURL, $data);
        return true;
    }

    

    private function sendWithCookie($url, $sendString, $referer = "", $isPost = 1)
    {
        if (empty($referer))
        {
            $referer =  $url;
        }
        return $this->initCurl($url, $referer, $isPost, $sendString);
    }

    private function sendWithoutCookie($url, $referer)
    {
        return $this->initCurl($url, $referer, 0, "");
    }

    private function initCurl($url, $referer, $isPost, $sendString)
    {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_REFERER, $referer);
        curl_setopt($ch, CURLOPT_VERBOSE, 1);
        curl_setopt($ch, CURLOPT_POST, $isPost);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

        
        curl_setopt($ch, CURLOPT_POSTFIELDS, $sendString);
        curl_setopt($ch, CURLOPT_USERAGENT, "User-Agent=Mozilla/5.0 (Windows NT 6.1; WOW64; rv:16.0) Gecko/20100101 Firefox/16.0");
        curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        curl_setopt($ch, CURLOPT_COOKIEFILE, self::COOKIE_FILE);
        curl_setopt($ch, CURLOPT_COOKIEJAR, self::COOKIE_FILE);

        $result=curl_exec($ch);

        curl_close($ch);

        return $result;
    }

}



