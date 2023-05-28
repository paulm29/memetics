import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { ProfileService } from "../service/profile.service";

@Directive({
  selector: "[appIsStandardAccount]"
})
export class IsStandardAccountDirective {

  constructor(private profileService: ProfileService,
              private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  @Input("appIsStandardAccount") set isStandardAccount({}) {
    if (this.profileService.isStandardAccount()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
