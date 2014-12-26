$(document).ready(function() {
	var st_process = '<div class="alert alert-success" role="alert"> Processing...</div>';
	var st_success = '<div class="alert alert-success" role="alert"><strong>Bravo!</strong> operation success.</div>';
	var st_error = '<div class="alert alert-danger" role="alert"><strong>Alert!</strong> An error occured.</div>';
	var api_key = "5457c9b0db98a09651aa5e92192aaa33";
	var app_id = "web001";
	var otable = $('#user-table').DataTable({
		"processing" : true,
		"serverSide" : false,
		"ajax" : {
			"url" : "/sismon_beta/api/v1/users",
			"type" : "GET",
			"beforeSend" : function(xhr) {
				xhr.setRequestHeader("Authorization", api_key);
				xhr.setRequestHeader("Authorization-id", app_id);
			}
		},
		"columns" : [{
			"data" : "username"
		}, {
			"data" : "akses"
		}]
	});

	$('body').on("click", '#user-table tbody tr', function() {
		if ($(this).hasClass('active'))
			$(this).removeClass('active');
		else {
			$(this).siblings('.active').removeClass('active');
			$(this).addClass('active');
		}
	});

	function changeMode(mode) {
		switch (mode) {
		case 0:
			$('#mode').val('0');
			$('#username').attr('disabled', 'false');
			$('#oldpass').attr('style', 'display:block;');
			$('#pass').attr('style', 'display:block;');
			$('#cpass').attr('style', 'display:block;');
			$('#access').attr('style', 'display:none;');
			$('#dialog-title').html('<i class="fa fa-edit fa-2x"></i> Change User Password');
			break;
		case 1:
			$('#mode').val('1');
			$('#username').attr('disabled', 'false');
			$('#oldpass').attr('style', 'display:none;');
			$('#pass').attr('style', 'display:none;');
			$('#cpass').attr('style', 'display:none;');
			$('#access').attr('style', 'display:block;');
			$('#dialog-title').html('<i class="fa fa-edit fa-2x"></i> Change User Access');
			break;
		case 2:
			$('#mode').val('2');
			$('#username').removeAttr('disabled');
			$('#oldpass').attr('style', 'display:none;');
			$('#pass').attr('style', 'display:block;');
			$('#cpass').attr('style', 'display:block;');
			$('#access').attr('style', 'display:block;');
			$('#dialog-title').html('<i class="fa fa-plus-circle fa-2x"></i> Add New User');
			break;
		}
	};

	$('#addButton').click(function() {
		changeMode(2);
		$('#dialog-form').trigger("reset");
		$('#myModal').modal('show');
	});

	$('#passButton').click(function() {
		changeMode(0);
		var rowData = otable.row('.active').data();
		$('#username').val(rowData.username);
		$('#myModal').modal('show');
	});

	$('#accessButton').click(function() {
		changeMode(1);
		var rowData = otable.row('.active').data();
		$('#username').val(rowData.username);
		$('#myModal').modal('show');
	});

	$('#deleteButton').click(function() {
		if ($('#user-table tbody tr').hasClass("active"))
			$('#confirm').modal('show');
	});

	$('#confirm-btn').click(function() {
		var rowData = otable.row('.active').data();
		var username = rowData.username;
		$.ajax({
			url : "/sismon_beta/api/v1/users/" + username,
			type : "DELETE",
			dataType : "json",
			success : function(data) {
				if (data.error == false) {
					$("#confirm-message").html(st_success);
					var delay = 1000;
					setTimeout(function() {
						otable.ajax.reload();
						$('#confirm-message').html('');
						$('#confirm').modal('hide');
					}, delay);
				} else {
					$("#confirm-message").html(st_error);
				}
			},
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Authorization", api_key);
				xhr.setRequestHeader("Authorization-id", app_id);
				$("#confirm-message").html(st_process);
			}
		});
	});

	$('#action').click(function() {
		var mode = $('#mode').val();
		if (mode == 2) {// register user
			if ($('#password').val() == $('#cpassword').val()) {
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
						xhr.setRequestHeader("Authorization", api_key);
						xhr.setRequestHeader("Authorization-id", app_id);
						$("#message").html(st_process);
					}
				});
			} else {
				$('#message').html('<div class="alert alert-danger" role="alert"><strong>Error !</strong> Confirm password doesn\'t equal.</div>');
			}
		} else if (mode == 0) {// change password mode
			var username = $('#username').val();
			if ($('#password').val() == $('#cpassword').val()) {
				$.ajax({
					url : "/sismon_beta/api/v1/users/" + username,
					type : "PUT",
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
						xhr.setRequestHeader("Authorization", api_key);
						xhr.setRequestHeader("Authorization-id", app_id);
						$("#message").html(st_process);
					}
				});
			} else {
				$('#message').html('<div class="alert alert-danger" role="alert"><strong>Error !</strong> Confirm password doesn\'t equal.</div>');
			}
		} else {// change access mode
			var username = $('#username').val();
			$.ajax({
				url : "/sismon_beta/api/v1/access/" + username,
				type : "PUT",
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
					xhr.setRequestHeader("Authorization", api_key);
					xhr.setRequestHeader("Authorization-id", app_id);
					$("#message").html(st_process);
				}
			});
		}
	});
});
