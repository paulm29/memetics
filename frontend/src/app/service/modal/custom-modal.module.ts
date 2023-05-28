import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CancelChangesModalComponent } from "./cancel-changes-modal/cancel-changes-modal.component";
import { RemoveConfirmationModalComponent } from "./remove-confirmation-modal/remove-confirmation-modal.component";
import { CustomModalService } from "./custom-modal.service";
import { ModalModule as BsModalModule } from "ngx-bootstrap";
import { ConfirmModalComponent } from "./confirm-modal/confirm-modal.component";
import { ErrorModalComponent } from "./error-modal/error-modal.component";

@NgModule({
  imports: [
    CommonModule,
    BsModalModule.forRoot(),
  ],
  declarations: [
    CancelChangesModalComponent,
    RemoveConfirmationModalComponent,
    ConfirmModalComponent,
    ErrorModalComponent
  ],
  exports: [
    CancelChangesModalComponent,
    RemoveConfirmationModalComponent,
    ConfirmModalComponent,
    ErrorModalComponent
  ],
  providers: [
    CustomModalService,
  ],
  entryComponents: [
    CancelChangesModalComponent,
    RemoveConfirmationModalComponent,
    ConfirmModalComponent,
    ErrorModalComponent
  ],
})
export class CustomModalModule {
}
