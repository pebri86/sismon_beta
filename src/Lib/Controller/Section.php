<?php
namespace Lib\Controller;

class Section extends \Lib\Controller {
	public function __construct() {
		parent::__construct();
	}

	public function Topics() {
		__construct();
	}
	
	public function ceraAction($msg) {

		$this -> render("../views/section/cera.phtml",array('data' => 'data','message' => 0));
	}
	
	public function celamAction($msg) {

		$this -> render("../views/section/celam.phtml",array('data' => 'data','message' => 0));
	}
	
	public function cemorAction($msg) {

		$this -> render("../views/section/cemor.phtml",array('data' => 'data','message' => 0));
	}
	
	public function masinalAction($msg) {

		$this -> render("../views/section/masinal.phtml",array('data' => 'data','message' => 0));
	}
}
?>