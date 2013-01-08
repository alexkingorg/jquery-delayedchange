/**
 * Delayed Change Event for jQuery - v1.0
 * A jQuery plugin for triggering a catchable "change" event after edits have stabilized.
 *
 * Copyright 2013 Alex King - http://alexking.org
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *    http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function ($) {
	$.fn.delayedChange = function (options, callback) {
		if ($.isFunction(options)) {
			callback = options;
			options = {};
		}
		var settings = $.extend({
			'delay': 2000, // in milliseconds
		}, options);
		this.each(function () {
			var $this = $(this);
			// populate initial values
			if (typeof $this.data('delayedchange-val') == 'undefined') {
				$this.data('delayedchange-val', $this.val());
			}
			$this.on('input propertychange', function () {
				// handle IE, props: http://stackoverflow.com/questions/5917344/jquery-value-change-event-delay
				if (window.event && event.type == "propertychange" && event.propertyName != "value") {
					return;
				}
				var val = $this.val();
				// if hasn't changed, do nothing
				if ($this.data('delayedchange-val') == val) {
					return;
				}
				$this.data('delayedchange-val', val);
				callback = setTimeout(function () {
					// only trigger if value has stablized
					if ($this.val() == val) {
						if (callback) {
							callback.call(this);
						}
						$this.trigger('delayedchange');
					}
				}, settings.delay);
			});
		});
		return this;
	};
})(jQuery);
