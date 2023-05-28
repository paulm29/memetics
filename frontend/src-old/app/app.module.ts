import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import "rxjs/add/operator/finally";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { LoginComponent } from "./login/login.component";
import { HeaderComponent } from "./header/header.component";
import { AuthGuard } from "./auth/auth.guard";
import { AuthService } from "./service/auth.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import {
  AlertModule, BsDatepickerModule, ButtonsModule, CarouselModule, CollapseModule, PopoverModule, ProgressbarModule,
  RatingModule, TimepickerModule, TooltipModule, TypeaheadModule
} from "ngx-bootstrap";
import { FileUploadModule } from "ng2-file-upload";
import { AlertComponent } from "./uiqc/alert/alert.component";
import { AlertService } from "./uiqc/alert/alert.service";
import { UserService } from "./service/user.service";
import { MemeticsClient } from "./service/memetics.client";
import { AuthClient } from "./service/auth.client";
import { ProfileBaseComponent } from "./profile/profile-base.component";
import { ProfileResolver } from "./service/profile-resolver.service";
import { ProfileService } from "./service/profile.service";
import { MemeSearchComponent } from "./meme/search/meme.search.component";
import { NavbarComponent } from "./common/navbar.component";
import { TagCloudComponent } from "./tag/cloud/tag.cloud.component";
import { QueueService } from "./service/queue.service";
import { QueueToolbarComponent } from "./queue/toolbar/queue.toolbar.component";
import { MemeToolbarComponent } from "./meme/toolbar/meme.toolbar.component";
import { MemeTweetComponent } from "./meme/tweet/meme.tweet.component";
import { TweetService } from "./service/tweet.service";
import { ModalModule } from "ngx-bootstrap/modal";
import { MemeTweetModalComponent } from "./meme/tweet-modal/meme.tweet.modal.component";
import { TrimValueAccessorModule } from "ng-trim-value-accessor";
import { TagNamePipe } from "./common/tag.name.pipe";
import { TagNamesPipe } from "./common/tags.names.pipe";
import { IsAdminDirective } from "./common/is.admin.directive";
import { IsTwitterAccountDirective } from "./common/is.twitter.account";
import { IsStandardAccountDirective } from "./common/is.standard.account";
import { UserLoadService } from "./service/user.load.service";
import { LoggerService } from "./uiqc/logger.service";
import { MemeService } from "./service/meme.service";
import { TagService } from "./service/tag.service";
import { IdleComponent } from "./header/idle.component";
import { NgIdleModule } from "@ng-idle/core";
import { RegistrationComponent } from "./auth/registration.component";
import { MemeNewComponent } from "./meme/new/meme.new.component";
import { MemeCurrentService } from "./service/meme.current.service";
import { MemeBaseComponent } from "./meme/meme.base.component";
import { CommentService } from "./service/comment.service";
import { MemeViewComponent } from "./meme/view/meme.view.component";
import { AdminService } from "./service/admin.service";
import { AdminComponent } from "./admin/admin.component";
import { MemeEditComponent } from "./meme/edit/meme.edit.component";
import { MemeDeleteModalComponent } from "./meme/delete-modal/meme.delete.modal.component";
import { ProfileViewComponent } from "./profile/view/profile.view.component";
import { ProfileEditComponent } from "./profile/edit/profile.edit.component";
import { MemeFormComponent } from "./meme/form/meme.form.component";

import { MemeTagsComponent } from "./meme/tags/meme.tags.component";
import { MemeVoteStarComponent } from "./meme/vote/meme.vote.star.component";
import { VoteService } from "./service/vote.service";
import { CommentToolbarComponent } from "./comment/toolbar/comment.toolbar.component";
import { CommentDeleteModalComponent } from "./comment/delete-modal/comment.delete.modal.component";
import { CommentEditModalComponent } from "./comment/edit-modal/comment.edit.modal.component";
import { MemeSlideshowComponent } from "./meme/slideshow/meme.slideshow.component";
import { HashtagFavouriteService } from "./service/hashtag.favourite.service";
import { ProfileHashtagFavouritesComponent } from "./profile/hashtag-favourites/profile.hashtag.favourites.component";
import { FollowingViewComponent } from "./follow/following-view/follow.following.view.component";
import { FollowersViewComponent } from "./follow/followers-view/follow.followers.view.component";
import { FollowActionsComponent } from "./follow/actions/follow.actions.component";
import { FollowService } from "./service/follow.service";

