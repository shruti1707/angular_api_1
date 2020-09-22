var myApp=angular.module("myApp",[]);

myApp.controller('myController',['$scope',function($scope){
    $scope.gmail={
        username="",
        email=""
    };
    $scope.ongooglelogin = function(){
        var params={
            'clientid':'40281369361-iulk7br9a5rohh9e2lnfo7lgvuu1eubo.apps.googleusercontent.com',
            'cookiepolicy':'single_host_origin',
            'callback': function(result){
                if(result['status']['signed_in']){
                    var request=gapi.client.plus.people.get(
                        {
                            'userId'='me'
                        }
                    );
                    request.execute(function(resp){
                        $scope.$apply(function(){
                            $scope.gmail.username =resp.displayName;
                            $scope.gmail.email=resp.emails[0].value;

                        });
                    });
                }
            },
            'approvalprompt': 'force';
            'scope': 'https://googleapis.com/auth/plus.login https://googleapis.com/auth/plus.profile.emails.read'
        };

        gapi.auth.signIn(params);


        
    }
}]);