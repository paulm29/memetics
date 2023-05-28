import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./auth/auth.guard";
import { ProfileBaseComponent } from "./profile/profile-base.component";
import { ProfileResolver } from "./service/profile-resolver.service";
import { MemeSearchComponent } from "./meme/search/meme.search.component";
import { RegistrationComponent } from "./auth/registration.component";
import { MemeNewComponent } from "./meme/new/meme.new.component";
import { MemeBaseComponent } from "./meme/meme.base.component";
import { MemeViewComponent } from "./meme/view/meme.view.component";
import { AuthAdminGuard } from "./auth/auth.admin.guard";
import { AdminComponent } from "./admin/admin.component";
import { MemeEditComponent } from "./meme/edit/meme.edit.component";
import { ProfileEditComponent } from "./profile/edit/profile.edit.component";
import { ProfileViewComponent } from "./profile/view/profile.view.component";
import { StatsRetweetsComponent } from "./stats/retweets/stats.retweets.component";
import { ScheduleComponent } from "./schedule/schedule.component";
import { QueueComponent } from "./queue/queue.component";
import { TweetsMemeticsComponent } from "./tweets/memetics/tweets.memetics.component";
import { TweetsComponent } from "./tweets/tweets.component";
import { DownloadLikedComponent } from "./utility/download-liked/utility.download.liked.component";
import { MemeSlideshowComponent } from "./meme/slideshow/meme.slideshow.component";
import { StatsNewsletterComponent } from "./stats/newsletter/stats.newsletter.component";
import { EmbedTweetComponent } from "./publishing/embed-tweet.component";
import { AdminManageTagsComponent } from "./admin/manage-tags/admin.manage.tags.component";
import { AdminManageUsersComponent } from "./admin/manage-users/admin.manage.users.component";
import { WordpressComponent } from "./wordpress/wordpress.component";
import { ReferenceDataResolver } from "./service/reference-data-resolver.service";
import { DeleteLikedComponent } from "./utility/delete-liked/utility.delete.liked.component";
import { PERMISSIONS } from "./auth/permissions";
import { AdminManageMemesComponent } from "./admin/manage-memes/admin.manage.memes.component";

const routes: Routes = [
  {
    path: "profile/:profileId",
    component: ProfileBaseComponent,
    resolve: {profile: ProfileResolver},
    canActivate: [AuthGuard],
    data: {requiredPermission: PERMISSIONS.any},
    children: [
      {path: "download-liked", component: DownloadLikedComponent, data: {title: "Download images form liked tweets"}},
      {path: "delete-liked", component: DeleteLikedComponent, data: {title: "Delete liked"}},
      {path: "delete-unpopular", component: DeleteLikedComponent, data: {title: "Delete unpopular"}},
      {
        path: "meme/:memeId", component: MemeBaseComponent, children: [
          {path: "edit", component: MemeEditComponent, data: {title: "Edit meme"}},
          {path: "view", component: MemeViewComponent, data: {title: "View meme"}}
        ]
      },
      {path: "meme-new", component: MemeNewComponent, data: {title: "New meme"}},
      {path: "meme-search", component: MemeSearchComponent, data: {title: "Search memes"}},
      {path: "meme-slideshow", component: MemeSlideshowComponent, data: {title: "Meme slideshow"}},
      {path: "profile-edit/:profileEditId", component: ProfileEditComponent, data: {title: "Edit profile"}},
      {path: "profile-view/:profileViewId", component: ProfileViewComponent, data: {title: "View profile"}},
      {path: "queue", component: QueueComponent, data: {title: "Queue"}},
      {path: "retweets", component: StatsRetweetsComponent, data: {title: "Retweets"}},
      {path: "embed-tweet", component: EmbedTweetComponent, data: {title: "Embed tweet"}},
      {path: "newsletter", component: StatsNewsletterComponent, data: {title: "Newsletter"}},
      {path: "schedule", component: ScheduleComponent, data: {title: "Schedule"}},
      {path: "tweets", component: TweetsComponent, data: {title: "Tweets sent via Memetics"}},
      {path: "tweets-memetics", component: TweetsMemeticsComponent, data: {title: "Tweets sent via Memetics"}},
      {
        path: "wordpress", component: WordpressComponent,
        resolve: {referenceData: ReferenceDataResolver},
        data: {title: "Wordpress posts"}
      }
    ]
  },
  {path: "login", component: LoginComponent, data: {title: "Login"}},
  {path: "registration", component: RegistrationComponent, data: {title: "Registration"}},
  {path: "admin", component: AdminComponent, canActivate: [AuthAdminGuard], data: {title: "Admin"}},
  {
    path: "admin-manage-tags",
    component: AdminManageTagsComponent,
    canActivate: [AuthAdminGuard],
    data: {title: "Manage tags"}
  },
  {
    path: "admin-manage-users",
    component: AdminManageUsersComponent,
    canActivate: [AuthAdminGuard],
    data: {title: "Manage users"}
  },
  {
    path: "admin-manage-memes",
    component: AdminManageMemesComponent,
    canActivate: [AuthAdminGuard],
    data: {title: "Manage memes"}
  },
  {path: "**", redirectTo: "login", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
