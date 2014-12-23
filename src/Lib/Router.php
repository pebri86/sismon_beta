<?php
namespace Lib;

class Router {
    protected $config;
    public function start($route)
    {
        $this->config = \Lib\Config::get('routes');
	if (empty($route) || $route == '/sismon_beta/') {
	    if (isset($this->config['default'])) {
	        $route = $this->config['default'];
	    } else {
	        $this->error();
	    }
	}
	try {
	    foreach ($this->config['routes'] as $path => $defaults) {
	        $regex = '@' . preg_replace(
	            '@:([\w]+)@',
	            '(?P<$1>[^/]+)',
	            str_replace(')', ')?', (string) $path)
	        ) . '@';
	        $matches = array();
	        if (preg_match($regex, $route, $matches)) {
		$options = $defaults;
		foreach ($matches as $key => $value) {
		    if (is_numeric($key)) {
		        continue;
		    }
		
		    $options[$key] = $value;
		    if (isset($defaults[$key])) {
		        if (strpos($defaults[$key], ":$key") !== false) {
		            $options[$key] = str_replace(":$key", $value, $defaults[$key]);
		        }
		    }
		}
		if (isset($options['controller']) && isset($options['action'])) {
		                $callable = array($options['controller'], $options['action'] . 'Action');
		                if (is_callable($callable)) {
		                    $callable = array(new $options['controller'], $options['action'] . 'Action');
				    call_user_func($callable, $options);
		                    return;
		                } else {
		                    $this->error();
		                }
		            } else {
		                $this->error();
		            }
		        }
		    }
		}
		catch (\Lib\Controller\Exception $e) {
		    $this->error();
		}
	}

	public function error()
	{
    		if (isset($this->config['errors'])) {
        	$route = '/error/e404';
        	$this->start($route);
    	} else {
        	echo "An unknown error occurred, please try again!";
    	}
	    exit;
	}

}