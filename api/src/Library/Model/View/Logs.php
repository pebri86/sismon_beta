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
			if ($key["speed"] == -1)
				$row['speed'] = 0;
			array_push($response, $row);
		}
		return $response;
	}

}
?>