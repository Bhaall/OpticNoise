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
						$el.toggleClass("fas fa-chevron-left");
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
							min: 1,
              max: 1000,
							buttondown_class: 'btn btn-xs btn-default',
							buttonup_class: 'btn btn-xs btn-default'
						});
					});
				});
			}
		}
	}]);
