$(document).ready(function() {
	var table = $('#mesin-table').DataTable({
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

	$('#mesin-table tbody').on('click', 'tr', function() {
		var rowData = table.row(this).data();
		$('#mode').val('1');
		$('#assetno').attr('disabled', 'true');
		$('#univ').html('<i class="fa fa-edit"></i> Save Changes');
		$('#dialog-title').html('<i class="fa fa-edit fa-2x"></i> Edit Dialog');
		$('#assetno').val(rowData.assetno);
		$('#description').val(rowData.description);
		$('#merk').val(rowData.merk);
		$('#seri').val(rowData.seri);
		$('#tahun').val(rowData.tahun);
		$('#seksi').val(rowData.seksi);
		$('#myModal').modal('show');
	});

	$('#addButton').click(function() {
		$('#mode').val('0');
		$('#assetno').val('');
		$('#description').val('');
		$('#merk').val('');
		$('#seri').val('');
		$('#tahun').val('');
		$('#seksi').val('');
		$('#univ').html('<i class="fa fa-plus"></i> Add New');
		$('#dialog-title').html('<i class="fa fa-plus fa-2x"></i> Add New Dialog');
		$('#assetno').removeAttr('disabled');
		$('#myModal').modal('show');
	});
	
	$('#delete').click(function(){
		var assetno = $('#assetno').val();
		var st_process = '<div class="alert alert-success" role="alert"> Processing...</div>';
		var st_success = '<div class="alert alert-success" role="alert"><strong>Bravo!</strong> operation success.</div>';
		var st_error = '<div class="alert alert-danger" role="alert"><strong>Alert!</strong> An error occured.</div>';
		$.ajax({
				url : "/sismon_beta/api/v1/mesin/"+assetno,
				type : "DELETE",
				dataType : "json",
				success : function(data) {
					if (data.error == false) {
						$("#message").html(st_success);
						var delay = 1000;
						setTimeout(function() {
							table.ajax.reload();
							$('#message').html('');
							$('#myModal').modal('hide');
						}, delay);
					} else {
						$("#message").html(st_error);
					}
				},
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Authorization", "5457c9b0db98a09651aa5e92192aaa33");
					xhr.setRequestHeader("Authorization-id", "web001");
					$("#message").html(st_process);
				}
			});
	});

	$('#univ').click(function() {
		var mode = $('#mode').val();
		var st_process = '<div class="alert alert-success" role="alert"> Processing...</div>';
		var st_success = '<div class="alert alert-success" role="alert"><strong>Bravo!</strong> operation success.</div>';
		var st_error = '<div class="alert alert-danger" role="alert"><strong>Alert!</strong> An error occured.</div>';
		if (mode == 0) {// add mode
			$.ajax({
				url : "/sismon_beta/api/v1/mesin",
				type : "POST",
				data : $('#dialog-form').serialize(),
				dataType : "json",
				success : function(data) {
					if (data.error == false) {
						$("#message").html(st_success);
						var delay = 1000;
						setTimeout(function() {
							table.ajax.reload();
							$('#message').html('');
							$('#myModal').modal('hide');
						}, delay);
					} else {
						$("#message").html(st_error);
					}
				},
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Authorization", "5457c9b0db98a09651aa5e92192aaa33");
					xhr.setRequestHeader("Authorization-id", "web001");
					$("#message").html(st_process);
				}
			});
		} else {// update mode
			var assetno = $('#assetno').val();
			$.ajax({
				url : "/sismon_beta/api/v1/mesin/"+assetno,
				type : "PUT",
				data : $('#dialog-form').serialize(),
				dataType : "json",
				success : function(data) {
					if (data.error == false) {
						$("#message").html(st_success);
						var delay = 1000;
						setTimeout(function() {
							table.ajax.reload();
							$('#message').html('');
							$('#myModal').modal('hide');
						}, delay);
					} else {
						$("#message").html(st_error);
					}
				},
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Authorization", "5457c9b0db98a09651aa5e92192aaa33");
					xhr.setRequestHeader("Authorization-id", "web001");
					$("#message").html(st_process);
				}
			});
		}
	});

});
