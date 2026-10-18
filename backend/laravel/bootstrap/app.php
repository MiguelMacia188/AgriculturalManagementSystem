<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration;
use Illuminate\Http\Foundation\Response;
use Illuminate\Routing\Router;

return Application::configure(basePath: __DIR__.'/..')
    ->withRouting(
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Router $router) {
        //
    })
    ->withExceptions(function (Application $app) {
        //
    })
    ->create();
