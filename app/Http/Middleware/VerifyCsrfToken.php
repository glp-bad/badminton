<?php

namespace App\Http\Middleware;
use Closure;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        //
    ];


    public function handle($request, Closure $next)
    {

        // skip CSFR for options method
        if ($request->method() == 'OPTIONS')
        {
            return $next($request);
        }

        return parent::handle($request, $next);
    }
}
