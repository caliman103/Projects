<?php
    namespace Framework\Router;

use Framework\Request\RequestAbstract;
use Framework\Router\RouterInterface;

    abstract class RouterAbstract implements RouterInterface {
        static protected $routes = [];

            //This function will be used to add a route and the associated method to the routes array. (for now method could be an HTTP method i.e GET or POST)
            static public function addRoute(array $route) : void {
                if(!in_array($route,RouterAbstract::$routes)) {
                    RouterAbstract::$routes[] = $route;
                }
            }

            /*
             * This function will allow the user to remove a route from the routes array. It takes on the
             * route name that will be the key of one of the elements in the routes array. The function
             * then check the routes array to see if that key exists and if it does it removes it from the
             * routes array.
             */ 
            static public function removeRoute(string $url, string $method) : bool {
                foreach(RouterAbstract::$routes as $route) {
                    if($route['url'] === $url && $route['method'] === $method) {
                        unset(RouterAbstract::$routes[$route]);
                        return true;
                    }
                }
                return false;
            }
    
            /*
             * If the user wants to remove a route and add a new one then they will call this function.
             * It takes in an array as the first parameter which has the new route that will be 
             * added to the routes array. It is added by using the addRoute function which was defined.
             * The second parameter is the name of the route to be replaced which will be removed
             * from the array before the new route is added.
             */
            static public function replaceRoute(array $newRoute, string $oldUrl, string $oldMethod) : bool { 
                if(!RouterAbstract::removeRoute($oldUrl, $oldMethod)) return false;
                if(!RouterAbstract::addRoute($newRoute)) return false;
                return true;
            }
    
            //This function will be used to change the name of a route in the routes array.
            static public function editRoute(array $newRouteInfo, string $url, string $method) : bool {
                foreach(RouterAbstract::$routes as $route) {
                    if($route['url'] === $url && $route['method'] === $method) {
                        foreach($newRouteInfo as $key => $property) {
                            RouterAbstract::$routes[$key] = $property;
                        }
                        return true;
                    }
                }
                return false;
            }
    
            //This function will take in a request and then redirect the application to the appropriate controller to handle the request
            static abstract public function route(RequestAbstract $request) /* : Route */;
    }
?>