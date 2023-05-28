import { Pipe, PipeTransform } from "@angular/core";
import {Tag} from "../model/tag";

@Pipe({
    name: "tagname"
})
export class TagNamePipe implements PipeTransform {

    transform(tag: Tag, profileId: string): string {
        return "<a [routerLink]=['/profile', profile.id, 'meme-slideshow?tags=" + tag.name + "']\">" + tag.name + "</a>";
    }

}
