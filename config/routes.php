<?php
return array(
    'default' => '/pages/dashboard',
    'errors' => '/error/:code',
    'routes' => array(
		'/pages(/:action(/:id))' => array(
	        'controller' => '\Lib\Controller\Pages'
			),
		'/:controller(/:action(/:id))' => array(
            'controller' => '\Lib\Controller\:controller',
            'action' => 'index'
			)
		)
);
?>