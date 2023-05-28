import _ from "underscore";

angular.module("memetics").controller("MemeProcessController", MemeProcessController);
MemeProcessController.$inject = ["profile", "memeService", "alertService", "tagService", "$uibModal"];

function MemeProcessController(profile, memeService, alertService, tagService, $uibModal) {
    const ctrl = _.extend(this, {
        $onInit,
        canSubmit,
        datasource: [],
        deleteMeme,
        memes: [],
        profile,
        updateMeme
    });

    function $onInit() {
        memeService.getUnprocessed(profile.id).then(response => {
                ctrl.memes = response.data;
                ctrl.datasource.minIndex = 0;
                ctrl.datasource.maxIndex = ctrl.memes.length;
            },
            alertService.defaultError
        );

        tagService.getAll().then(response => ctrl.allTags = response.data, alertService.defaultError);
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

    function canSubmit(meme) {
        return (meme.title.length > 0) && (meme.tags.length);
    }

    function updateMeme(meme) {
        meme.loading = true;
        memeService.memeUpdate(meme).then(
            () => {
                meme.loading = false;
                meme.updated = true;
                alertService.success("meme has been updated successfully.");
            },
            alertService.defaultError
        );
    }

    function deleteMeme(meme) {
        function doDelete(deleteFromImgur) {
            memeService.memeDelete(meme, deleteFromImgur).then(
                () => {
                    meme.updated = true;
                    alertService.success("Meme deleted.");
                },
                alertService.defaultError
            );
        }

        $uibModal.open({
            templateUrl: "app/meme/delete-modal/meme.delete.modal.html",
            controller: "MemeDeleteModalController",
            controllerAs: "ctrl",
            resolve: {}
        }).result.then(doDelete);
    }
}

