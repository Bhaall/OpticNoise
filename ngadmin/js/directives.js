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
	.directive('currentTime', function($timeout, dateFilter) {
		return function(scope, element, attrs) {

			var format,
				timeoutId;

			function updateTime() {
				element.text(dateFilter(new Date(), format));
			}

			scope.$watch(attrs.currentTime, function(value) {
				format = value;
				updateTime();
			});

			function updateLater() {
				timeoutId = $timeout(function() {
					updateTime();
					updateLater();
				}, 1000);
			}

			element.bind('$destroy', function() {
				$timeout.cancel(timeoutId);
			});

			updateLater();
		};
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
						angular.element(elm).find('i').removeClass('fa-headphones-alt');
          					angular.element(elm).find('i').addClass('fa-pause');
					}
					else {
						oAudio.pause();
						angular.element(elm).find('i').removeClass('fa-pause');
          					angular.element(elm).find('i').addClass('fa-headphones-alt');
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
	.directive('datepicker', ['asyncScript', '$timeout', function (asyncScript, $timeout) {
		return {
			restrict: 'A',
			transclude: true,
			scope: {},
			link: function(scope, el, attrs) {
				asyncScript.load('datepicker',function(){
					$timeout(function () {
						$(el).datepicker({
							autoclose:true,
						}).on("changeDate", function(e){
							console.log(e.date);
						});
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
