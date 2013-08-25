<?php

/*
 * sidemenu example
 *
 * @package     Application
 * @author      Vallo Reima
 * @copyright   (C)2012
 */
date_default_timezone_set('UTC');
mb_internal_encoding('UTF-8');
ini_set('display_errors', true);
ini_set('log_errors', false);

$title = 'SideMenu';

include 'texts.php';
include 'sidemenu.php';

$nme = basename(__FILE__,'.php');
if (isset($_REQUEST['lng'])) {
  $lng = $_REQUEST['lng'];
} else if (!empty($_SERVER['QUERY_STRING'])) {
  $lng = $_SERVER['QUERY_STRING'];
} else {
  $lng = null;
}

$txt = new Texts($nme, $lng);
if ($txt->_err == '') {
  $mnu = new SideMenu($nme, $txt);
  if ($txt->_err == '') {
    $ops = array('url' => "#$txt->lng", 'img' => 'iclosed.gif');
    include "$nme.phtml";
  }
}

if ($txt->_err != '') {
  header("Content-Type: text/html; charset=utf-8");
  echo "<h3>&nbsp;$title: $txt->_err</h3>";
}
?>
