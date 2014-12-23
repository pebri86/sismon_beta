<?php
namespace Lib\Controller;

class Error extends \Lib\Controller {
    public function e404Action($options)
    {
        header("HTTP/1.0 404 Not Found");
        $this->render("../views/errors/index.phtml", array('message_code' => 'Error 404', 'message' => "Oops Sorry!<br>The page you're requested was not found!" ));
    }
}
?>