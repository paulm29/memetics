import { Pipe, PipeTransform } from "@angular/core";
import {Tag} from "../model/tag";

@Pipe({
    name: "tagnames"
})
export class TagNamesPipe implements PipeTransform {

    transform(tags: Tag[], profileId: string): string {
        let names = "";
        tags.forEach((tag, index) => {
            if (index === 0) {
              names = "<a [routerLink]=['/profile', profile.id, 'meme-slideshow?tags=" + tag.name + "']\">" + tag.name + "</a>";
            }
            else {
                names = names + ", " + "<a [routerLink]=['/profile', profile.id, 'meme-slideshow?tags=" + tag.name + "']\">" + tag.name + "</a>";
            }
        });

        return names;
    }

}
