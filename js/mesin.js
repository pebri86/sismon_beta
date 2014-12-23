$(document).ready(function() {
	$('#mesin-table').dataTable({
		"processing" : true,
		"serverSide" : false,
		"ajax" : {
			"url" : "/sismon_beta/api/v1/mesin",
			"type" : "GET",
			"beforeSend" : function(xhr) {
				xhr.setRequestHeader("Authorization", "5457c9b0db98a09651aa5e92192aaa33");
				xhr.setRequestHeader("Authorization-id", "web001");
			}
		},
		"columns" : [{
			"data" : "assetno"
		}, {
			"data" : "description"
		}, {
			"data" : "merk"
		}, {
			"data" : "seri"
		}, {
			"data" : "tahun"
		}, {
			"data" : "seksi"
		}, {
			"data" : "enable"
		}]
	});
});
