<?php
libxml_use_internal_errors(true);

class DomParser
{
    public function __construct() {}

    public function getNodeValueByXpath($url, $xPathExp)
    {      
        $page = file_get_contents($url);
        libxml_use_internal_errors(true);
        if ($page)
        {           
            $html =  new DOMDocument();
            if ( $html->loadHTML($page))
            {
                $xPath  = new DOMXPath( $html );
                $nodelist = $xPath->query( $xPathExp );

                foreach ($nodelist as $n)
                {       
                    $res =  $n->nodeValue; 
                    break;                  
                }
            }
        }
        libxml_use_internal_errors(false);
        return $res;
    }
}