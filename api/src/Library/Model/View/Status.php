<?php
namespace Library\Model\View;

class Status {
	public function getThumbnailStatus($seksi) {
		$_sql = "SELECT * FROM mesin WHERE seksi = :seksi and enable = 'On'";
		$query = \Library\Db::getInstance() -> prepare($_sql);
		$param = array(':seksi' => $seksi);
		$query -> execute($param);

		$result = $query -> fetchAll(\PDO::FETCH_ASSOC);

		$response = array();
		foreach ($result as $key) {
			$sql = "SELECT 
	    			status.assetno,
	    			status.mesinrun,
	    			status.production, 
	    			status.speed, 
	    			status.tprod, 
	    			status.errorcode,
	    			status.monitor,
	    			fault.errordesc
	    		FROM status, fault
	    		WHERE status.assetno = :assetno and status.errorcode = fault.errorcode 		
	    		";
			$query = \Library\Db::getInstance() -> prepare($sql);
			$param = array(':assetno' => $key["assetno"]);
			$query -> execute($param);
			$data = $query -> fetch(\PDO::FETCH_ASSOC);
			$tmp = array();
			$tmp["assetno"] = $data["assetno"];
			$tmp["mesinrun"] = $data["mesinrun"];
			$tmp["production"] = $data["production"];
			$tmp["speed"] = $data["speed"];
			$tmp["tprod"] = $data["tprod"];
			$tmp["errorcode"] = $data["errorcode"];
			$tmp["monitor"] = $data["monitor"];
			$tmp["errordesc"] = $data["errordesc"];
			$tmp["description"] = $key["description"];
			array_push($response, $tmp);
		}
		return $response;
	}
}
?>