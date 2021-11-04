<?php

namespace App\Http\Controllers\Test;
use Illuminate\Http\Request;

class PrintController extends Controller
{
        public function printLaravel(Request $request){

            return 'printez din laravel';
        }
}
