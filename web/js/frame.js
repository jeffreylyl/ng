        var frame = angular.module("frame", ['pascalprecht.translate', 'ui.router', 'ngAnimate', 'ngCookies']);

        frame.run(function($cookies, $translate) {
            if ($cookies.get("lan")) {
                $translate.use($cookies.get("lan"));
            }
        });

        frame.config(function($translateProvider, $stateProvider, $urlRouterProvider) {
            // tranlation 
            $translateProvider.useStaticFilesLoader({
                files: [{
                    prefix: '/i18n/locale_',
                    suffix: '.json'
                }]
            });
            $translateProvider.registerAvailableLanguageKeys(['en', 'zh_cn', 'zh_tw'], {
                'en_US': 'en',
                'zh_CN': 'zh_cn',
                'zh_TW': 'zh_tw'
            });
            //set preferred lang
            $translateProvider.preferredLanguage('zh_cn');
            //auto determine preferred lang
            // $translateProvider.determinePreferredLanguage();
            //when can not determine lang, choose en lang.
            // $translateProvider.fallbackLanguage('en');
            // $translateProvider.useLocalStorage();
            // $translateProvider.useCookieStorage();

            //router
            $urlRouterProvider.otherwise('/index');
            $stateProvider
                .state('index', {
                    url: "/index.aspx",
                    templateUrl: "../parts/index/main-content.html"
                })
                .state('tab1-aboutus', {
                    url: "/aboutus.aspx",
                    views: {
                        '': {
                            templateUrl: '../main-content.html'
                        },
                        'left@tab1-aboutus': {
                            templateUrl: '../parts/tab1/left.html'
                        },
                        'right@tab1-aboutus': {
                            templateUrl: '../parts/tab1/aboutus/right.html',
                            controller: 'jsCtl'
                        }
                    }
                })
                .state('tab1-companyhonor', {
                    url: "/companyhonor.aspx",
                    views: {
                        '': {
                            templateUrl: '../main-content.html'
                        },
                        'left@tab1-companyhonor': {
                            templateUrl: '../parts/tab1/left.html'
                        },
                        'right@tab1-companyhonor': {
                            templateUrl: '../parts/tab1/companyhonor/right.html',
                            controller: 'jsCtl'
                        }
                    }
                })
                .state('tab1-socialresponsibility', {
                    url: "/socialresponsibility.aspx",
                    views: {
                        '': {
                            templateUrl: '../main-content.html'
                        },
                        'left@tab1-socialresponsibility': {
                            templateUrl: '../parts/tab1/left.html'
                        },
                        'right@tab1-socialresponsibility': {
                            templateUrl: '../parts/tab1/socialresponsibility/right.html',
                            controller: 'jsCtl'
                        }
                    }
                })
        });

        frame.directive('appheader', function() {
            var directive = {};
            directive.restrict = 'E';
            directive.templateUrl = "../header.html";
            return directive;
        }).directive('appnav', function() {
            var directive = {};
            directive.restrict = 'E';
            directive.templateUrl = "../nav.html";
            return directive;
        }).directive('appfooter', function() {
            var directive = {};
            directive.restrict = 'E';
            directive.templateUrl = "../footer.html";
            return directive;
        }).directive('navevent', function() {
            return {
                restrict: 'A',
                replace: true,
                link: function(scope, element, attrs) {
                    var jqUlRoot = $(element[0]);
                    $(jqUlRoot).children().find("li").click(function() {
                        $(this).parent().fadeOut(400);
                    });
                    $(jqUlRoot).children().hover(function() {
                        $(this).find("ul").css("display", "block");
                    }, function() {
                        $(this).find("ul").css("display", "none");
                    });
                }
            }
        }).controller('langCtl', function($scope, $translate, $rootScope, $cookies) {
            $scope.en = true;
            $scope.zhTw = true;
            $scope.zhCn = false;
            $scope.toggle = function(lan) {
                if (lan == "en") {
                    $scope.en = false;
                    $scope.zhTw = true;
                    $scope.zhCn = true;
                } else if (lan == "zh_tw") {
                    $scope.en = true;
                    $scope.zhTw = false;
                    $scope.zhCn = true;
                } else if (lan == "zh_cn") {
                    $scope.en = true;
                    $scope.zhTw = true;
                    $scope.zhCn = false;
                }
                $translate.use(lan);
                $rootScope.lan = lan;
                $cookies.put("lan", lan);

            };
            if ($cookies.get("lan")) {
                $scope.toggle($cookies.get("lan"));
            }

        }).controller('navCtl', function() {
            $(".nav ul li ul li").click(function() {
                // $(this).parent().css("display", "none");
                $(this).parent().fadeOut(350);
            });
            $(".nav ul li").hover(function() {
                $(this).find("ul").css("display", "block");
            }, function() {
                $(this).find("ul").css("display", "none");
            });
        }).controller('jsCtl', function($scope) {
            $scope.$on('$viewContentLoaded',
                function() {
                    preBind();
                    console.log("view loaded...");
                });
        });



        // frame.controller('ctl', function($scope, $http) {
        //     $http.get("http://localhost:9080/sfoapp/user.do?loginConfirm")
        //      .success(function(response) { console.log(response)});
        // });
