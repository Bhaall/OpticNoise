'use strict';

/* Directives */
angular.module('onAdmin.directives', [])
	.directive('appVersion', ['version', function(version) {
		return function(scope, elm, attrs) {
			elm.text(version);
		};
	}])
	.directive('header', function () {
		return {
			restrict: 'A',
			transclude : true,
			templateUrl:'partials/header.html'
		}
	})
	.directive('footer', function () {
		return {
			restrict: 'A',
			transclude : true,
			templateUrl:'partials/footer.html'
		}
	})
	.directive('sidebar', function () {
		return {
			restrict: 'A',
			transclude : true,
			templateUrl:'partials/sidebar.html'
		}
	})
	.directive('breadcrumb', function () {
		return {
			restrict: 'A',
			replace: true,
			templateUrl:'partials/breadcrumb.html'
		}
	})
	.directive('menuItems', function () {
		return {
			restrict: 'A',
			transclude : true,
			templateUrl:'partials/menu-items.html'
		}
	})
	.directive('menuItemsSm', function () {
		return {
			restrict: 'A',
			transclude : true,
			templateUrl:'partials/menu-items-sm.html'
		}
	})
	.directive('offCanvas', function () {
		return {
			restrict: 'A',
			link: function(scope, el, attrs) {
				var $el = $(el);
				var $targetName = $el.attr("data-target");
				var $target = $($targetName);
				if ($target) {
					$el.click(function(){
						$el.toggleClass("fas fa-arrow-circle-left");
					})
				}
			}
		}
	})
	.directive('jasnyUpload', ['asyncScript', '$timeout', function (asyncScript, $timeout) {
		return {
			restrict: 'C',
			link: function(scope, el, attrs) {
				asyncScript.load('jasny',function(){
					$timeout(function () {

					});
				});
			}
		}
	}])
	.directive('btnToggle', ['$timeout', function ($timeout) {
		return {
			restrict: 'C',
			link: function(scope, el, attrs) {
				var $el = $(el);
				$el.click(function() {

					$el.find('.btn').toggleClass('active');
					if ($el.find('.btn-primary').size()>0) {
						$el.find('.btn').toggleClass('btn-primary');
					}
					if ($el.find('.btn-danger').size()>0) {
						$el.find('.btn').toggleClass('btn-danger');
					}
					if ($el.find('.btn-success').size()>0) {
						$el.find('.btn').toggleClass('btn-success');
					}
					if ($el.find('.btn-info').size()>0) {
						$el.find('.btn').toggleClass('btn-info');
					}
					$el.find('.btn').toggleClass('btn-default');
				});
			}
		}
	}])
	.directive('uiToggleClass', ['$timeout', '$document',
		function($timeout, $document) {
			return {
				restrict: 'AC',
				link: function(scope, el, attr) {
					el.on('click', function(e) {
						e.preventDefault();
						var classes = attr.uiToggleClass.split(','),
						targets = (attr.target && attr.target.split(',')) || Array(el),
						key = 0;
						angular.forEach(classes, function(_class) {
							var target = targets[(targets.length && key)];
							(_class.indexOf('*') !== -1) && magic(_class, target);
							$(target).toggleClass(_class);
							key++;
						});
						$(el).toggleClass('active');

						function magic(_class, target) {
							var patt = new RegExp('\\s' + _class.replace(/\*/g, '[A-Za-z0-9-_]+').split(' ').join('\\s|\\s') + '\\s', 'g');
							var cn = ' ' + $(target)[0].className + ' ';
							while (patt.test(cn)) {
								cn = cn.replace(patt, ' ');
							}
							$(target)[0].className = $.trim(cn);
						}
					});
				}
			};
		}
	])
  .directive('equals', function () {
		return {
			restrict: 'A',
			require: '?ngModel',
			link: function(scope, elem, attrs, ngModel) {
				if(!ngModel) return;
				scope.$watch(attrs.ngModel, function() {
					validate();
				});

				attrs.$observe('equals', function (val) {
					validate();
				});

				var validate = function() {
					var val1 = ngModel.$viewValue;
					var val2 = attrs.equals;

					ngModel.$setValidity('equals', val1 === val2);
				};
			}
		}
    	})
	.directive('portraitInput', function ($parse) {
		return {
			restrict: 'A',
			link: function(scope, elm, attrs) {
				elm.bind('change', function(){
					$parse(attrs.portraitInput)
					.assign(scope, elm[0].files)
					scope.$apply();
				})
			}
		}
	})
	.directive('albumpicInput', function ($parse) {
		return {
			restrict: 'A',
			link: function(scope, elm, attrs) {
				elm.bind('change', function(){
					$parse(attrs.albumpicInput)
					.assign(scope, elm[0].files)
					scope.$apply();
				})
			}
		}
	})
	.directive('playMp3', function () {
		return {
			restrict: 'A',
			link: function(scope, elm, attrs) {
				var currentFile = "";
				elm.bind('click', function(e){
					e.preventDefault();
					var file = '../assets/multimedia/' + elm.attr('href');
					var title = elm.data('songtitle');
					var source = '';
					$('#player').find('span.label').text(title);
					var oAudio = document.getElementById('audio');
					if (oAudio.paused) {
						if(!oAudio.src) {
							oAudio.src = file;
						}
						if (file !== currentFile) {
							oAudio.src = file;
							currentFile = file;
						}
						oAudio.play();
						angular.element(elm).html('<i class="pull-right fas fa-pause fa-fw" aria-hidden="true"></i> Pause')
					}
					else {
						oAudio.pause();
						angular.element(elm).html('<i class="pull-right fas fa-headphones-alt fa-fw" aria-hidden="true"></i> Play');
					}
				})
			}
		}
	})
	.directive('newMp3', function () {
		return {
			restrict: 'A',
			link: function(scope, elm, attrs) {
				var currentFile = "";
				elm.bind('click', function(e){
					e.preventDefault();

					var oAudio = document.getElementById('audio');
					var audioURL = document.getElementById('song_file');
					var file = audioURL.files[0];
					var objectUrl = URL.createObjectURL(file);
					var title = elm.data('songtitle');
					$('#player').find('span.label').text(title);
					if (oAudio.paused) {
						if (file !== currentFile) {
							oAudio.src = objectUrl;
							currentFile = file;
						}
						oAudio.play();
						angular.element(elm).find('i').removeClass('fa-play');
          					angular.element(elm).find('i').addClass('fa-pause');
					}
					else {
						oAudio.pause();
						angular.element(elm).find('i').removeClass('fa-pause');
          					angular.element(elm).find('i').addClass('fa-play');
					}
				})
			}
		}
	})
	.directive('focusMe', function($timeout) {
		return {
			restrict:'EA',
			link: function(scope, element) {
				$timeout(function() {
					element.focus();
				}, 100);
			}
		};
	})
	.directive('removeMe', function ($timeout) {
		return {
			restrict: 'A',
			link: function(scope, el, attrs) {
				$timeout(function () {
					var $el = $(el);
					setTimeout(function(){
						$el.fadeOut(3000,function(){
							$el.remove();
						});
					},7000);
				});
			}
		}
	})
	.directive('selectpicker', ['$parse', '$timeout', function ($parse, $timeout) {
		return {
			restrict: 'A',
			require: '?ngModel',
			priority: 10,
			compile: function (tElement, tAttrs, transclude) {
				tElement.selectpicker($parse(tAttrs.selectpicker)());
				tElement.selectpicker('refresh');
				return function (scope, element, attrs, ngModel) {
					if (!ngModel) return;

					scope.$watch(attrs.ngModel, function (newVal, oldVal) {
						scope.$evalAsync(function () {
							if (!attrs.ngOptions || /track by/.test(attrs.ngOptions)) element.val(newVal);
							element.selectpicker('refresh');
						});
					});

					ngModel.$render = function () {
						$timeout(function() {
							scope.$evalAsync(function () {
								element.selectpicker('refresh');
							});
						}, 1000);
					}
				};
			}
		}
	}])
	.directive('liveCharCount', function() {
		return {
			restrict: 'C',
			link: function(scope, el, attrs) {
				var $el = $(el);
				var textMax = parseInt($(el).attr("data-max"));
				var messageSelector = $(el).attr("data-target");
				$(messageSelector).html(textMax);
				$el.keyup(function() {
					var text_length = $el.val().length;
					var text_remaining = textMax - text_length;
					$(messageSelector).html(text_remaining);
				});
			}
		};
	})
	.directive('pageMe', function($timeout) {
		return {
			restrict: 'C',
			link: function(scope, el, attrs) {
				$timeout(function(){
					var jqEl = $(el);
					var ps = jqEl.attr("data-pager");
					var pp = jqEl.attr("data-per-page");
					jqEl.pageMe({
						pagerSelector:ps,
						showPrevNext:true,
						hidePageNumbers:false,
						perPage:pp
					});
				});
			}
		};
	})
	.directive('refreshMe', function() {
		return {
			restrict: 'C',
			link: function(scope, el, attrs) {
				var jqEl = $(el);
				var dt = jqEl.attr("data-target");
				jqEl.refreshMe({
					selector:dt
				});
			}
		};
	})
	.directive('scrollToTop', function() {
		return {
			link: function(scope, element, attrs) {
				var appear = 200,
				wrap = $("#main-wrapper");
				wrap.bind('scroll', function () {
					if (wrap.scrollTop() > appear) element.fadeIn();
					else element.fadeOut()
				});

				element.click(function() {
					scope.$apply(function() {
						wrap.animate({
							scrollTop: 0
						}, "slow");
					});
				});
			}
		};
	})
	.directive('autosize', function autosizeDirective() {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function autosizeDirectiveLink($scope, $textarea, attrs, ngModel) {
				var sizer = setupAutosizer($textarea[0]);

				var run = function($0) {
					if (!sizer.minHeight) {
						sizer.measure();
					}
					sizer.adjust();
					return $0;
				};

				ngModel.$viewChangeListeners.push(run);
				$scope.$watch(attrs.ngModel, run);
				if ($textarea[0].style.transition === '') {
					$textarea[0].style.transition = [
						'border-top-width 1ms',
						'border-bottom-width 1ms',
						'padding-top 1ms',
						'padding-bottom 1ms',
						'line-height 1ms'
					].join(', ');
				}
				$textarea.on('transitionend', function() {
					sizer.measure();
					sizer.adjust();
				});
				$textarea[0].reinitAutosize = run;
			}
		};

		function setupAutosizer(textarea) {

			var minHeight, lineHeight, extraHeight;

			function _throttle(ms, fn) {
				var inprogress = false;
				return function() {
					if (!inprogress) {
						fn();
					}
					inprogress = true;
					setTimeout(function() {
						inprogress = false;
					}, ms);
				};
			}

			function _getBoxSizing(style) {
				return style.getPropertyValue('box-sizing') || 'content-box';
			}

			function _getLineHeight(style) {
				lineHeight = style.getPropertyValue('line-height');
				if (lineHeight == 'normal') {
					lineHeight = (parseFloat(style.getPropertyValue('font-size')) || 16) * 1.14;
				}
				else {
					lineHeight = parseFloat(lineHeight);
				}
				return lineHeight;
			}

			function _getBorderHeight(style) {
				return parseFloat(style.getPropertyValue('border-top-width') || 0) || 0 +
					parseFloat(style.getPropertyValue('border-bottom-width') || 0) || 0;
			}

			function _getPaddingHeight(style) {
				return parseFloat(style.getPropertyValue('padding-top') || 0) || 0 +
					parseFloat(style.getPropertyValue('padding-bottom') || 0) || 0;
			}

			function setOverflow() {
				textarea.style.overflow = 'hidden';
				textarea.style.resize = 'none';
			}

			function measure() {
				var style = window.getComputedStyle(textarea, null);
				lineHeight = _getLineHeight(style);
				extraHeight = 0;
				switch (_getBoxSizing(style)) {
					case 'border-box': extraHeight += _getBorderHeight(style);
					case 'padding-box': extraHeight += _getPaddingHeight(style);
				}
				minHeight = Math.ceil(
					(parseFloat(textarea.getAttribute('rows')) || 1) * lineHeight + extraHeight
				);
			}

			function _adjuster() {
				var currentWindowScroll = window.scrollY;
				textarea.style.height = '0';
				var newHeight = Math.max(minHeight, textarea.scrollHeight) + 1;
				textarea.style.height = newHeight + 'px';
				if (currentWindowScroll != window.scrollY) {
					window.scroll(window.scrollX, currentWindowScroll);
				}
			}

			var adjust = _throttle(0, _adjuster);

			setOverflow();

			return {
				minHeight: minHeight,
				measure: measure,
				adjust: adjust
			};
		}
	})
	// popover and tooltips
	.directive( 'popoverPopup', function () {
		return {
			restrict: 'EA',
			replace: true,
			scope: { title: '@', content: '@', placement: '@', animation: '&', isOpen: '&' },
			templateUrl: 'partials/popover.html'
		};
	})

	.directive( 'popover', [ '$tooltip', function ( $tooltip ) {
		return $tooltip( 'popover', 'popover', 'click' );
	}])

	.directive( 'popoverTemplatePopup', function () {
		return {
			restrict: 'EA',
			replace: true,
			scope: { title: '@', content: '@', placement: '@', animation: '&', isOpen: '&', template: '@' },
			templateUrl: 'template/popover/popover-template.html'
		};
	})

	.directive( 'popoverTemplate', [ '$tooltip', function ( $tooltip ) {
		return $tooltip( 'popoverTemplate', 'popover', 'click' );
	}])

	.provider( '$tooltip', function () {
		var defaultOptions = {
			placement: 'top',
			animation: true,
			popupDelay: 0
		};

		var triggerMap = {
			'mouseenter': 'mouseleave',
			'click': 'click',
			'focus': 'blur'
		};

		var globalOptions = {};

		this.options = function( value ) {
			angular.extend( globalOptions, value );
		};

		function snake_case(name){
			var regexp = /[A-Z]/g;
			var separator = '-';
			return name.replace(regexp, function(letter, pos) {
				return (pos ? separator : '') + letter.toLowerCase();
			});
		}

		this.$get = [ '$window', '$compile', '$timeout', '$parse', '$document', '$position', function ( $window, $compile, $timeout, $parse, $document, $position ) {
			return function $tooltip ( type, prefix, defaultTriggerShow ) {
				var options = angular.extend( {}, defaultOptions, globalOptions );

				function setTriggers ( trigger ) {
					var show, hide;
					show = trigger || options.trigger || defaultTriggerShow;
					if ( angular.isDefined ( options.trigger ) ) {
						hide = triggerMap[options.trigger] || show;
					} else {
						hide = triggerMap[show] || show;
					}

					return {
						show: show,
						hide: hide
					};
				}

				var directiveName = snake_case( type );
				var triggers = setTriggers( undefined );

				var template =
					'<'+ directiveName +'-popup '+
					'title="{{tt_title}}" '+
					'content="{{tt_content}}" '+
					'placement="{{tt_placement}}" '+
					'animation="tt_animation()" '+
					'is-open="tt_isOpen" '+
					'template="{{tt_template}}"'+
					'>'+
					'</'+ directiveName +'-popup>';

				return {
					restrict: 'EA',
					scope: true,
					link: function link ( scope, element, attrs ) {
						var tooltip = $compile( template )( scope );
						var transitionTimeout;
						var popupTimeout;
						var $body;

						scope.tt_isOpen = false;

						function toggleTooltipBind () {
							if ( ! scope.tt_isOpen ) {
								showTooltipBind();
							} else {
								hideTooltipBind();
							}
						}

						function showTooltipBind() {
							if ( scope.tt_popupDelay ) {
								popupTimeout = $timeout( show, scope.tt_popupDelay );
							} else {
								scope.$apply( show );
							}
						}

						function hideTooltipBind () {
							scope.$apply(function () {
								hide();
							});
						}

						function show() {
							var position,
							ttWidth,
							ttHeight,
							ttPosition;

							if ( ! scope.tt_content ) {
								return;
							}

							if ( transitionTimeout ) {
								$timeout.cancel( transitionTimeout );
							}

							tooltip.css({ top: 0, left: 0, display: 'block' });

							if ( options.appendToBody ) {
								$body = $body || $document.find( 'body' );
								$body.append( tooltip );
							} else {
								element.after( tooltip );
							}

							position = $position.position( element );
							ttWidth = tooltip.prop( 'offsetWidth' );
							ttHeight = tooltip.prop( 'offsetHeight' );

							switch ( scope.tt_placement ) {
								case 'right':
									ttPosition = {
										top: (position.top + position.height / 2 - ttHeight / 2) + 'px',
										left: (position.left + position.width) + 'px'
									};
									break;
								case 'bottom':
									ttPosition = {
										top: (position.top + position.height) + 'px',
										left: (position.left + position.width / 2 - ttWidth / 2) + 'px'
									};
									break;
								case 'left':
									ttPosition = {
										top: (position.top + position.height / 2 - ttHeight / 2) + 'px',
										left: (position.left - ttWidth) + 'px'
									};
	                						break;
								default:
									ttPosition = {
										top: (position.top - ttHeight) + 'px',
										left: (position.left + position.width / 2 - ttWidth / 2) + 'px'
									};
	                						break;
	            					}

								tooltip.css( ttPosition );
								scope.tt_isOpen = true;
							}

							function hide() {
								scope.tt_isOpen = false;
								$timeout.cancel( popupTimeout );
								if ( angular.isDefined( scope.tt_animation ) && scope.tt_animation() ) {
									transitionTimeout = $timeout( function () { tooltip.remove(); }, 500 );
								} else {
									tooltip.remove();
								}
							}

							attrs.$observe( type, function ( val ) {
								scope.tt_content = val;
							});

							attrs.$observe( prefix+'Title', function ( val ) {
								scope.tt_title = val;
							});

							attrs.$observe( prefix+'Placement', function ( val ) {
								scope.tt_placement = angular.isDefined( val ) ? val : options.placement;
							});

							attrs.$observe( prefix+'Animation', function ( val ) {
								scope.tt_animation = angular.isDefined( val ) ? $parse( val ) : function(){ return options.animation; };
							});

							attrs.$observe( prefix+'PopupDelay', function ( val ) {
								var delay = parseInt( val, 10 );
								scope.tt_popupDelay = ! isNaN(delay) ? delay : options.popupDelay;
							});

							attrs.$observe( prefix+'Trigger', function ( val ) {
								element.unbind( triggers.show );
								element.unbind( triggers.hide );
								triggers = setTriggers( val );

								if ( triggers.show === triggers.hide ) {
									element.bind( triggers.show, toggleTooltipBind );
								} else {
									element.bind( triggers.show, showTooltipBind );
									element.bind( triggers.hide, hideTooltipBind );
								}
							});

							attrs.$observe( prefix+'Template', function ( val ) {
								scope.tt_template = val;
							});
						}
					};
				};
			}];
		})
		.directive( 'tooltipPopup', function () {
			return {
				restrict: 'E',
				replace: true,
				scope: { content: '@', placement: '@', animation: '&', isOpen: '&' },
				templateUrl: 'template/tooltip/tooltip-popup.html'
			};
		})
		.directive( 'tooltip', [ '$tooltip', function ( $tooltip ) {
			return $tooltip( 'tooltip', 'tooltip', 'mouseenter' );
		}])
		.directive( 'tooltipHtmlUnsafePopup', function () {
			return {
				restrict: 'E',
				replace: true,
				scope: { content: '@', placement: '@', animation: '&', isOpen: '&' },
				templateUrl: 'template/tooltip/tooltip-html-unsafe-popup.html'
			};
		})
		.directive( 'tooltipHtmlUnsafe', [ '$tooltip', function ( $tooltip ) {
			return $tooltip( 'tooltipHtmlUnsafe', 'tooltip', 'mouseenter' );
		}])
		.directive( 'ttLoadTemplateInSibling', [ '$http', '$templateCache', '$compile', function ( $http, $templateCache, $compile ) {
			return {
				link: function ( scope, element, attrs ) {
				var templateScope = scope.$parent.$new();

				attrs.$observe( 'ttLoadTemplateInSibling', function ( val ) {
					$http.get( val, { cache: $templateCache } )
						.then( function( response ) {
							element.html( response.data );
							$compile( element.contents() )( templateScope );
					});
				});
			}
		};
	}])
	.directive('touchspin', ['asyncScript', '$timeout', function (asyncScript, $timeout) {
		return {
			restrict: 'A',
			transclude: true,
			scope: {},
			link: function(scope, el, attrs) {
				asyncScript.load('touchspin',function(){
					$timeout(function () {
						$(el).TouchSpin({
							verticalbuttons: true,
							min: 0,
              max: 1000,
							buttondown_class: 'btn btn-xs btn-default',
							buttonup_class: 'btn btn-xs btn-default'
						});
					});
				});
			}
		}
	}]);
