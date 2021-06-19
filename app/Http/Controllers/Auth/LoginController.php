<?php

namespace App\Http\Controllers\Auth;

use App\helpers\response\MessageResponse;
use App\Http\Controllers\Controller;
//use App\MyAppConstants;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
//use Illuminate\Support\Facades\DB;
//use Illuminate\Support\Facades\Session;
use \Illuminate\Http\Request;
use App\Models\User;

use MyHelp;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    // protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('guest')->except('logout');
        //$this->middleware('guest')->except('logoutProcess');
    }

    public function loginProcess(Request $request){
        $request->validate([
            'email' => 'required',
            'password' => 'required'
        ]);

        $credentials = $request->except(['_token']);
        $user = User::where('email',$request->email)->first();
        $message = null;
        if (auth()->attempt($credentials)) {
            $message = new MessageResponse(true,["log on"]);

        }else{
            $message = new MessageResponse(false,["autentificare esuata"]);

        }

        return MyHelp::responseJsonFormat($message);

    }


    public function logout(Request $request){
        Auth::logout();
        return MyHelp::responseJsonFormat(new MessageResponse(true,["log off"]));
    }

    function redirectTo(){
        //$user = Auth::user()->getAuthIdentifier();
        //dd($user->getAuthIdentifier());
        //Session::put(MyAppConstants::ID_AVOCAT, $user->getAuthIdentifier());

        /*
        $email = Auth::user()->email;
        $idUser = DB::table('t_s_useri')->where('cmail', $email)->value('id_user');
        Session::put(MyAppConstants::ID_USER, $idUser);
        */
    }
/*
    protected function sendLoginResponse(Request $request){
        $message = new MessageResponse(true,["log on"]);
        return json_encode($message);
    }

    protected function sendFailedLoginResponse(Request $request){
        $message = new MessageResponse(false,["autentificare esuata"]);
       return json_encode($message);
    }

*/
}
