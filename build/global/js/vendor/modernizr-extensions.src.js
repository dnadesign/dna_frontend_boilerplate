// Test for position:fixed support
Modernizr.addTest('positionfixed', function () {
    var test  = document.createElement('div'),
      control = test.cloneNode(false),
         fake = false,
         root = document.body || (function () {
            fake = true;
            return document.documentElement.appendChild(document.createElement('body'));
      }());

   var oldCssText = root.style.cssText;
   root.style.cssText = 'padding:0;margin:0';
   test.style.cssText = 'position:fixed;top:42px';
   root.appendChild(test);
   root.appendChild(control);
   
   var ret = test.offsetTop !== control.offsetTop;
   
   root.removeChild(test);
   root.removeChild(control);
   root.style.cssText = oldCssText;
   
   if (fake) {
      document.documentElement.removeChild(root);
   }
   
   return ret;
});