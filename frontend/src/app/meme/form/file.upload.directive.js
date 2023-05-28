angular.module("memetics").directive("fileChange", fileChange);

function fileChange() {
    return {
        restrict: "A",
        require: "ngModel",
        scope: {
            fileChange: "&"
        },
        link: function link(scope, element, attrs, ctrl) {
            element.on("change", onChange);

            scope.$on("destroy", function () {
                element.off("change", onChange);
            });

            function onChange() {
                ctrl.$setViewValue(element[0].files[0]);
                scope.fileChange();
            }
        }
    };
}