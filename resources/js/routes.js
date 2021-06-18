//import WelcomeVueComponent          from "./components/login/WelcomeVueComponent";
import LoginComponent               from "./components/login/LoginComponent";
//import RegisterComponent            from "./components/login/RegisterComponent";
import MainAppComponent             from "./components/MainAppComponent";
//import InvoicesListComponent        from "./components/app/InvoicesListComponent";
//import TestInvoicesListComponent    from "./components/TestInvoicesListComponent";
//import TestTabComponent             from "./components/app/TestTabComponent";
//import BadmintonCourtComponent      from "./components/app/BadmintonCourtComponent";

export default [
   // {name: 'Welcome'        , path: '/welcome'  , component: WelcomeVueComponent    },
    {name: 'Login'          , path: '/login'        , component: LoginComponent         },
    //{name: 'Register'       , path: '/register'     , component: RegisterComponent      },
	{name: 'MainApp'        , path: '/*'            , component: MainAppComponent  , alias: '/main',
        children: [
           // { path: '/testTab'          ,   component: TestTabComponent },
	       // { path: '/invoicesList'     ,   component: InvoicesListComponent },
	       // { path: '/testInvoicesList' ,   component: TestInvoicesListComponent },
	       // { path: '/badmintonCourt'   ,   component: BadmintonCourtComponent }

        ]
    }

]

