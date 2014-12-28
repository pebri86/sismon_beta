<?php
namespace Library\Model;

class Faults {    		
	public function getAll()
	{
	    $sql = "SELECT * FROM fault";	
	    $query = \Library\Db::getInstance()->prepare($sql);
	    $query->execute();
		return $query->fetchAll(\PDO::FETCH_ASSOC);
	}
	
	public function add($data)
		{
		    $query = \Library\Db::getInstance()->prepare(
		        "INSERT INTO fault (
					assetno, 
					errorcode,
					errordesc
				) VALUES (
					:assetno, 
					:errorcode,
					:errordesc
				)"
		    );
		
		    $data = array(
		        ':assetno' => $data['assetno'], 
				':errorcode' => $data['errorcode'],
				':errordesc' => $data['errordesc']
		    );
		
		    return $query->execute($data);
		}
	
	public function getUser($id)
	{
	    $sql = "SELECT * FROM fault WHERE id = :id LIMIT 1";
	    $query = \Library\Db::getInstance()->prepare($sql);
	
	    $values = array(':id' => $id);
	    $query->execute($values);
	
	    return $query->fetch(\PDO::FETCH_ASSOC);
	}
	
	public function update($data)
	{
	    $query = \Library\Db::getInstance()->prepare(
	        "UPDATE fault
	            SET 
	                assetno = :assetno, 
					errorcode = :errorcode,
					errordesc = :errordesc
	            WHERE
	                id = :id"
	    );
	
	    $data = array(
	    	':id' => $data['id'],
	        ':assetno' => $data['assetno'],
	        ':errorcode' => $data['errorcode'], 
			':errordesc' => $data['errordesc']
	    );
	
	    return $query->execute($data);
	}
	
	public function delete($id) {
		$result = $this->getUser($id);
		if($result != NULL){
		   
			$query = \Library\Db::getInstance()->prepare(
				"DELETE FROM fault
					WHERE
				  id = :id"
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