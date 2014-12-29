<?php
namespace Lib\Controller;

class Section extends \Lib\Controller {
	public function __construct() {
		parent::__construct();
	}

	public function Topics() {
		__construct();
	}

	public function detailAction($options) {
		$id = $options['id'];
		$this -> render("../views/section/details.phtml", array('title' => 'Detail Status Mesin Asset Nr. '.$id, 'assetno' => $id));
	}

}
?>