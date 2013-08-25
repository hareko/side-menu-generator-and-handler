<?php

/*
 * sidemanu generator class
 *
 * @package     System
 * @author      Vallo Reima
 * @copyright   (C)2012
 */

class SideMenu {

  private $dom;     /* DOM object */
  private $xpt;     /* XPath object */

  public function __construct($cfg, Texts $txt)
  /*
   * load configuration
   * in:  cfg -- config filename
   *      txt -- text's object
   *      
   */ {
    $this->dom = new DOMDocument();
    $this->dom->preserveWhiteSpace = false;
    $this->dom->encoding = mb_strtolower(mb_internal_encoding());
    if (@$this->dom->load("$cfg.xml")) {
      $this->xpt = new DomXPath($this->dom);
      $this->Names('sct', $txt->sct);
    } else {
      $txt->_err = $txt->ecfg;
    }
  }

  private function Names($pth, $nms)
  /*
   * save section names in the name attribute
   * in:  pth - section path
   *      nms - names array
   */ {
    $nodes = $this->xpt->query($pth)->item(0);
    foreach ($nodes->childNodes as $node) {
      $sct = $pth . '/' . $node->nodeName;
      if ($node->nodeType == XML_ELEMENT_NODE) {
        $attr = $this->dom->createAttribute('name');
        $node->appendChild($attr);
        $txt = $this->dom->createTextNode($nms[$node->nodeName]);
        $attr->appendChild($txt);
      }
      if ($node->hasChildNodes()) {
        $this->Names($sct, $nms);
      }
    }
  }

  public function Menu($ops)
  /*
   * form the menu htm
   * in:  ops -- forming options
   * out: htm
   */ {
    $htm = '';
    $this->Create('sct', 'sct', $htm, $ops);
    return $htm;
  }

  private function Create($pth, $id, &$htm, $ops)
  /*
   * create menu recursively
   * in:  pth - current section path
   *      id - ul tag id
   *      htm - formed htm string
   *      ops -- options - url, icon source
   */ {
    $htm .= '<ul id="' . $id . '">' . PHP_EOL;
    $sct = $this->xpt->query($pth)->item(0);
    foreach ($sct->childNodes as $node) {
      $key = $node->nodeName;
      $val = $this->mb_str_replace(' ', '&nbsp;', $node->getAttribute('name'));
      $ref = $ops['url'] . $this->mb_str_replace('sct', '', $pth) . '/' . $key;
      if ($node->nodeType == XML_ELEMENT_NODE &&
              $node->hasChildNodes() && $node->childNodes->item(0)->nodeType == XML_ELEMENT_NODE) {
        $nme = $this->mb_str_replace('/', '_', $pth) . '_' . $key;
        $htm .= '<li><img alt="" src="' . $ops['img'] . '" id="' . $nme . '_mrk"/>';
        $htm .= '<a href="' . $ref . '" name="' . $nme . '">' . $val . '</a>' . PHP_EOL;
        $this->Create($pth . '/' . $key, $nme, $htm, $ops);
      } else if ($node->nodeType == XML_ELEMENT_NODE) {
        $htm .= '<li><a href="' . $ref . '">' . $val . '</a></li>' . PHP_EOL;
      }
    }
    $htm .= '</ul>' . PHP_EOL;
    if (mb_strpos($pth, '/')) {
      $htm .= '</li>' . PHP_EOL;
    }
  }

  private function mb_str_replace($needle, $replacement, $haystack) {
    return implode($replacement, mb_split($needle, $haystack));
  }

}

?>
