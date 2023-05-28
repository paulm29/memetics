import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class Ng2TweetService {
  readonly TWITTER_SCRIPT_ID = 'twitter-wjs';
  readonly TWITTER_WIDGET_URL = 'https://platform.twitter.com/widgets.js';

  constructor() {
  }

  LoadScript(): Observable<any> {
    const that = this;

    return Observable.create(observer => {
      // START LOADING SCRIPT INTO DOM
      that.startScriptLoad();

      // WHEN TWITTER WIDGETS SCRIPT IS LOADED, THEN PASS ALONG....
      window["twttr"].ready
      (
        function onLoadTwitterScript(twttr) {
          observer.next(twttr);
          observer.complete();
        }
      );
    });
  }

  private startScriptLoad() {
    // window['twttr'] = (function(d, s, id, url)
    // {
    //   var js,
    //     fjs = d.getElementsByTagName(s)[0],
    //     t = window['twttr'] || {};
    //
    //   if (d.getElementById(id)) return t;
    //
    //   js = d.createElement(s);
    //   js.id = id;
    //   js.src = url;
    //   js.type = "application/javascript"
    //   fjs.parentNode.insertBefore(js, fjs);
    //
    //   t._e = [];
    //
    //   t.ready = function(f)
    //   {
    //     t._e.push(f);
    //   };
    //
    //   return t;
    // }(document, "script", this.TWITTER_SCRIPT_ID, this.TWITTER_WIDGET_URL));

    window["twttr"] = (function (d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      const t = window["twttr"] || {};
      if (d.getElementById(id)) {
        return t;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);

      t._e = [];
      t.ready = function (f) {
        t._e.push(f);
      };

      return t;
    }(document, "script", "twitter-wjs"));
  }
}
