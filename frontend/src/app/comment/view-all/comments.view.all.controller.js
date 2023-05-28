import _ from "underscore";

angular.module("memetics").controller("CommentsViewAllController", CommentsViewAllController);
CommentsViewAllController.$inject = ["profile", "alertService", "commentService"];

function CommentsViewAllController(profile, alertService, commentService) {
    const ctrl = _.extend(this, {
        $onInit,
        comments: [],
        datasource: {},
        profile
    });

    function $onInit() {
        commentService.commentsGetForProfile(ctrl.profile.id, function(response) {
                ctrl.comments = response.data;
                ctrl.datasource.minIndex = 0;
                ctrl.datasource.maxIndex = ctrl.comments.length;
            },
            alertService.defaultError);
    }

    ctrl.datasource.get = function (index, count, success) {
        const result = [];
        for (let i = index; i < index + count; i++) {
            if(i < 0 || i >= ctrl.comments.length) {
                continue;
            }
            const item = ctrl.comments[i];
            result.push(item);
        }
        success(result);
    };
}

