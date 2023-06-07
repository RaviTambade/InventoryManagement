import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RequestListComponent } from './request-list/request-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { RolesComponent } from './roles/roles.component';
import { DateSearchComponent } from './date-search/date-search.component';
import { RadioSearchComponent } from './radio-search/radio-search.component';
import { NestedDropdownComponent } from './nested-dropdown/nested-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestListComponent,
    RequestDetailsComponent,
    RolesComponent,
    DateSearchComponent,
    RadioSearchComponent,
    NestedDropdownComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
