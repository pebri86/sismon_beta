<?php
namespace Lib\Controller;

class Pages extends \Lib\Controller {
	public function __construct() {
		parent::__construct();
	}

	public function Topics() {
		__construct();
	}

	public function mesinAction($msg) {

		$this -> render("../views/index/mesin.phtml",array('data' => 'data','message' => 0));
	}

}
?>