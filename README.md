jquery-delayedchange
====================

jQuery plugin for triggering a catchable "change" event after edits have stabilized.

---

License: Apache 2.0

Copyright 2013 Alex King (http://alexking.org)

---

## Overview

You may want to take an action when someone makes a change to a field - for example when they are typing into a textarea. However, you don't want to take that action on every keystroke. You want to take that action when the content has stopped changing for a few moments.

This jQuery plugin endeavors to provide that functionality.

When the value of a field remains the same for the specified number of milliseconts (default 2000), a `delayedchange` event is triggered on that element. Bind to this event to run your code.

## Usage

If you wanted to enable the `delayedchange` event for all textareas on the page, you could use this.

```js
$('textarea').delayedChange();
```

If you wanted to attach to only a specific input field and set the delay to 5 seconds instead of the default 2 seconds, you'd do so like this:

```js
$('#my-input').delayedChange({
	delay: 5000
});
```

If you wanted to also run some code when the event fired, you could do so like so (running on the triggered event):

```js
$('textarea').delayedChange().on('delayedchange', function () {
	// your code here
	console.log("I'm attached to the 'delayedchange' event for this element.");
});
```

You can also specify a [namespace](http://api.jquery.com/on/#event-names) for the event:
```js
$('#my-input').delayedChange({
	eventNamespace: "exciting"
}).on('delayedchange.exciting', function() {
	// your code here
	console.log("I'm attached to the 'delayedchange' event in the 'exciting' namespace.");
});
```

The `delayedchange` event passes an extra argument to handlers - an object containing the `delay`, `eventNamespace`, and `extra` attributes set when the plugin was invoked.
```js
$('#my-input').delayedChange({
	delay: 1000,	
	eventNamespace: "presence",
	extra: "kilroy was here"
}).on('delayedchange', function(event, data) {
	// your code here
	console.log("got extra data", data.extra); // "kilroy was here"
});
```

## Contributing

Pull requests for enhancements, improvements, etc. are very welcome.

## Version History

**1.1**

Merge [pull request from Justin de Vesine](https://github.com/alexkingorg/jquery-delayedchange/pull/1)

- Remove the previous timeout when no longer useful
- Allow more than one delayedChange to be usefully registered against a given element by switching to a closure var rather than .data
- Allow passing a namespace via the settings object
- Allow passing extra data (which is then passed on through the triggered event) via the settings object

**1.0**

- First public release