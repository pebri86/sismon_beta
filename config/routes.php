<?php
return array(
    'default' => '/pages/mesin',
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