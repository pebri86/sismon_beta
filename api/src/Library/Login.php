<?php
namespace Library;

class Login {
	protected $data;

	public function __construct() {
		$this -> data = new \Library\Model\Users();
	}

	public function doLogout() {
		session_start();
		return session_destroy();
	}

	public function checkLogin($username, $password) {
		$result = $this -> data -> getUser($username);
		if ($result != NULL) {
			if ($result['password'] == $this -> passHash($password)) {
				session_start();
				$_SESSION['username'] = $result['username'];
				$_SESSION['akses'] = $result['akses'];
				return true;
			} else
				return false;
		} else
			return false;
	}

	public function register($data) {
		$post = array('username' => $data['username'], 'password' => $this -> passHash($data['password']), 'akses' => $data['akses']);
		return $this -> data -> add($post);
	}

	public function changeAkses($username, $newakses) {
		$result = $this -> data -> getUser($username);
		$post = array('username' => $result['username'], 'password' => $result['password'], 'akses' => $newakses);
		return $this -> data -> update($post);
	}

	public function changePassword($username, $oldpassword, $newpassword) {
		if ($this -> checkLogin($username, $oldpassword)) {
			$result = $this -> data -> getUser($username);
			$post = array('username' => $result['username'], 'password' => $this -> passHash($newpassword), 'akses' => $result['akses']);
			return $this -> data -> update($post);
		} else {
			return false;
		}
	}

	private function passHash($password) {
		return md5(sha1($password));
	}

}
