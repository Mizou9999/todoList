;(function(window) {
	;("use strict")

	/** @module Helper */

	/**
	 * @memberof Helper
	 *
	 * @description select element by className
	 *
	 */
	window.qs = function(selector, scope) {
		return (scope || document).querySelector(selector)
	}

	/**
	 * @memberof Helper
	 *
	 * @description select all elements which have the same className
	 */
	window.qsa = function(selector, scope) {
		return (scope || document).querySelectorAll(selector)
	}

	/**
	 * @memberof Helper
	 *
	 * @description Add event listener to an element
	 */
	window.$on = function(target, type, callback, useCapture) {
		target.addEventListener(type, callback, !!useCapture)
	}

	/**
	 * @memberof Helper
	 *
	 * @description Add the event listner to all elements matching the selector
	 */

	window.$delegate = function(target, selector, type, handler) {
		function dispatchEvent(event) {
			var targetElement = event.target
			var potentialElements = window.qsa(selector, target)
			var hasMatch =
				Array.prototype.indexOf.call(potentialElements, targetElement) >= 0

			if (hasMatch) {
				handler.call(targetElement, event)
			}
		}
		/**
		 * @memberof Helper
		 *
		 * @description The blur event fires when an element has lost focus More info => https://developer.mozilla.org/en-US/docs/Web/Events/blur
		 */

		var useCapture = type === "blur" || type === "focus"

		window.$on(target, type, dispatchEvent, useCapture)
	}

	/**
	 * @memberof Helper
	 *
	 * @description Select the parent of an element based on its tag name
	 */
	window.$parent = function(element, tagName) {
		if (!element.parentNode) {
			return
		}
		if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
			return element.parentNode
		}
		return window.$parent(element.parentNode, tagName)
	}
	/**
	 * @memberof Helper
	 *
	 * @description Allow for looping on nodes by chaining:qsa('.foo').forEach(function () {})qsa('.foo').forEach(function () {})
	 */

	NodeList.prototype.forEach = Array.prototype.forEach
})(window)
