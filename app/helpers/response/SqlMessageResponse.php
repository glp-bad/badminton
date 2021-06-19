<?php


namespace App\helpers\response;


class SqlMessageResponse
{
    public $succes;                     //  true, false
	public $lastId;                     // 0 is not valid
    public $messages;                   // string
	public $errorMsg;                   // string
	public $admin;                      // true false, on client show $errorMsg on windows alert

    function __construct($succes, $lastId, $messages, $errorMsg=null, $admin=false) {
        $this->succes = $succes;
        $this->messages = $messages;
	    $this->errorMsg = $errorMsg;
        $this->lastId = $lastId;
	    $this->admin = $admin;

    }
}
