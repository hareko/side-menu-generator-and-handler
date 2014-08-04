Side menu generator and handler
===============================

These classes allow to configure and handle multilingual hierarchical side menus. The menu is generated server-side basing on the configuration. The menu item titles are selected from the multilingual database. The event listeners are attached client-side to handle the menu clicks and invoke selected actions.

Server-side
-----------

The *texts.php* class loads the texts of specified language from a sqlite database (pdo_sqlite extension is required). *sidemenu.php* class loads the xml description into DOM object (libxml extension is required) and generates the menu's html using the titles supplied by *texts.php*. The client-side *sidemenu.js* class must be used to handle the menu.

Client-side
-----------

*sidemenu.js* class presumes the menu structure created by *sidemenu.php* and certain html tag id's. It attaches the event handlers to the menu sections. Clicking any menu section causes the opening/closing of the submenu and/or invoking according action. The main window is kept to be adjusted to a full browser's window.

An example
----------

The *example.php* forms a shell for functionality demonstration from the *example.phtml* template. The *example.sql* holds the vocabulary statements and an *example.db* sqlite database is created during first run. *example.xml* describes the menu structure to be created. *example.css* styles the shell and the menu inside it. The language token can be specified on startup: *example.php?en* or *example.php?lng=ru* etc. 

Change *example.db* and *example.xml* for your own menues. The xml node names must be specified in the texts table's code fields. Add the table columns for new languages (use ISO 639-1 notation). Design your own main window and modify the event listeners for real actions.

The package
-----------

The following files are included:

1. *sidemenu.php*  - class to generate the menu;
2. *sidemenu.js*  - class to handle the menu;
3. *common.js*    - support functions and classes;
4. *texts.php*  - class to supply language-dependent texts;
5. *example.php*  - demonstrating functionality;
6. *example.sql*  - multilingual texts base;
7. *example.xml*  - the menu configuration;
8. *example.phtml*  - the shell template;
9. *example.css*  - the shell an menu styles;

The *Side menu generator and handler* is implemented in vRegistry solution (see [vregistry.com]) and vrManual program (see [vrm.vregistry.com]).

  [vregistry.com]: http://app.vregistry.com/hlp/en
  [vrm.vregistry.com]: http://vrm.vregistry.com
