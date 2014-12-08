// Controllers
// binds models in to the views
var listController = angular.module('listController', ['ngAnimate']);

// Pass ['$scope', '$http', function(){}] so it does not cause issues during minification
listController.controller('ListController', ['$scope', '$http', function( $scope, $http ) {
	$http.get('js/data.json').success(function(data) {
		$scope.slides = data;

		// Set the initial layout
		$scope.imageLayout = 'all';

		// Set the first slide
		$scope.currentIndex = 0;

		// Navigator
		// -- Previous
		$scope.previousSlide = function() {
			$scope.currentIndex = ($scope.currentIndex > 0) ? $scope.currentIndex -= 1 : $scope.slides.length - 1;
		}

		// -- Next
		$scope.nextSlide = function() {
			$scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? $scope.currentIndex += 1 : 0;			
		}

		/**
		 * Check for current slide
		 *
		 * @param $index
		 * @return bool
		 */
		$scope.isCurrentSlide = function(index) {
			return ( $scope.currentIndex === index || $scope.imageLayout == 'all' );
		}

		/**
		 * Highlight for current slide
		 *
		 * @param $index
		 * @return bool
		 */
		$scope.highlightSlide = function(index) {
			return $scope.currentIndex === index;
		}

		/**
		 * Setter for layout
		 *
		 * @param $index
		 * @return bool
		 */
		$scope.setView = function(layout) {
			$scope.imageLayout = layout;
		}
	});
}]);

listController.controller('DetailController', ['$scope', '$http', '$routeParams', function( $scope, $http, $routeParams ) {
	$http.get('js/data.json').success(function(data) {
		$scope.slides = data;
		$scope.whichItem = $routeParams.itemId;

		if ($routeParams.itemId > 0) {
			$scope.prevItem = Number($routeParams.itemId) - 1; // the routeparams id comes in as a string, need to convert to a number
		} else {
			$scope.prevItem = $scope.slides.length - 1;
		}

		if ($routeParams.itemId < $scope.slides.length - 1) {
			$scope.nextItem = Number($routeParams.itemId) + 1;
		} else {
			$scope.nextItem = 0;
		}
	});
}]);