import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { AuthAdminGuard } from "./auth/auth.admin.guard";
import { StatsRetweetsComponent } from "./stats/retweets/stats.retweets.component";
import { StatsService } from "./service/stats.service";
import { DatePickerComponent } from "./common/date-picker.component";
import { DateFormatDirective } from "./common/validate-date-format.directive";
import { BooleanYesNoPipe } from "./common/boolean-yesno.pipe";
import { FilterPipe } from "./common/filter.pipe";
import { OrderByPipe } from "./common/order-by.pipe";
import { DpDatePickerModule } from "ng2-date-picker";
import { DateUtilService } from "./service/date.util.service";
import { CommonModule, DatePipe } from "@angular/common";
import { ScheduleComponent } from "./schedule/schedule.component";
import { QueueComponent } from "./queue/queue.component";
import { DragulaModule } from "ng2-dragula";
import { TweetsComponent } from "./tweets/tweets.component";
import { DownloadLikedComponent } from "./utility/download-liked/utility.download.liked.component";
import { TagLinkComponent } from "./tag/link/tag.link.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ImgurUploader } from "./service/imgur.uploader";
import { TweetsMemeticsComponent } from "./tweets/memetics/tweets.memetics.component";
import { TagCloudModule } from "./tag-cloud/tag-cloud.module";
import { SessionExpiredInterceptor } from "./auth/session-expired.interceptor";
import { SessionExpiredModalComponent } from "./session-expired-modal/session-expired-modal.component";
import { SessionExpiredAlertService } from "./service/session-expired-alert.service";
import { SessionExpiredComponent } from "./auth/session-expired/session-expired.component";
import { ScheduleService } from "./service/schedule.service";
import { DisableAllDirective } from "./common/disable-all.directive";
import { OptionalEmailDirective } from "./common/validate-optional-email.directive";
import { ShowValidationComponent } from "./common/show-validation.component";
import { YearDirective } from "./uiqc/validator/year.directive";
import { StatsNewsletterComponent } from "./stats/newsletter/stats.newsletter.component";
import { Ng2TweetComponent } from "./hacked-components/ng2-tweet/ng2-tweet.component";
import { Ng2TweetService } from "./hacked-components/ng2-tweet/ng2-tweet.service";
import { NoSanitizePipe } from "./common/no.sanitize.pipe";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { TweetLinkColumnComponent } from "./stats/retweets/tweet-link-column.component";
import { TweetTotalColumnComponent } from "./stats/retweets/tweet-total-column.component";
import { EmbedTweetComponent } from "./publishing/embed-tweet.component";
import { ClipboardModule } from "ngx-clipboard";
import { TweetAgeColumnComponent } from "./stats/retweets/tweet-age-column.component";
import { AdminManageTagsComponent } from "./admin/manage-tags/admin.manage.tags.component";
import { AdminManageUsersComponent } from "./admin/manage-users/admin.manage.users.component";
import { RegistrationService } from "./service/registration.service";
import { WordpressService } from "./service/wordpress.service";
import { WordpressComponent } from "./wordpress/wordpress.component";
import { StatsRetweetsPublishComponent } from "./stats/retweets/stats.retweets.publish.component";
import { NotAuthorisedComponent } from "./auth/not-authorised/not-authorised.component";
import { ApplicationConfigService } from "./service/application-config.service";
import { ReferenceDataService } from "./service/reference.data.service";
import { ReferenceDataResolver } from "./service/reference-data-resolver.service";
import { ReferenceDataPipe } from "./service/reference-data.pipe";
import { BufferService } from "./service/buffer.service";
import { TweetTextColumnComponent } from "./stats/retweets/tweet-text-column.component";
import { DeleteLikedComponent } from "./utility/delete-liked/utility.delete.liked.component";
import { DateFormatRenderComponent } from "./common/table/date-format-render.component";
import { TableTruncateNameComponent } from "./common/table/table-truncate-name.component";
import { MemeSearchTitleComponent } from "./meme/search/title/meme-search-title.component";
import { MemeSearchActionsComponent } from "./meme/search/actions/meme-search-actions.component";
import { MemeSearchQueueComponent } from "./meme/search/queue/meme-search-queue.component";
import { MemeSearchTagsComponent } from "./meme/search/tags/meme-search-tags.component";
import { CustomModalModule } from "./service/modal/custom-modal.module";
import { AdminManageMemesComponent } from "./admin/manage-memes/admin.manage.memes.component";
import { HelpMemeComponent } from "./help/meme/help.meme.component";
import { HelpTweetingComponent } from "./help/tweeting/help.tweeting.component";
import { CommentComponent } from "./comment/comment.component";
import { MemeManageComponent } from "./meme/manage/meme.manage.component";
import { BackButtonComponent } from "./common/back-button.component";
import { MemeFacebookPostComponent } from "./meme/facebook-post/meme.facebook.post.component";
import { MemeTagsTypeaheadComponent } from "./meme/search/tags-typeahead/meme.tags.typeahead.component";
import { ExportService } from "./service/export.service";
import { ImageService } from "./service/image.service";
import { ImageResizeDirective } from "./common/image.resize.directive";
import { QueueItemComponent } from "./queue/item/queue.item.component";
import { Angular2CsvModule } from "angular2-csv";

