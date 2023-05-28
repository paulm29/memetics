import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { SessionExpiredAlertService } from "../service/session-expired-alert.service";
import { Router } from "@angular/router";

@Injectable()
export class SessionExpiredInterceptor implements HttpInterceptor {

  constructor(private sessionExpiredAlertService: SessionExpiredAlertService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap(() => {
    }, err => {
      if (err instanceof HttpErrorResponse && (err.status === 403)) {
        this.sessionExpiredAlertService.showSessionExpiredPopup();
      }

      // if (err instanceof HttpErrorResponse && (err.status === 401)) {
      //   // TODO err.url IS NOT what I expect: http://localhost:8080/memetics/user
      //   console.log("SessionExpiredInterceptor - 401 - return URL", err.url);
      //
      //   if (!err.url.endsWith("login")) {
      //     // this.router.navigateByUrl("/login");
      //     this.router.navigate(["/login"], {queryParams: {returnUrl: err.url}});
      //   }
      //
      //   // this.router.navigateByUrl("/login"); // TODO want to get page I was heading to and then got 401
      //   // console.log("router", this.router.routerState.snapshot);
      //   // this.router.navigate(["/login"], {queryParams: {returnUrl: this.router.url}});
      //
      //   // throw err;
      // }

      if (err instanceof HttpErrorResponse && (err.status === 404)) {
        this.router.navigateByUrl("/login");
      }
    }));
  }


}
