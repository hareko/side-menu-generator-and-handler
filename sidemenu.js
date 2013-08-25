/*
 * sidemenu handler class
 *
 * @package     Application
 * @author      Vallo Reima
 * @copyright   (C)2012
 */

function SideMenu()
{
  var ics = [/* menu icons */
    'iclosed.gif',
    'iopened.gif'
  ];
  var evs = [];     /* evs list */
  var sld;            /* menu selected object */
  var that = this;

  var Init = function()
    /*
     * setup
     */
    {
      var c = $$('sct', 'img')[0].src;
      c = c.substring(0, c.lastIndexOf('/') + 1);
      for (var i in ics) {  /* preload images */
        var cc = ics[i];
        ics[i] = new Image();
        ics[i].src = c + cc;
      }
      Adjust();
      Events();
      sld = $$('menu', 'a')[0];
    };

  var Events = function()
    /*
     * attach menu & window events
     */
    {
      var obs = $$('menu', 'li');
      for (var i = 0; i < obs.length; i++) { /* complete menu sections */
        var obj = $$(obs[i], 'a')[0];
        var img = $$(obs[i], 'img');
        if (img.length > 0) { /* this is a knot */
          evs.push([img[0], 'click', Expander]);
          evs.push([obj, 'click', Expander]);
        } else {
          evs.push([obj, 'click', Action]);
        }
      }
      evs.push([window, 'resize', Adjust]);
      for (i = 0; i < evs.length; i++) {
        AttachEventListener(evs[i][0], evs[i][1], evs[i][2]);
      }
    };

  var Expander = function(event)
    /*
     *  (un)expand submenu
     */
    {
      var trg = Target(event);
      if (trg.tagName.toLowerCase() === 'a') {
        var knot = trg.name;
        var flg = true;
      } else {
        knot = trg.nextSibling.name;
        flg = false;
      }
      var mrk = $(knot + '_mrk');
      var f = (mrk.src === ics[0].src);
      if (!flg || (flg && f)) {
        mrk.src = f ? ics[1].src : ics[0].src;
        $(knot).style.display = f ? 'inline' : 'none';
        Adjust();
      }
      if (flg) {
        Action(event);
      } else {
        StopEvent(event);
      }
    };

  var Action = function(event)
    /*
     *  indicate selected section
     */
    {
      var trg = Target(event);
      StopEvent(event);
      Path(trg);
      var c = trg.href.substr(trg.href.indexOf('#') + 1);
      $('content').innerHTML = c;
      sld.style.textDecoration = 'none';
      trg.style.textDecoration = 'underline';
      sld = trg;
    };

  var Path = function(obj)
    /*
     *  show menu path
     *  in: obj -- menu section object
     */
    {
      var a = [];
      var o = obj.parentNode;
      do {
        var c = $$(o, 'a')[0].innerHTML;
        a.unshift(c);
        o = FindParent(o, 'li');
      } while (o);
      c = a.join(' > ');
      $('section').innerHTML = c;
    };

  var Adjust = function()
    /* 
     * adjust menu & content height to window's one
     */
    {
      var hm = 50;            /* minimum contents height */
      var h = Height();
      if (BrowserName() === 'FF' && window.outerHeight < screen.availHeight &&
        window.innerHeight === document.documentElement.clientHeight) { /* FF problem */
        h = h - 17;
      }
      h = h - $('head').scrollHeight - $('foot').scrollHeight;
      if (h < hm) {
        h = hm;
      }
      $('menu').style.height = h + 'px';
      $('content').style.height = (h - $('section').scrollHeight) + 'px';
      return true;
    };

  that.Term = function()
    /*
     *  clear evs
     */
    {
      for (var i = 0; i < evs.length; i++) {
        DetachEventListener(evs[i][0], evs[i][1], evs[i][2]);
      }
    };

  Init();
}
