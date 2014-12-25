$(document).ready(function() {
	var otable = $('#user-table').DataTable({
		"processing" : true,
		"serverSide" : false,
		"ajax" : {
			"url" : "/sismon_beta/api/v1/users",
			"type" : "GET",
			"beforeSend" : function(xhr) {
				xhr.setRequestHeader("Authorization", "5457c9b0db98a09651aa5e92192aaa33");
				xhr.setRequestHeader("Authorization-id", "web001");
			}
		},
		"columns" : [{
			"data" : "username"
		}, {
			"data" : "akses"
		}]
	});

	$('body').on("click", '#user-table tbody tr', function() {
		if ($(this).hasClass('selected'))
			$(this).removeClass('selected');
		else {
			$(this).siblings('.selected').removeClass('selected');
			$(this).addClass('selected');
		}
	});

	$('#addButton').click(function() {
		$('#mode').val('2');
		$('#username').removeAttr('disabled');
		$('#myModal').modal('show');
	});

	$('#action').click(function() {
		var mode = $('#mode').val();
		var st_process = '<div class="alert alert-success" role="alert"> Processing...</div>';
		var st_success = '<div class="alert alert-success" role="alert"><strong>Bravo!</strong> operation success.</div>';
		var st_error = '<div class="alert alert-danger" role="alert"><strong>Alert!</strong> An error occured.</div>';
		if (mode == 2) {// register user
			$.ajax({
				url : "/sismon_beta/api/v1/users",
				type : "POST",
				data : $('#dialog-form').serialize(),
				dataType : "json",
				success : function(data) {
					if (data.error == false) {
						$("#message").html(st_success);
						var delay = 1000;
						setTimeout(function() {
							otable.ajax.reload();
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
				url : "/sismon_beta/api/v1/mesin/" + assetno,
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
