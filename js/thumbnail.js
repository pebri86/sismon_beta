$(document).ready(function() {
	var api_key = "5457c9b0db98a09651aa5e92192aaa33";
	var app_id = "web001";
	$('#content').html('Loading data, Please wait...');
	setInterval(function() {
		getStatus();
	}, 2000);

	function getStatus() {
		var section = $('#section').val();
		$.ajax({
			url : "/sismon_beta/api/v1/thumbnails/" + section,
			type : "GET",
			dataType : "json",
			success : function(data) {
				if (data.error == false) {
					$('#content').html('');
					for ( x = 0; x < data.data.length; x++) {
						var panel,
						    monitor;
						if (data.data[x].monitor == 1) {
							if (data.data[x].errorcode == 0)
								panel = '<div class="panel panel-green">';
							else
								panel = '<div class="panel panel-yellow">';
							monitor = '<p class="text-success"><i class="fa fa-gear"></i> Status <strong>Online</strong></p>';
						} else {
							panel = '<div class="panel panel-red">';
							monitor = '<p class="text-danger"><i class="fa fa-gear"></i> Status <strong>Offline</strong></p>';
						}

						$('#content').append('<div class="col-lg-4 col-md-6">' + panel + '<div class="panel-heading">' + data.data[x].description + '</div>' + '<div class="panel-body">' + '<p><i class="fa fa-gears"></i> Asset No. <strong>' + data.data[x].assetno + '</strong></p>' + '<p><i class="fa fa-tachometer"></i> Speed <strong>' + data.data[x].speed + '</strong> SPH</p>' + '<p><i class="fa fa-bar-chart-o"></i> Production <strong>' + data.data[x].tprod + '</strong> sheet(s)</span></p><p><i class="fa fa-exclamation-circle"></i> Error code <strong>< ' + data.data[x].errorcode + ' ></strong></p><p class="text-danger"><i class="fa fa-tag"></i> Error Desc. <strong>' + data.data[x].errordesc + '</strong></p>' + monitor + '</div><a href="/sismon_beta/section/detail/'+ data.data[x].assetno +'"><div class="panel-footer"><span class="pull-left">View Details</span><span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span><div class="clearfix"></div></div> </a></div></div>');
					}
				} else {
					$("#content").html("No Data or Error occured!");
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
					$("#content").html("Error: " + errorThrown);
			},
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Authorization", api_key);
				xhr.setRequestHeader("Authorization-id", app_id);
			}
		});
	};
});
