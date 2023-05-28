import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { AuthService } from "../service/auth.service";

@Directive({
  selector: "[appIsAdmin]"
})
export class IsAdminDirective {

  constructor(private authService: AuthService,
              private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  @Input("appIsAdmin") set isAdmin({}) {
    if (this.authService.isAdmin()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
