// https://github.com/stuartchaney/bootstrap3-money-field
(function($){
  $.fn.money_field = function(opts) {
    var defaults = { width: null, symbol: '$' };
    var opts     = $.extend(defaults, opts);
    return this.each(function() {
      if(opts.width)
        $(this).css('width', opts.width + 'px');
      $(this).wrap("<div class='input-group'>").before("<span class='input-group-addon'>" + opts.symbol + "</span>");
    });
  };
})(jQuery);