@NgModule({
  declarations: [
    AdminComponent,
    AdminManageTagsComponent,
    AdminManageUsersComponent,
    AdminManageMemesComponent,
    AlertComponent,
    AppComponent,
    BackButtonComponent,
    CommentComponent,
    CommentDeleteModalComponent,
    CommentEditModalComponent,
    CommentToolbarComponent,
    DateFormatRenderComponent,
    DatePickerComponent,
    DownloadLikedComponent,
    DeleteLikedComponent,
    EmbedTweetComponent,
    FollowActionsComponent,
    FollowersViewComponent,
    FollowingViewComponent,
    HeaderComponent,
    HelpMemeComponent,
    HelpTweetingComponent,
    IdleComponent,
    LoginComponent,
    MemeBaseComponent,
    MemeDeleteModalComponent,
    MemeEditComponent,
    MemeFormComponent,
    MemeManageComponent,
    MemeNewComponent,
    MemeSearchComponent,
    MemeSlideshowComponent,
    MemeTagsComponent,
    MemeToolbarComponent,
    MemeTweetComponent,
    MemeFacebookPostComponent,
    MemeTweetModalComponent,
    MemeViewComponent,
    MemeVoteStarComponent,
    NavbarComponent,
    Ng2TweetComponent,
    NotAuthorisedComponent,
    ProfileBaseComponent,
    ProfileEditComponent,
    ProfileHashtagFavouritesComponent,
    ProfileViewComponent,
    QueueToolbarComponent,
    RegistrationComponent,
    QueueComponent,
    QueueItemComponent,
    ScheduleComponent,
    SessionExpiredComponent,
    SessionExpiredModalComponent,
    StatsNewsletterComponent,
    StatsRetweetsComponent,
    StatsRetweetsPublishComponent,
    TableTruncateNameComponent,
    MemeSearchTitleComponent,
    MemeSearchActionsComponent,
    MemeSearchQueueComponent,
    MemeSearchTagsComponent,
    MemeTagsTypeaheadComponent,
    TagCloudComponent,
    TagLinkComponent,
    TweetsComponent,
    TweetLinkColumnComponent,
    TweetTextColumnComponent,
    TweetTotalColumnComponent,
    TweetAgeColumnComponent,
    TweetsMemeticsComponent,
    WordpressComponent,

    DateFormatDirective,
    DisableAllDirective,
    ImageResizeDirective,
    IsAdminDirective,
    IsTwitterAccountDirective,
    IsStandardAccountDirective,
    OptionalEmailDirective,
    ShowValidationComponent,
    YearDirective,

    BooleanYesNoPipe,
    FilterPipe,
    OrderByPipe,
    NoSanitizePipe,
    ReferenceDataPipe,
    TagNamePipe,
    TagNamesPipe
  ],
  imports: [
    BrowserModule, // must be first

    ClipboardModule,

    AlertModule.forRoot(),
    Angular2CsvModule,
    BsDatepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    DpDatePickerModule,
    DragulaModule,
    FileUploadModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    ModalModule.forRoot(),
    NgIdleModule.forRoot(),
    Ng2SmartTableModule,
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    RatingModule.forRoot(),
    TagCloudModule,
    TimepickerModule.forRoot(),
    TooltipModule.forRoot(),
    TrimValueAccessorModule,
    CustomModalModule,
    TypeaheadModule.forRoot(),

    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    AppRoutingModule // must be last
  ],
  providers: [
    AdminService,
    AlertService,
    ApplicationConfigService,
    AuthClient,
    AuthGuard,
    AuthAdminGuard,
    AuthService,
    BufferService,
    CommentService,
    DateUtilService,
    ExportService,
    FollowService,
    HashtagFavouriteService,
    ImageService,
    ImgurUploader,
    LoggerService,
    MemeService,
    MemeCurrentService,
    MemeticsClient,
    Ng2TweetService,
    ProfileResolver,
    ProfileService,
    QueueService,
    ReferenceDataResolver,
    ReferenceDataService,
    RegistrationService,
    ScheduleService,
    SessionExpiredAlertService,
    StatsService,
    TagService,
    TweetService,
    UserService,
    UserLoadService,
    VoteService,
    WordpressService,

    BooleanYesNoPipe,
    ReferenceDataPipe,
    DatePipe,
    FilterPipe,
    OrderByPipe,
    TagNamePipe,
    TagNamesPipe,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: SessionExpiredInterceptor,
      multi: true,
    }
  ],
  entryComponents: [
    CommentDeleteModalComponent,
    CommentEditModalComponent,
    MemeDeleteModalComponent,
    MemeTweetModalComponent,
    DateFormatRenderComponent,
    TableTruncateNameComponent,
    MemeSearchTitleComponent,
    MemeSearchActionsComponent,
    MemeSearchQueueComponent,
    MemeSearchTagsComponent,
    SessionExpiredModalComponent,
    TweetLinkColumnComponent,
    TweetTextColumnComponent,
    TweetTotalColumnComponent,
    TweetAgeColumnComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
