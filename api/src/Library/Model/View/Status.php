<?php
namespace Library\Model\View;

class Status {
	public function getThumbnailStatus($seksi) {
		$sql = "SELECT 
	    			status.assetno, 
	    			mesin.description,
	    			status.speed, 
	    			status.tprod, 
	    			status.errorcode,
	    			status.monitor,
	    			fault.errordesc
	    		FROM status
	    		INNER JOIN fault
	    		ON status.errorcode = fault.errorcode
	    		INNER JOIN mesin
	    		ON mesin.assetno = status.assetno and mesin.enable = 'On' and mesin.seksi = :seksi	    		
	    		";
		$query = \Library\Db::getInstance() -> prepare($sql);
		$data = array(':seksi' => $seksi);
		$query -> execute($data);
		return $query -> fetchAll(\PDO::FETCH_ASSOC);
	}

}
?>