/**
 * Delayed Change Event for jQuery - v1.1
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
	$.fn.delayedChange = function (options) {
		var settings = $.extend({
			delay: 2000, // in milliseconds
			eventNamespace: undefined,
			extra: undefined
		}, options);
		this.each(function () {
			var timeoutRef, previousValue, $this = $(this);
			// populate initial values
			previousValue = $this.val();
			$this.on('input propertychange', function () {
				var val;
				// handle IE, props: http://stackoverflow.com/questions/5917344/jquery-value-change-event-delay
				if (window.event && event.type == "propertychange" && event.propertyName != "value") {
					return;
				}
				val = $this.val();
				// if hasn't changed, do nothing
				if (previousValue == val) {
					return;
				}
				previousValue = val;
				if (timeoutRef) {
					clearTimeout(timeoutRef);
				}
				timeoutRef = setTimeout(function () {
					// only trigger if value has stablized
					var eventName = 'delayedchange';
					if ($this.val() == val) {
						timeoutRef = undefined;
						if (settings.eventNamespace) {
							eventName = eventName + '.' + settings.eventNamespace;
						}
						$this.trigger(eventName, [{
							delay: settings.delay,
							eventNamespace: settings.eventNamespace,
							extra: settings.extra
						}]);
					}
				}, settings.delay);
			});
		});
		return this;
	};
})(jQuery);
