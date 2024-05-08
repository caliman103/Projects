<?php
    namespace Framework\Router;

use Framework\Request\RequestAbstract;

    interface RouterInterface {
        /**
         * This function will be used to add a route to the routes array. The parameter takes in an array
         * with information about the route
         */
        static public function addRoute(array $route) : void;

        //This function will be used to remove a route and the associated method from the routes array. 
        static public function removeRoute(string $routeUrl, string $routeMethod) : bool;

        //This function will be used to replace a route and its associated method in the routes array.
        static public function replaceRoute(array $newRoute, string $oldUrl, string $oldMethod) : bool;

        //This function will be used to change the name of a route in the routes array.
        static public function editRoute(array $routeInfo, string $url, string $method) : bool;

        //This function will take in a request and then redirect the application to the appropriate controller to handle the request
        static public function route(RequestAbstract $request) /* : Route */;
    }
?>