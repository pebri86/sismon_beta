$(document).ready(function() {
	$("#login").click(function() {
		var st_process = '<div class="alert alert-success" role="alert"> Logging in...</div>';
		var st_success = '<div class="alert alert-success" role="alert"><strong>Bravo!</strong> Login success.</div>';
		var st_error = '<div class="alert alert-danger" role="alert"><strong>Alert!</strong> Login failed, wrong username or password.</div>';
		var user = $("#login-username").val();
		var pass = $("#login-password").val();
		if ((user != '') && (pass != '')) {
			$.ajax({
				type : "POST",
				url : "/sismon_beta/api/v1/login",
				dataType : "json",
				success : function(data) {
					if (data.error == false) {
						$("#message").html(st_success);
						var delay = 1000;
						setTimeout(function() {
							window.location.href = "/sismon_beta/";
						}, delay);
					} else {
						$("#message").html(st_error);
					}
				},
				data : $('#loginform').serialize(),
				beforeSend : function() {
					$("#message").html(st_process);
				}
			});
			return false;
		}else{
			$("#message").html('<div class="alert alert-danger" role="alert"><strong>Alert!</strong> Username and password shouldn\'t be empty.</div>');
		}
	});

	$("#logout").click(function() {
		$.ajax({
			type : "GET",
			url : "/sismon_beta/api/v1/logout",
			dataType : "json",
			success : function(data) {
				if (data.error == false) {
					window.location.href = "/sismon_beta/";
				} else {
					alert("Something was wrong, couldn't logout!");
				}
			}
		});
	});
});
