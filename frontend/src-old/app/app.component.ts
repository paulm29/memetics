import { filter, map, mergeMap } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { ApplicationConfigService } from "./service/application-config.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "Memetics";

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private titleService: Title, private applicationConfigService: ApplicationConfigService) {
  }

  ngOnInit() {
    this.subscribeForTitleChanges();
    this.applicationConfigService.getApplicationConfig();
  }

  subscribeForTitleChanges() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter((route) => route.outlet === "primary"),
      mergeMap((route) => route.data),)
      .subscribe((event) => {
        this.setTitle(event);
      });
  }

  private setTitle(event) {
    if (event.title) {
      this.titleService.setTitle(`${event.title} - ${this.title}`);
    } else {
      this.titleService.setTitle(this.title);
    }
  }
}



