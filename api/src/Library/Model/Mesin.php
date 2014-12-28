<?php
namespace Library\Model;

class Mesin {    		
	public function getAll()
	{
	    $sql = "SELECT * FROM mesin";	
	    $query = \Library\Db::getInstance()->prepare($sql);
	    $query->execute();
		return $query->fetchAll(\PDO::FETCH_ASSOC);
	}
	
	public function add($data)
		{
		    $query = \Library\Db::getInstance()->prepare(
		        "INSERT INTO mesin (
					assetno, 
					description,
					merk, 
					seri, 
					tahun, 
					seksi, 
					enable
				) VALUES (
					:assetno, 
					:description,
					:merk, 
					:seri, 
					:tahun, 
					:seksi, 
					:enable
				)"
		    );
		
		    $data = array(
		        ':assetno' => $data['assetno'], 
				':description' => $data['description'],
				':merk' => $data['merk'], 
				':seri' => $data['seri'], 
				':tahun' => $data['tahun'], 
				':seksi' => $data['seksi'], 
				':enable' => $data['enable']
		    );
		
		    return $query->execute($data);
		}
	
	public function getMesin($id)
	{
	    $sql = "SELECT * FROM mesin WHERE assetno = :assetno LIMIT 1";
	    $query = \Library\Db::getInstance()->prepare($sql);
	
	    $values = array(':assetno' => $id);
	    $query->execute($values);
	
	    return $query->fetch(\PDO::FETCH_ASSOC);
	}
	
	public function update($data)
	{
	    $query = \Library\Db::getInstance()->prepare(
	        "UPDATE mesin 
	            SET 
	                assetno = :assetno, 
					description = :description,
					merk = :merk, 
					seri = :seri, 
					tahun = :tahun, 
					seksi = :seksi, 
					enable = :enable
	            WHERE
	                assetno = :assetno"
	    );
	
	    $data = array(
	        ':assetno' => $data['assetno'], 
			':description' => $data['description'],
			':merk' => $data['merk'], 
			':seri' => $data['seri'], 
			':tahun' => $data['tahun'], 
			':seksi' => $data['seksi'], 
			':enable' => $data['enable']
	    );
	
	    return $query->execute($data);
	}
	
	public function delete($id) {
		$result = $this->getMesin($id);
		if($result != NULL){
		   
			$query = \Library\Db::getInstance()->prepare(
				"DELETE FROM mesin
					WHERE
				assetno = :id"
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