import {Component, Input} from "@angular/core";
import {Profile} from "../model/profile";

@Component({
  selector: "mm-navbar",
  templateUrl: "./navbar.component.html"
})
export class NavbarComponent {
  @Input("profile") profile: Profile;
}
