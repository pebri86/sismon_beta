<?php
namespace Library\Model\View;

class Logs {
	public function getSpeedLogs($id, $filter) {
		$_sql = "SELECT tgl,speed FROM logstatus WHERE assetno = :assetno and tgl >= :filter1 and tgl < :filter2";
		$query = \Library\Db::getInstance() -> prepare($_sql);
		$filter1 = strftime('%Y-%m-%d', strtotime($filter));
		$filter2 = strftime('%Y-%m-%d', strtotime($filter."+1 day"));
		$param = array(':assetno' => $id, ':filter1' => $filter1, ':filter2' => $filter2);
		$query -> execute($param);
		
		$response = array();
		$result = $query -> fetchAll(\PDO::FETCH_ASSOC);
		foreach ($result as $key) {
				$row['tgl'] = $key['tgl'];
			if ($key['speed'] == -1){
				$row['speed'] = 0;
			}
			else {
				$row['speed'] = $key['speed'];
			}
			array_push($response, $row);
		}
		return $response;
	}
	
	public function getWeeklyProduction($id, $filter) {
		$_sql = "SELECT * FROM logproduksi WHERE assetno = :assetno and week(tgl) = :filter ORDER BY tgl ASC";
		$query = \Library\Db::getInstance() -> prepare($_sql);
		$param = array(':assetno' => $id, ':filter' => $filter);
		$query -> execute($param);		
		$result = $query -> fetchAll(\PDO::FETCH_ASSOC);
		
		$response = array();
		$tmp = array();
		$i = 1;
		foreach ($result as $key) {				
			switch($key["shift"]){
			case 1: $tmp['tgl'] = strftime('%d-%m-%Y', strtotime($key['tgl']));
					$tmp['shift1'] = $key['totalproduction'];
				break;
			case 2: $tmp['shift2'] = $key['totalproduction'];
				break;
			case 3: $tmp['shift3'] = $key['totalproduction'];
				break;		
			}
			if($i % 3 == 0){
		    	array_push($response, $tmp);
			}	
			$i++;
		}
		return $response;
	}

}
?>