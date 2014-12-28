<?php
return array(
    'default' => '/pages/dashboard',
    'errors' => '/error/:code',
    'routes' => array(
		'/pages(/:action(/:id))' => array(
	        'controller' => '\Lib\Controller\Pages'
			),
		'/section(/:action(/:id))' => array(
	        'controller' => '\Lib\Controller\Section'
			),
		'/:controller(/:action(/:id))' => array(
            'controller' => '\Lib\Controller\:controller',
            'action' => 'index'
			)
		)
);
?>