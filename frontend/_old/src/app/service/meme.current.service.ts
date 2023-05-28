import { Injectable } from "@angular/core";
import { Meme } from "../model/meme";
import { BehaviorSubject } from "rxjs";
import { MemeService } from "./meme.service";

@Injectable()
export class MemeCurrentService {
  private memeCurrentSource = new BehaviorSubject<Meme>(new Meme());

  memeCurrent$ = this.memeCurrentSource.asObservable();

  constructor(private memeService: MemeService) {
  }

  setMemeCurrentById(memeId: string): void {
    this.memeService.get(parseInt(memeId, 0)).subscribe((response: Meme) => {
      // Extending/Assigning to new Meme to inherit class functions
      response = Object.assign(new Meme(), response);
      this.memeCurrentSource.next(response);
    });
  }

  setMemeCurrent(meme: Meme): void {
    this.memeCurrentSource.next(meme);
  }

}
