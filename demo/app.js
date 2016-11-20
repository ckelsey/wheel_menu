(function(demo){
	'use strict';
	demo.config(function ($routeProvider, $locationProvider) {
		$routeProvider
		// .when('/', {
		// 	templateUrl: "./demo/demo.html",
		// 	controller: 'AppCtlr',
		// })
		// .when('/readme', {
		// 	templateUrl: "./demo/readme.html",
		// 	controller: 'AppCtlr',
		// })
		.when('/', {
			templateUrl: "./demo/test.html",
			controller: 'AppCtlr',
		})
		.otherwise({ redirectTo: '/' });
		$locationProvider.html5Mode(true);
	});

	demo.controller('AppCtlr', function($scope, $q){
		var self = this;

		$scope.menu = {

			// Blue ring

			// Rigid
			g_element_1479452730367_wnuic: function() {
				return 'Rigid';
			},

			// Ends
			g_element_1479452730368_316gk: function() {
				return 'Ends';
			},

			// Specialty comp
			g_element_1479452730369_2n6md: function() {
				return 'Specialty comp';
			},

			// Data
			g_element_1479452730370_es2dn: function() {
				return 'Data';
			},

			// Flexibles
			g_element_1479452730371_igsbt: function() {
				return 'Flexibles';
			},

			// Plastic bottles
			g_element_1479452730371_283tb: function() {
				return 'Plastic bottles';
			},

			// Plastic trays
			g_element_1479452730372_k90nk: function() {
				return 'Plastic trays';
			},

			// Plastic tubes
			g_element_1479452730373_1547h: function() {
				return 'Plastic tubes';
			},

			// Blister
			g_element_1479452730373_qtwrp: function() {
				return 'Blister';
			},

			// Packaging
			g_element_1479452730373_926fg: function() {
				return 'Packaging';
			},

			// Temperature
			g_element_1479452730374_5v727: function() {
				return 'Temperature';
			},

			// Protective
			g_element_1479452730376_ceg8j: function() {
				return 'Protective';
			},

			// Tooling
			g_element_1479452730376_otufg: function() {
				return 'Tooling';
			},

			// Integration
			g_element_1479452730397_qxdxp: function() {
				return 'Integration';
			},

			// Integration
			g_element_1479452730397_qxdxp: function() {
				return 'Integration';
			},

			// Integration
			g_element_1479452730397_qxdxp: function() {
				return 'Integration';
			},

			// Integration
			g_element_1479452730397_qxdxp: function() {
				return 'Integration';
			},

			// Integration
			g_element_1479452730397_qxdxp: function() {
				return 'Integration';
			},

			// Integration
			g_element_1479452730397_qxdxp: function() {
				return 'Integration';
			},

			// Displays
			g_element_1479452730376_1g6ys: function() {
				return 'Displays';
			},

			// Spools
			g_element_1479452730377_9pehs: function() {
				return 'Spools';
			},

			// Material
			g_element_1479452730377_9pg6l: function() {
				return 'Material';
			},

			// Recycle
			g_element_1479452730378_4u5ib: function() {
				return 'Recycle';
			},

			// Specialty
			g_element_1479452730379_6dzjm: function() {
				return 'Specialty';
			},

			// Paper paperboard
			g_element_1479452730380_5t71e: function() {
				return 'Paper paperboard';
			},

			// Adhesives
			g_element_1479452730380_61rju: function() {
				return 'Adhesives';
			},

			// Tubes
			g_element_1479452730382_mvlxq: function() {
				return 'Tubes';
			},









			//Rainbow ring

			// Creative - pink
			g_element_1479452730393_artnx: function() {
				return 'Creative';
			},

			// Concept - purple
			g_element_1479452730392_m0a1g: function() {
				return 'Concept';
			},

			// Rapid - dark blue
			g_element_1479452730388_uh2bk: function() {
				return 'Rapid';
			},

			// Design engineer - blue
			g_element_1479452730388_icpcu: function() {
				return 'Design engineer';
			},

			// Design sustain - light blue
			g_element_1479452730388_l81fc: function() {
				return 'Design sustain';
			},

			// Proccess - seafoam
			g_element_1479452730387_snbx6: function() {
				return 'Proccess';
			},

			// Graphics - green
			g_element_1479452730387_1yw9p: function() {
				return 'Graphics';
			},

			// Testing - green
			g_element_1479452730387_vw9o2: function() {
				return 'Testing';
			},

			// Consumer - lime
			g_element_1479452730386_4p5b9: function() {
				return 'Consumer';
			},

			// Supply - yellow
			g_element_1479452730386_g8j1i: function() {
				return 'Supply';
			},

			// Manufacture - orange
			g_element_1479452730385_o6quj: function() {
				return 'Manufacture';
			},

			// Technology - red
			g_element_1479452730382_9x2z0: function() {
				return 'Technology';
			},



			// White ring

			// Invention
			g_element_1479452730395_sa1uk: function() {
				return 'Invention';
			},

			// Ideation
			g_element_1479452730393_qvd5p: function() {
				return 'Ideation';
			},

			// Insight
			g_element_1479452730399_da303: function() {
				return 'Insight';
			},

			// Iteration
			g_element_1479452730398_1jp14: function() {
				return 'Iteration';
			},

			// Interaction
			g_element_1479452730398_7fuav: function() {
				return 'Interaction';
			},

			// Integration
			g_element_1479452730397_qxdxp: function() {
				return 'Integration';
			},






			// Blue circle
			g_element_1479452730399_0l8tt: function(){
				var dfr = $q.defer();

				console.log('called');
				setTimeout(function() {
					console.log('resolve');
					dfr.resolve('hello');
				}, 2000);

				return dfr.promise;
			}
		};

		this.demoOptions = [{
			name: 'None',
			fn: undefined
		},{
			name: 'Update model',
			fn: function(arg){
				var temp = null;
				self.documentation['item'].properties['scope']['property'].value = temp;
			}
		}];

		this.updateChange = function(dir, propName){
			if(dir.meta.properties.scope[propName].optionModel == null){
				dir.meta.properties.scope[propName].optionModel = dir.meta.properties.scope[propName].defaultOption;
			}

			var optionModel = dir.meta.properties.scope[propName].optionModel;
			dir.meta.properties.scope[propName].value = dir.meta.properties.scope[propName].options[optionModel].fn;
		};

		this.documentation = {
			title: 'wheel_menu',
			description: "Renders a svg menu",

			// Directive

			"circleMenu": {
				description: 'Contains the markup and js to render the circle menu svg',
				markup: '<wheel-menu menu="menu"></wheel-menu>',
				properties: {
					scope: {
						"menu": {
							type: 'object',
							description: 'An object with the id\'s of the svg nodes and their cooresponding click function as the value',
							value: $scope.menu
						},
					}
				}
			}


			// Service
			/*
			CKronos: {
				description: null,
				properties: {
					"propertyOrMethod": {
						description: null,
						arguments: {
							arg: {
								type: null,
								description: null
							}
						},
						returns: {
							type: null,
							description: null
						}
					}
				}
			}
			*/
		}
	});
})(angular.module('app', [
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'wheel_menu'
]));
