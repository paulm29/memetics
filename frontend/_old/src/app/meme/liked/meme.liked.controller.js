import _ from "underscore";

angular.module("memetics").controller("MemeLikedController", MemeLikedController);
MemeLikedController.$inject = ["profile", "memeService", "alertService"];

function MemeLikedController(profile, memeService, alertService) {
    const ctrl = _.extend(this, {
        $onInit,
        profile,
        datasource: [],
        memes: [],
    });

    function $onInit() {
        memeService.getLiked(profile.id, function (response) {
                ctrl.memes = response.data;
                ctrl.datasource.minIndex = 0;
                ctrl.datasource.maxIndex = ctrl.memes.length;
            },
            alertService.defaultError
        );
    }

    ctrl.datasource.get = function (index, count, success) {
        const result = [];
        for (let i = index; i < index + count; i++) {
            if (i < 0 || i >= ctrl.memes.length) {
                continue;
            }
            const item = ctrl.memes[i];
            result.push(item);
        }
        success(result);
    };
}

