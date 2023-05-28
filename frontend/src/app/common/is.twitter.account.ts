import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { ProfileService } from "../service/profile.service";

@Directive({
  selector: "[appIsTwitterAccount]"
})
export class IsTwitterAccountDirective {

  constructor(private profileService: ProfileService,
              private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  @Input("appIsTwitterAccount") set isTwitterAccount({}) {
    if (this.profileService.isTwitterAccount()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
