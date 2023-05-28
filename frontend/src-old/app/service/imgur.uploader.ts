import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Response } from "@angular/http";

import { Observable, Subject } from "rxjs";

import { FileReaderUtils } from "./imgur.util";
import { HttpClient, HttpHeaders } from "@angular/common/http";

export interface ImgurUploadOptions {
  clientId: string;
  imageData: Blob;
  title?: string;
}

export interface ImgurUploadResponse {
  data?: {
    link: string,
    deleteHash: string
  };
  success: boolean;
}

@Injectable()
export class ImgurUploader {
  constructor(private http: HttpClient) {
  }

  upload(uploadOptions: ImgurUploadOptions) {
    const result = new Subject<ImgurUploadResponse>();

    FileReaderUtils.imageDataToBase64(uploadOptions.imageData)
      .subscribe(
        (imageBase64: string) => {
          this.sendImgurRequest(imageBase64, uploadOptions, result);
        },
        (error: string) => {
          result.error(error);
        }
      );

    return result;
  }

  deleteImage(clientId: string, deleteHash: string): Observable<string> {
    const options: HttpHeaders = this.buildRequestOptions(clientId);
    return this.http.delete(`https://api.imgur.com/3/image/${deleteHash}`, {headers: options}).pipe(
      map((res: Response) => res.text()));
  }

  private buildRequestOptions(clientId): HttpHeaders {
    return new HttpHeaders({
      Authorization: "Client-ID " + clientId,
      Accept: "application/json"
    });
  }

  private sendImgurRequest(imageBase64: string,
                           uploadOptions: ImgurUploadOptions,
                           result: Subject<ImgurUploadResponse>): Observable<ImgurUploadResponse> {
    const options = this.buildRequestOptions(uploadOptions.clientId);
    const body = {
      image: imageBase64,
      title: uploadOptions.title,
      type: "base64"
    };

    this.http.post<ImgurUploadResponse>("https://api.imgur.com/3/image", body, {headers: options}).subscribe(
      (response) => {
        result.next({
          data: {
            link: response.data.link,
            deleteHash: response.data.deleteHash
          },
          success: true
        });
        result.complete();
      },
      (err: Response) => {
        result.error("error uploading image: " + err.text());
      }
    );

    return result;
  }
}
