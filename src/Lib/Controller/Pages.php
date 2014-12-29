<?php
namespace Lib\Controller;

class Pages extends \Lib\Controller {
	public function __construct() {
		parent::__construct();
	}

	public function Topics() {
		__construct();
	}
	
	public function ceraAction($msg) {

		$this -> render("../views/index/thumbnail.phtml",array('data' => 'data','message' => 'Cetak Rata'));
	}
	
	public function celamAction($msg) {

		$this -> render("../views/index/thumbnail.phtml",array('data' => 'data','message' => 'Cetak Dalam'));
	}
	
	public function cemorAction($msg) {

		$this -> render("../views/index/thumbnail.phtml",array('data' => 'data','message' => 'Cetak Nomor'));
	}
	
	public function masinalAction($msg) {

		$this -> render("../views/index/thumbnail.phtml",array('data' => 'data','message' => 'Saimasinal'));
	}
	
	public function faultAction($msg) {

		$this -> render("../views/index/fault.phtml",array('data' => 'data','message' => 0));
	}

	public function mesinAction($msg) {

		$this -> render("../views/index/mesin.phtml",array('data' => 'data','message' => 0));
	}
	
	public function userAction($msg) {

		$this -> render("../views/index/user.phtml",array('data' => 'data','message' => 0));
	}
	
	public function loginAction($msg) {

		$this -> render("../views/index/login.phtml",array('data' => 'data','message' => 0));
	}
	
	public function dashboardAction($msg) {

		$this -> render("../views/index/dashboard.phtml",array('data' => 'data','message' => 0));
	}

}
?>