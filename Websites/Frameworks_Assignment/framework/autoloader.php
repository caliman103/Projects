<?php
    require_once "C:/COMP3385_Assigment_2/400005037/config/config.php";

    /**
     * This autoloader function will search each of the defined paths in config.php file. It looks at all
     * of the files & folders within the directories with the second foreach. If the class is found 
     * within a directory then it is required and the autoloader's annonymous function is ended. If the 
     * class is not found then a user error is triggered.
     */
/*     spl_autoload_register(function($class) {
        printer($class);
        $directories = [APP_DIR, FRAMEWORK_DIR, TPL_DIR, ROOT_DIR];
        foreach($directories as $directory) {
            foreach(scandir($directory) as $dir) {
                printer($directory.'/'.$dir);
                if(file_exists($directory.'/'. $dir.'/'.lcfirst($class).'.php')) {
                    printer('found '.$directory.'/'. $dir.'/'.lcfirst($class).'.php');
                    require $directory .'/' . $dir. '/'. lcfirst($class) . '.php';
                    return;
                }//end if-else
                
            }//end foreach
        }//end foreach
        trigger_error('Autoloader cannot find ' . lcfirst($class) . '.php', E_USER_ERROR);
    }); //end autoloader */

    spl_autoload_register(function($class) {

/*         printer('+++++++++++++++++++++++++++++++++++++++++++++++');
        printer($class);
        printer('------------------'); */
        $directories = [APP_DIR, FRAMEWORK_DIR, TPL_DIR, ROOT_FULL_PATH];
        foreach($directories as $directory) {
           if(checkDirectory($class,$directory)) return; 
        }
        trigger_error('Autoloader cannot find ' . lcfirst($class) . '.php', E_USER_ERROR);
    });


    /**
     * This is supposed to check all of the directories within the root of the 
     */
    function checkDirectory($class,$directory) {
        foreach(scandir($directory) as $direc) {
/*             printer($directory.'/'.$direc); */
                if(is_dir($directory.'/'.$direc) && (!preg_match("/^\./",$direc))) {
                    if(checkDirectory($class, $directory.'/'.$direc)) return true;
                } else if(file_exists($directory.'/'.$direc.'/'.lcfirst($class).'.php')) {
/*                     printer($directory.'/'.$direc.'/'.lcfirst($class).'.php'." ==> FOUND");
                    printer('+++++++++++++++++++++++++++++++++++++++++++++++'); */
                    require_once $directory.'/'.$direc.'/'.lcfirst($class).'.php';
                    return true;
                }
        }
    }


    /*     spl_autoload_register(function($class) {
        printer($class);
        $directories = [APP_DIR, FRAMEWORK_DIR, TPL_DIR, ROOT_DIR];
        foreach($directories as $directory) {
            foreach(scandir($directory) as $dir) {
                if(preg_match("/.php/",$dir) && file_exists($directory.'/'.lcfirst($class).'.php')) {
                    // require $directory.'/'.lcfirst($class).'.php';
                    // return; 
                } else if(file_exists($directory.'/'. $dir.'/'.lcfirst($class).'.php')) {
                    printer('found '.$directory.'/'. $dir.'/'.lcfirst($class).'.php');
                    require $directory .'/' . $dir. '/'. lcfirst($class) . '.php';
                    return;
                }//end if-else
            }//end foreach
        }//end foreach
        trigger_error('Autoloader cannot find ' . lcfirst($class) . '.php', E_USER_ERROR);
    }); //end autoloader */
?>