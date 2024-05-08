<?php
class Router
{
    protected $routes = [];

    public function addRoute($method, $uri, $controller, $action)
    {
        $this->routes[] = [
            'method' => $method,
            'uri' => $uri,
            'controller' => $controller,
            'action' => $action,
        ];
    }

    public function route(Request $request)
    {
        $uri = $request->getUri();
        $method = $request->getMethod();

        foreach ($this->routes as $route) {
            // Check if the request method matches
            if ($route['method'] !== $method) {
                continue;
            }

            // Convert route placeholders into regular expressions
            $pattern = preg_replace('/\//', '\/', $route['uri']);
            $pattern = '/^' . preg_replace('/\{([a-zA-Z]+)\}/', '(?P<\1>[a-zA-Z0-9-]+)', $pattern) . '$/';

            if (preg_match($pattern, $uri, $matches)) {
                // Extract matched parameters
                $params = [];
                foreach ($matches as $key => $value) {
                    if (is_string($key)) {
                        $params[$key] = $value;
                    }
                }

                // Determine the controller and action
                $controller = $route['controller'];
                $action = $route['action'];

                return new Route($controller, $action, $params);
            }
        }

        // If no route matches, you can handle 404 errors or any default behavior here.
        // For example, throw an exception or return a "Not Found" page.
        throw new NotFoundException("Route not found for $method $uri");
    }
}

?>
