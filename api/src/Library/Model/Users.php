<?php
namespace Library\Model;

class Users {    		
	public function getAll()
	{
	    $sql = "SELECT * FROM login";	
	    $query = \Library\Db::getInstance()->prepare($sql);
	    $query->execute();
		return $query->fetchAll(\PDO::FETCH_ASSOC);
	}
	
	public function add($data)
		{
		    $query = \Library\Db::getInstance()->prepare(
		        "INSERT INTO login (
					username, 
					password,
					akses
				) VALUES (
					:username, 
					:password,
					:akses
				)"
		    );
		
		    $data = array(
		        ':username' => $data['username'], 
				':password' => $data['password'],
				':akses' => $data['akses']
		    );
		
		    return $query->execute($data);
		}
	
	public function getUser($id)
	{
	    $sql = "SELECT * FROM login WHERE username = :username LIMIT 1";
	    $query = \Library\Db::getInstance()->prepare($sql);
	
	    $values = array(':username' => $id);
	    $query->execute($values);
	
	    return $query->fetch(\PDO::FETCH_ASSOC);
	}
	
	public function update($data)
	{
	    $query = \Library\Db::getInstance()->prepare(
	        "UPDATE login
	            SET 
	                password = :password, 
					akses = :akses
	            WHERE
	                username = :username"
	    );
	
	    $data = array(
	        ':username' => $data['username'],
	        ':password' => $data['password'], 
			':akses' => $data['akses']
	    );
	
	    return $query->execute($data);
	}
	
	public function delete($id) {
		$result = $this->getUser($id);
		if($result != NULL){
		   
			$query = \Library\Db::getInstance()->prepare(
				"DELETE FROM login
					WHERE
				  username = :id"
			);

			$data = array(
				':id' => $id,
			);
	
			return $query->execute($data);
		}else{
			return false;
		}
}
}
?>