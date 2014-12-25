<?php
require_once '../src/Library/Config.php';
\Library\Config::setDirectory('../config');

$config = \Library\Config::get('autoload');
require_once $config['class_path'] . '/Library/Autoloader.php';

// Slim couldn't cover by autoloader
require '../src/Library/Slim/Slim.php';
\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

/**
 * Adding Middle Layer to authenticate every request
 * Checking if the request has valid api key in the 'Authorization' header
 */
function authenticate(\Slim\Route $route) {
	// Getting request headers
	$headers = apache_request_headers();
	$response = array();
	$app = \Slim\Slim::getInstance();

	// Verifying Authorization Header
	if (isset($headers['Authorization']) && isset($headers['Authorization-id'])) {
		$auth = new \Library\Auth();

		// get the api key
		$api_key = $headers['Authorization'];
		$app_id = $headers['Authorization-id'];
		// validating api key
		if (!$auth -> isValidApiKey($api_key)) {
			// api key is not present in users table
			$response["error"] = true;
			$response["message"] = "Access Denied. Invalid Api key";
			echoRespnse(401, $response);
			$app -> stop();
		} else {
			if ($app_id == $auth -> getAppId($api_key)) {
				// to do
			} else {
				$response["error"] = true;
				$response["message"] = "Access Denied. Unknown Application id";
				echoRespnse(401, $response);
				$app -> stop();
			}
		}
	} else {
		// api key is missing in header
		$response["error"] = true;
		$response["message"] = "Api key is misssing";
		echoRespnse(400, $response);
		$app -> stop();
	}
}

/**
 * Login to app
 * method POST
 * url /login
 */
$app -> get('/logout', function() {
	$response = array();
	$login = new \Library\Login();
	if ($login -> doLogout()) {
		$response["error"] = false;
		$response["message"] = 'Successfully logout';
	} else {
		$response["error"] = true;
		$response["message"] = "Something wrong !";
	}

	echoRespnse(200, $response);
});

/**
 * Login to app
 * method POST
 * url /login
 */
$app -> post('/login', function() use ($app) {
	// check for required params
	verifyRequiredParams(array('username', 'password'));
	$response = array();
	$user = $app -> request -> post('username');
	$pass = $app -> request -> post('password');

	$login = new \Library\Login();
	if ($login -> checkLogin($user, $pass)) {
		$data = new \Library\Model\Users();
		$result = $data -> getUser($user);
		$response["error"] = false;
		$response["credential"] = $result;		
	} else {
		$response["error"] = true;
		$response["message"] = "Wrong credential data !";
	}

	echoRespnse(200, $response);
});

/**
 * Listing all users
 * method GET
 * url /users
 */
$app -> get('/users', 'authenticate', function() {
	$response = array();
	$data = new \Library\Model\Users();
	$users = $data -> getAll();

	$response["error"] = false;
	$response["data"] = $users;

	echoRespnse(200, $response);
});

/**
 * Listing all assets
 * method GET
 * url /mesin
 */
$app -> get('/mesin', 'authenticate', function() {
	$response = array();
	$data = new \Library\Model\Mesin();
	$mesins = $data -> getAll();

	$response["error"] = false;
	$response["data"] = $mesins;

	echoRespnse(200, $response);
});

/**
 * Listing single asset
 * method GET
 * url /mesin/:id
 * Will return 404 if the asset doesn't exist
 */
$app -> get('/mesin/:id', 'authenticate', function($id) {
	$response = array();
	$data = new \Library\Model\Mesin();
	$mesin = $data -> getMesin($id);

	if ($mesin != NULL) {
		$response["error"] = false;
		$response["data"] = $mesin;
		echoRespnse(200, $response);
	} else {
		$response["error"] = true;
		$response["message"] = "The requested resource doesn't exists";
		echoRespnse(404, $response);
	}
});

/**
 * Creating new asset in db
 * method POST
 * params - 'assetno',
 * 'description',
 * 'merk',
 * 'seri',
 * 'tahun',
 * 'seksi',
 * 'enable'
 * url - /mesin
 */
$app -> post('/mesin', 'authenticate', function() use ($app) {
	// check for required params
	verifyRequiredParams(array('assetno', 'description', 'merk', 'seri', 'tahun', 'seksi', 'enable'));

	$response = array();
	$data = new \Library\Model\Mesin();

	$result = $data -> add($_POST);

	if ($result) {
		$response["error"] = false;
		$response["message"] = "Task created successfully";
		echoRespnse(201, $response);
	} else {
		$response["error"] = true;
		$response["message"] = "Failed to create task. Please try again";
		echoRespnse(200, $response);
	}
});

/**
 * Updating existing asset
 * method PUT
 * params 	'assetno',
 * 'description',
 * 'merk',
 * 'seri',
 * 'tahun',
 * 'seksi ',
 * 'enable'
 * url - /mesin/:id
 */
$app -> put('/mesin/:id', 'authenticate', function($id) use ($app) {
	// check for required params
	verifyRequiredParams(array('description', 'merk', 'seri', 'tahun', 'seksi', 'enable'));

	$response = array();
	$data = new \Library\Model\Mesin();

	$description = $app -> request -> put('description');
	$merk = $app -> request -> put('merk');
	$seri = $app -> request -> put('seri');
	$tahun = $app -> request -> put('tahun');
	$seksi = $app -> request -> put('seksi');
	$enable = $app -> request -> put('enable');

	$put_data = array('assetno' => $id, 'description' => $description, 'merk' => $merk, 'seri' => $seri, 'tahun' => $tahun, 'seksi' => $seksi, 'enable' => $enable);

	$result = $data -> update($put_data);

	if ($result) {
		$response["error"] = false;
		$response["message"] = "Task updated successfully";
	} else {
		$response["error"] = true;
		$response["message"] = "Task failed to update. Please try again!";
	}
	echoRespnse(200, $response);
});

/**
 * Deleting asset.
 * method DELETE
 * url /mesin/:id
 */
$app -> delete('/mesin/:id', 'authenticate', function($id) use ($app) {
	$data = new \Library\Model\Mesin();
	$response = array();
	$result = $data -> delete($id);
	if ($result) {
		$response["error"] = false;
		$response["message"] = "Task deleted succesfully";
	} else {
		$response["error"] = true;
		$response["message"] = "Task failed to delete. Please try again!";
	}
	echoRespnse(200, $response);
});

/**
 * Verifying required params posted or not
 */
function verifyRequiredParams($required_fields) {
	$error = false;
	$error_fields = "";
	$request_params = array();
	$request_params = $_REQUEST;
	// Handling PUT request params
	if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
		$app = \Slim\Slim::getInstance();
		parse_str($app -> request() -> getBody(), $request_params);
	}
	foreach ($required_fields as $field) {
		if (!isset($request_params[$field]) || strlen(trim($request_params[$field])) <= 0) {
			$error = true;
			$error_fields .= $field . ', ';
		}
	}

	if ($error) {
		// Required field(s) are missing or empty
		// echo error json and stop the app
		$response = array();
		$app = \Slim\Slim::getInstance();
		$response["error"] = true;
		$response["message"] = 'Required field(s) ' . substr($error_fields, 0, -2) . ' is missing or empty';
		echoRespnse(400, $response);
		$app -> stop();
	}
}

/**
 * Echoing json response to client
 * @param String $status_code Http response code
 * @param Int $response Json response
 */
function echoRespnse($status_code, $response) {
	$app = \Slim\Slim::getInstance();
	// Http response code
	$app -> status($status_code);
	// setting response content type to json
	$app -> contentType('application/json');
	echo json_encode($response);
}

$app -> run();
?>