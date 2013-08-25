<?php

/*
* sidemenu example
*
* @package Application
* @author Vallo Reima
* @copyright (C)2012
*/
date_default_timezone_set('UTC');
mb_internal_encoding('UTF-8');
ini_set('display_errors', true);
ini_set('log_errors', false);

$title = 'SideMenu';

include 'texts.php';    /* multilingual texts */
include 'sidemenu.php'; /* menu generator */

$nme = basename(__FILE__,'.php'); /* example's filename */
if (isset($_REQUEST['lng'])) {  /* user language */
  $lng = $_REQUEST['lng'];  /* lng= parameter */
} else if (!empty($_SERVER['QUERY_STRING'])) {
  $lng = $_SERVER['QUERY_STRING'];  /* ?<lng> token */ 
} else {
  $lng = null;
}

$txt = new Texts($nme, $lng);
if ($txt->_err == '') {
  $mnu = new SideMenu($nme, $txt);
  if ($txt->_err == '') {
    $ats = 'http://vallo.me/assets';  /* external images */
    $ops = array('url' => "#$txt->lng", 'img' => "$ats/iclosed.gif"); /* menu options */
    include "$nme.phtml"; /* fill template */
  }
}

if ($txt->_err != '') { /* error encountered */
  header("Content-Type: text/html; charset=utf-8");
  echo "<h3>&nbsp;$title: $txt->_err</h3>";
}
?>
