/**
 * common functions/classes for datespan/datepick
 *
 * @package     Solution
 * @author      Vallo Reima
 * @copyright   (C)2013
 */

function $(id, obj)
  /*
   *  Get element by id
   */
  {
    var o = (typeof obj === 'undefined') ? document : obj.document;
    return o.getElementById(id);
  }

function $$(obj, tag)
  /*
   *  Get elements by object tag name
   */
  {
    var o = (typeof obj === 'string') ? document.getElementById(obj) : obj;
    return o.getElementsByTagName(tag);
  }

function AttachEventListener(target, eventType, functionRef, capture)
  /*
   * Cross-browser method
   * in: target - element id
   *     eventType - click, ...
   *     functionRef - handler
   *     capture -- false - bubble (default)
   *                true - propagation
   */
  {
    if (typeof capture === 'undefined') {
      capture = false;
    }
    if (target.addEventListener) {
      target.addEventListener(eventType, functionRef, capture);
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, functionRef);
    } else {
      target['on' + eventType] = functionRef;
    }
  }

function DetachEventListener(target, eventType, functionRef, capture)
{
  if (typeof capture === 'undefined') {
    capture = false;
  }
  if (target.removeEventListener) {
    target.removeEventListener(eventType, functionRef, capture);
  } else if (target.detachEvent) {
    target.detachEvent('on' + eventType, functionRef);
  } else {
    target['on' + eventType] = null;
  }
}

function StopEvent(event, flag)
  /*
   * Prevent the Default Action for an Event
   * in: event - object
   *     flag -- true - don't cancel bubble
   */
  {
    var e = event ? event : window.event;
    e.returnValue = false;
    if (flag !== true) {
      e.cancelBubble = true;
      if (e.stopPropagation) {
        e.stopPropagation();
        e.preventDefault();
      }
    }
    return false;
    /*
     oEvent.returnValue = false;
     if (oEvent.preventDefault) {
     oEvent.preventDefault();
     }
     */
  }

function Target(e)
{
  return (window.event) ? e.srcElement : e.target;
}

function Width()
{
  return document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth :
    window.innerWidth != null ? window.innerWidth : document.body != null ? document.body.clientWidth : null;
}

function Height()
{
  return document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight :
    window.innerHeight != null ? window.innerHeight : document.body != null ? document.body.clientHeight : null;
}

function FindParent(obj, val, trg)
  /* 
   * find object's parent
   * in:  obj - element object
   *      val - target value to find
   *      trg - target to find (tag,id,...)
   */
  {
    var r = null;
    var v = val.toLowerCase();
    var t = typeof trg === 'undefined' ? 'tagName' : trg;
    var o = obj.parentNode;
    do {
      if (o[t].toLowerCase() === v) {
        r = o;
        break;
      }
      o = o.parentNode;
    } while (o.tagName);
    return r;
  }

function BrowserName()
  /*
   * get a browser name
   */
  {
    var c = navigator.userAgent;
    if (c.indexOf('MSIE') != -1) {
      c = 'IE';
    } else if (c.indexOf('Firefox') != -1) {
      c = 'FF';
    } else if (c.indexOf('Chrome') != -1) {
      c = 'CR';
    } else if (c.indexOf('Safari') != -1) {
      c = 'SF';
    } else if (c.indexOf('Opera') != -1) {
      c = 'OP';
    } else {
      c = navigator.appName;
    }
    return c;
  }
