$(document).ready(function() {
	var api_key = "5457c9b0db98a09651aa5e92192aaa33";
	var app_id = "web001";
	var table = $('#fault-table').DataTable({
		"processing" : true,
		"serverSide" : false,
		"ajax" : {
			"url" : "/sismon_beta/api/v1/faults",
			"type" : "GET",
			"beforeSend" : function(xhr) {
				xhr.setRequestHeader("Authorization", api_key);
				xhr.setRequestHeader("Authorization-id", app_id);
			}
		},
		"columns" : [{
			"data" : "id"
		}, {
			"data" : "assetno"
		}, {
			"data" : "errorcode"
		}, {
			"data" : "errordesc"
		}]
	});
	
	$('body').on("click", '#fault-table tbody tr', function() {
		if ($(this).hasClass('active'))
			$(this).removeClass('active');
		else {
			$(this).siblings('.active').removeClass('active');
			$(this).addClass('active');
		}
	});

	$('#fault-table tbody').on('click', 'tr', function() {
		var rowData = table.row(this).data();
		$('#mode').val('1');
		$('#id').val(rowData.id);
		$('#univ').html('<i class="fa fa-edit"></i> Save Changes');
		$('#dialog-title').html('<i class="fa fa-edit fa-2x"></i> Edit Dialog');
		$('#assetno').val(rowData.assetno);
		$('#errorcode').val(rowData.errorcode);
		$('#errordesc').val(rowData.errordesc);
		$('#myModal').modal('show');
	});

	$('#addButton').click(function() {
		$('#mode').val('0');
		$('#dialog-form').trigger("reset");
		$('#univ').html('<i class="fa fa-plus"></i> Add New');
		$('#dialog-title').html('<i class="fa fa-plus fa-2x"></i> Add New Dialog');
		$('#myModal').modal('show');
	});
	
	$('#delete').click(function(){
		var id = $('#id').val();
		var st_process = '<div class="alert alert-success" role="alert"> Processing...</div>';
		var st_success = '<div class="alert alert-success" role="alert"><strong>Bravo!</strong> operation success.</div>';
		var st_error = '<div class="alert alert-danger" role="alert"><strong>Alert!</strong> An error occured.</div>';
		$.ajax({
				url : "/sismon_beta/api/v1/faults/"+id,
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
					xhr.setRequestHeader("Authorization", api_key);
					xhr.setRequestHeader("Authorization-id", app_id);
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
				url : "/sismon_beta/api/v1/faults",
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
					xhr.setRequestHeader("Authorization", api_key);
					xhr.setRequestHeader("Authorization-id", app_id);
					$("#message").html(st_process);
				}
			});
		} else {// update mode
			var id = $('#id').val();
			$.ajax({
				url : "/sismon_beta/api/v1/faults/"+id,
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
					xhr.setRequestHeader("Authorization", api_key);
					xhr.setRequestHeader("Authorization-id", app_id);
					$("#message").html(st_process);
				}
			});
		}
	});

});
